const NAVIGATOR = '.module-navigator';
const TABS = '.nav-tabs';
const TAB = '.nav-tab';
const CONTAINERS = '.nav-containers';
const CONTAINER = '.nav-container';

class Navigator {
  constructor() {
    this.$navigators = $(NAVIGATOR);

    this.selectTab();
    $(TAB).off('click').on('click', (event) => {
      const $self = $(event.currentTarget);
      const identity = $self.attr('for');

      this.selectTab(identity);
    })
  }

  selectTab(id) {
    const $tabs = this.$navigators.find(TABS);
    const $containers = this.$navigators.find(CONTAINERS);
    $containers.find(CONTAINER).hide();
    $tabs.find(TAB).removeClass('selected');

    if (id === undefined) {
      $tabs.find(TAB).first().addClass('selected');
      $containers.find(CONTAINER).first().show();
    } else {
      $tabs.find(TAB + `[for=${id}]`).addClass('selected');
      $containers.find(CONTAINER + '#' + id).show();
    }
  }
}
