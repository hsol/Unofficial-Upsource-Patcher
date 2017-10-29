'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Injection = function () {
  function Injection() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Injection);

    var scriptSelector = 'head div#unofficialUpsourcePatcher';

    this.config = jQuery.extend({
      defaultRepeaterCycleSecond: 1
    }, options);

    if (typeof this.$container === 'undefined') {
      this.$container = jQuery('<div id="' + scriptSelector + '"></div>');
      jQuery('head').append(this.$container);
    }

    this.repeater = {};
  }

  _createClass(Injection, [{
    key: 'injectExternal',
    value: function injectExternal($external, callback) {
      if (typeof callback !== 'function') {
        callback = function callback() {};
      }

      this.$container.append($external);
      $external.on('load', callback);
    }
  }, {
    key: 'injectExternalScript',
    value: function injectExternalScript(path, callback) {
      var $externalScript = jQuery('<script type="text/javascript" src="' + path + '"></script>');
      this.injectExternal($externalScript, callback);
    }
  }, {
    key: 'injectExternalStyle',
    value: function injectExternalStyle(path, callback) {
      var $externalStyle = jQuery('<link rel="stylesheet" href="' + path + '"/>');
      this.injectExternal($externalStyle, callback);
    }
  }, {
    key: 'clearRepeater',
    value: function clearRepeater(name) {
      clearInterval(this.repeater[name]);
    }
  }, {
    key: 'injectScriptRepeater',
    value: function injectScriptRepeater(options, callable) {
      var config = jQuery.extend({
        repeaterCycleSecond: this.config.defaultRepeaterCycleSecond
      }, options);

      if (typeof config.name !== 'string') {
        throw new Error('Couldn\'t find repeater name.');
      }

      this.repeater[config.name] = setInterval(callable, options.repeaterCycleSecond);
    }
  }]);

  return Injection;
}();
//# sourceMappingURL=Injection.js.map