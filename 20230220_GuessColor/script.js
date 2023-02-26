(function () {
  const colorPicker = {

    init() {
      this.cacheDom();
    },

    cacheDom() {
      this.newColorAsked = document.getElementById('new-color-asked');
    },

  };

  colorPicker.init();
}());
