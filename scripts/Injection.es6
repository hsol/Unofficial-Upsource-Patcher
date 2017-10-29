class Injection {
  constructor(options = {}) {
    const scriptSelector = 'head div#unofficialUpsourcePatcher';

    this.config = jQuery.extend({
      defaultRepeaterCycleSecond: 1
    }, options);

    if (typeof this.$container === 'undefined') {
      this.$container = jQuery(`<div id="${scriptSelector}"></div>`);
      jQuery('head').append(this.$container);
    }

    this.repeater = {};
  }

  injectExternal($external, callback) {
    if (typeof callback !== 'function') {
      callback = () => {
      };
    }

    this.$container.append($external);
    $external.on('load', callback);
  }

  injectExternalScript(path, callback) {
    const $externalScript = jQuery(`<script type="text/javascript" src="${path}"></script>`);
    this.injectExternal($externalScript, callback);
  }

  injectExternalStyle(path, callback) {
    const $externalStyle = jQuery(`<link rel="stylesheet" href="${path}"/>`);
    this.injectExternal($externalStyle, callback);
  }

  clearRepeater(name) {
    clearInterval(this.repeater[name]);
  }

  injectScriptRepeater(options, callable) {
    let config = jQuery.extend({
      repeaterCycleSecond: this.config.defaultRepeaterCycleSecond
    }, options);

    if (typeof config.name !== 'string') {
      throw new Error('Couldn\'t find repeater name.');
    }

    this.repeater[config.name] = setInterval(callable, options.repeaterCycleSecond);
  }
}