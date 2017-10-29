'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NAVIGATOR = '.module-navigator';
var TABS = '.nav-tabs';
var TAB = '.nav-tab';
var CONTAINERS = '.nav-containers';
var CONTAINER = '.nav-container';

var Navigator = function () {
  function Navigator() {
    var _this = this;

    _classCallCheck(this, Navigator);

    this.$navigators = $(NAVIGATOR);

    this.selectTab();
    $(TAB).off('click').on('click', function (event) {
      var $self = $(event.currentTarget);
      var identity = $self.attr('for');

      _this.selectTab(identity);
    });
  }

  _createClass(Navigator, [{
    key: 'selectTab',
    value: function selectTab(id) {
      var $tabs = this.$navigators.find(TABS);
      var $containers = this.$navigators.find(CONTAINERS);
      $containers.find(CONTAINER).hide();
      $tabs.find(TAB).removeClass('selected');

      if (id === undefined) {
        $tabs.find(TAB).first().addClass('selected');
        $containers.find(CONTAINER).first().show();
      } else {
        $tabs.find(TAB + ('[for=' + id + ']')).addClass('selected');
        $containers.find(CONTAINER + '#' + id).show();
      }
    }
  }]);

  return Navigator;
}();
//# sourceMappingURL=Navigator.js.map