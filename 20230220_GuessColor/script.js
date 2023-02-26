const ali = (function () {
  const colorPicker = {

    difficulty: 'hard', // Default value
    colorOpt: [], // An array of Array(3), each element representing RGB val

    init() {
      this.cacheDom();
      this.render();
      this.bindEvents();
    },

    cacheDom() {
      this.newColorAsked = document.getElementById('new-color-asked');
      this.easyAsked = document.getElementById('easy-asked');
      this.hardAsked = document.getElementById('hard-asked');
      this.colorSelectableS = document.querySelectorAll('.picker-wrapper>div');
      this.pickerWrapper = document.getElementById('picker-wrapper');
      this.firstRGBVal = document.getElementById('first-RGB-val');
      this.secondRGBVal = document.getElementById('second-RGB-val');
      this.thirdRGBVal = document.getElementById('third-RGB-val');
      this.prompt = document.getElementById('prompt');
    },

    render() {
      this.generateColorOpt();
      this.insertChildElement();
      this.cacheAndBindEventsAllChildOfPickerWrapperAgain();
      // You need to re-cache the children. After clearing, the nodeList will
      // be pointing to null nodes.
      for (let i = 0; i < this.colorOpt.length; i += 1) {
        this.colorSelectableS[i].style.backgroundColor = `rgb(${this.colorOpt[i][0]} ${this.colorOpt[i][1]} ${this.colorOpt[i][2]})`;
      }
      this.generateAnswer();
      this.updateQuestion();
    },

    bindEvents() {
      this.easyAsked.addEventListener('click', () => {
        this.pickEasy();
        this.render();
      });
      this.hardAsked.addEventListener('click', () => {
        this.pickHard();
        this.render();
      });
      this.newColorAsked.addEventListener('click', () => {
        this.render();
      });
    },

    generateColorOpt() {
      this.colorOpt = []; // Clear
      const numberNeeded = (this.difficulty === 'hard') ? 6 : 3;
      for (let i = 0; i < numberNeeded; i += 1) {
        const newColor = new Array(3);
        for (let k = 0; k < 3; k += 1) {
          newColor[k] = this.getRandomNum(0, 256);
          // 256 will not be generated because Math.floor used
        }
        this.colorOpt.push(newColor);
      }
    },

    insertChildElement() {
      this.removeAllChildOfPickerWrapper.call(this); // Clear
      const numberNeeded = (this.difficulty === 'hard') ? 6 : 3;
      for (let i = 0; i < numberNeeded; i += 1) {
        const node = document.createElement('div');
        node.classList.add('clickable'); // For styling in CSS
        node.classList.add(String(i)); // For the answer matching
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

    cacheAndBindEventsAllChildOfPickerWrapperAgain() {
      this.colorSelectableS = document.querySelectorAll(
        '.picker-wrapper>div',
      );
      this.colorSelectableS.forEach((item) => {
        item.addEventListener('click', (e) => {
          console.log(e.target);
        });
      });
    },

    pickEasy() {
      this.difficulty = 'easy';
      this.easyAsked.classList.add('chosen');
      this.hardAsked.classList.remove('chosen');
    },

    pickHard() {
      this.difficulty = 'hard';
      this.easyAsked.classList.remove('chosen');
      this.hardAsked.classList.add('chosen');
    },

    generateAnswer() {
      const upperLim = this.difficulty === 'hard' ? 6 : 3;
      this.answer = this.getRandomNum(0, upperLim); // No need + 1 here, 0 idx
    },

    updateQuestion() {
      const answerArr = this.colorOpt[this.answer];
      [
        this.firstRGBVal.textContent,
        this.secondRGBVal.textContent,
        this.thirdRGBVal.textContent,
      ] = answerArr;
    },

    answerCorrectResponse() {
      this.newColorAsked.textContent = 'PLAY AGAIN';
      this.prompt.textContent = 'CORRECT';
      this.prompt.style.visibility = 'visible';
      for (let i = 0; i < this.colorSelectableS.length; i += 1) {
        const item = this.colorSelectableS[i];
        item.style.backgroundColor = `rgb(${
          this.colorOpt[this.answer][0]
        } ${this.colorOpt[this.answer][1]} ${
          this.colorOpt[this.answer][2]
        })`;
      }
    },

    answerWrongResponse() {
      this.prompt.textContent = 'TRY AGAIN';
      this.prompt.style.visibility = 'visible';
    },

  };

  colorPicker.init();
  return colorPicker.generateAnswer;
}());
