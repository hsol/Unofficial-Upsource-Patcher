const primaryKey = 'hansollim_unofficial_upsource_patcher';

/* ======================================= */
let styleWhiteCard = () => {
  let injection = new Injection();
  injection.injectExternalStyle(chrome.extension.getURL('styles/WhiteCard.css'));
};

let fixPopupOffset = () => {
  let fixPopupOffsetInterval = null;
  clearInterval(fixPopupOffsetInterval);

  fixPopupOffsetInterval = setInterval(() => {
    let $focused = jQuery(':focus');
    let $popup = jQuery('.popup-panel');
    if ($focused.length > 0 && $popup.length > 0) {
      if ($focused.parents('.popup-panel').length <= 0) {
        if ($focused.parent() !== $popup.parent()) {
          let $reviewView = jQuery('.review-view__i');
          if ($focused.length > 0 && $reviewView.length > 0) {
            let fixedTop = $focused.offset().top - $reviewView.offset().top;
            $popup.css('top', fixedTop);
          }
        }
      }
    }
  }, 100);
};
/* ======================================= */

let initFunctions = (callback) => {
  getOptions(options => {
    if (options.eval) {
      for (let index in options.eval) {
        eval(options.eval[index] + '()');
      }
    }

    callback(options);
  });
};

let getRootVariable = () => {
  return new Promise((resolve, reject) => {
    let notResponseTimer = setTimeout(() => {
      reject();
    }, 1000);

    chrome.storage.sync.get(primaryKey, (UnofficialUpsourcePatcher) => {
      resolve(UnofficialUpsourcePatcher[primaryKey] || {});
      clearTimeout(notResponseTimer);
    });
  });
};

let initRootVariable = () => {
  let rootVariable = {};
  rootVariable[primaryKey] = { options: {} };
  chrome.storage.sync.set(rootVariable);
};

let getOptions = callback => {
  getRootVariable().then(UnofficialUpsourcePatcher => {
    callback(UnofficialUpsourcePatcher.options || {});
  }).catch(error => {
  });
};

let saveOptions = options => {
  return new Promise((resolve, reject) => {
    getRootVariable().then(UnofficialUpsourcePatcher => {
      let rootVariable = {};
      UnofficialUpsourcePatcher.options = options;
      rootVariable[primaryKey] = UnofficialUpsourcePatcher;
      chrome.storage.sync.set(rootVariable, () => {
        getOptions(resolve)
      });
    })
    .catch(error => {
      reject(error);
    })
  });
};

jQuery(() => {
  let content = jQuery('head meta[name=description]').prop('content');
  if ((content || '').indexOf('Upsource') === -1) {
    return;
  }

  chrome.storage.sync.get(primaryKey, (UnofficialUpsourcePatcher) => {
    if (UnofficialUpsourcePatcher) {
      initFunctions();
    } else {
      initRootVariable();
    }

    chrome.runtime.onMessage.addListener((request, sender, callback) => {
      if (typeof callback === 'function') {
        if (request.method) {
          switch (request.method) {
            case 'getOptions':
              getOptions(callback);
              break;
            case 'saveOptions':
              saveOptions(request.data)
              .then(callback).catch(error => {
              });
              break;
            case 'setOptions':
              getOptions((options) => {
                options[request.key] = request.value;

                saveOptions(options)
                .then(callback).catch(error => {
                });
              });
              break;
            case 'setEval':
              getOptions((options) => {
                options.eval = options.eval || [];
                if (request.value === true && !options.eval.includes(request.key)) {
                  options.eval.push(request.key);
                } else if (request.value === false) {
                  let index = options.eval.indexOf(request.key);
                  options.eval.splice(index, 1);
                }

                saveOptions(options)
                .then(options => {
                  callback(options);
                  if (request.value === false) {
                    window.location.reload();
                  }
                }).catch(error => {
                });
              });
              break;
            case 'initFunctions':
              initFunctions(callback);
              break;
          }
        }
      }

      return true;
    });
  });
});