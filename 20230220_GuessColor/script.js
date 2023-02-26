const ali = (function () {
  const colorPicker = {

    difficulty: 'hard', // Default value
    colorOpt: [], // An array of Array(3), each element representing RGB val

    init() {
      this.cacheDom();
      this.generateColorOpt();
      this.render();
    },

    cacheDom() {
      this.newColorAsked = document.getElementById('new-color-asked');
      this.easyAsked = document.getElementById('easy-asked');
      this.hardAsked = document.getElementById('hard-asked');
      this.colorSelectableS = document.querySelectorAll('.picker-wrapper>div');
    },

    render() {
      for (let i = 0; i < this.colorOpt.length; i += 1) {
        continue;
      }
    },

    generateColorOpt() {
      this.colorOpt = []; // Clear
      const numberNeeded = (this.difficulty === 'hard') ? 6 : 3;
      for (let i = 0; i < numberNeeded; i += 1) {
        const newColor = new Array(3);
        for (let k = 0; k < 3; k += 1) {
          newColor[k] = this.getRandomNum(0, 255);
        }
        this.colorOpt.push(newColor);
      }
    },

    getRandomNum(lowLim, upLim) {
      return lowLim + Math.floor((upLim - lowLim) * Math.random());
    },

  };

  colorPicker.init();
  return colorPicker.colorOpt;
}());
