const emitKey = 'UnofficialUpsourcePatcher';
let setLoadingSpinner = isShow => {
  jQuery('.loading-spinner').toggle(isShow);
};
let queryToParent = (request, callback) => {
  setLoadingSpinner(true);
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, request, function (response) {
        setLoadingSpinner(false);
        if (chrome.runtime.lastError) {
          console.log("ERROR: ", chrome.runtime.lastError);
        } else {
          if (typeof callback === 'function') {
            callback(response);
          }
        }
      });
    }
  });
};

let initOptions = () => {
  queryToParent({
    method: 'getOptions'
  }, options => {
    console.log('init');
    if (options.eval) {
      for (let index in options.eval) {
        jQuery('input[type=checkbox][name=' + options.eval[index] + ']').prop('checked', true);
      }
    }
  });
};

jQuery(() => {
  let nav = new Navigator();

  jQuery('input[type=checkbox].js_toggle_option').change((event) => {
    let $self = jQuery(event.currentTarget);

    queryToParent({
      method: 'setEval',
      key: $self.prop('name'),
      value: $self.is(':checked')
    }, data => {
      queryToParent({ method: 'initFunctions' });
    });
  });

  initOptions();
});
