'use strict';

var emitKey = 'UnofficialUpsourcePatcher';
var setLoadingSpinner = function setLoadingSpinner(isShow) {
  jQuery('.loading-spinner').toggle(isShow);
};
var queryToParent = function queryToParent(request, callback) {
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

var initOptions = function initOptions() {
  queryToParent({
    method: 'getOptions'
  }, function (options) {
    console.log('init');
    if (options.eval) {
      for (var index in options.eval) {
        jQuery('input[type=checkbox][name=' + options.eval[index] + ']').prop('checked', true);
      }
    }
  });
};

jQuery(function () {
  var nav = new Navigator();

  jQuery('input[type=checkbox].js_toggle_option').change(function (event) {
    var $self = jQuery(event.currentTarget);

    queryToParent({
      method: 'setEval',
      key: $self.prop('name'),
      value: $self.is(':checked')
    }, function (data) {
      queryToParent({ method: 'initFunctions' });
    });
  });

  initOptions();
});
//# sourceMappingURL=Popup.js.map