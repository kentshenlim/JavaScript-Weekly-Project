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
      this.pickerWrapper = document.getElementById('picker-wrapper');
    },

    render() {
      for (let i = 0; i < this.colorOpt.length; i += 1) {
        this.colorSelectableS[i].style.backgroundColor = `rgb(${this.colorOpt[i][0]} ${this.colorOpt[i][1]} ${this.colorOpt[i][2]})`;
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

    insertChildElement() {
      this.removeAllChildOfPickerWrapper(); // Clear
      const numberNeeded = (this.difficulty === 'hard') ? 6 : 3;
      for (let i = 0; i < numberNeeded; i += 1) {
        const node = document.createElement('div');
        node.classList.add('clickable'); // For styling in CSS
        this.pickerWrapper.appendChild(node);
      }
    },

    getRandomNum(lowLim, upLim) {
      return lowLim + Math.floor((upLim - lowLim) * Math.random());
    },

    removeAllChildOfPickerWrapper() {
      while (this.pickerWrapper.firstChild) {
        this.pickerWrapper.firstChild.remove();
      }
    },

  };

  colorPicker.init();
  return colorPicker.colorOpt;
}());
