// eslint-disable-next-line func-names
(function () {
  const display = {

    init() {
      this.cacheDom();
      // eslint-disable-next-line no-use-before-define
      this.initiateAnswer(dictionary);
      this.renderEmptyElement();
      this.resetAndRenderParameters();
      this.bindEvents();
    },

    cacheDom() {
      this.html = document.querySelector('html');
      this.letterBtns = document.querySelectorAll('#character-selector button');
      this.hintBtn = document.getElementById('hint');
      this.playAgainBtn = document.getElementById('play-again');
      this.displayWrapper = document.getElementById('display-wrapper');
      this.categoryDisplay = document.getElementById('category-display');
      this.lifeDisplay = document.getElementById('life-display');
      this.hintDisplay = document.getElementById('hint-display');
    },

    bindEvents() {
      this.hintBtn.addEventListener('click', this.renderHint.bind(this));
      this.playAgainBtn.addEventListener('click', this.resetCallback.bind(this));
      this.letterBtns.forEach((node) => {
        node.addEventListener('click', (e) => {
          // Do something only if the game is still going on
          if (this.life === 0 || this.score === this.answer.length) return;
          const selectedChar = e.target.textContent;
          this.letterSelected(selectedChar);
          e.target.disabled = true;
        });
      });
    },

    initiateAnswer(data) {
      const obj = data.getCategoryAndElementAndHint();
      this.category = obj.category;
      this.answer = obj.answer;
      this.hint = obj.hint;
      // Hashmap for answer, and number of unique letters
      this.charMap = {};
      this.uniqueCount = 0;
      for (let i = 0; i < this.answer.length; i += 1) {
        const char = this.answer[i];
        if (!this.charMap[char]) {
          this.uniqueCount += 1;
          this.charMap[char] = [];
        }
        this.charMap[char].push(i); // Record the idx of occurrence
      }
    },

    renderEmptyElement() {
      // Render the blank spaces for display
      // First remove all children
      while (this.displayWrapper.firstChild) this.displayWrapper.firstChild.remove();
      for (let i = 0; i < this.answer.length; i += 1) {
        const element = document.createElement('li');
        element.textContent = '?';
        this.displayWrapper.appendChild(element);
      }
    },

    resetAndRenderParameters() {
      this.life = 10;
      this.score = 0;
      this.lifeDisplay.textContent = this.life;
      this.hintDisplay.textContent = '';
      this.categoryDisplay.textContent = this.category;
      this.playAgainBtn.textContent = 'Try other';
      for (const node of this.letterBtns) node.disabled = false;
      this.html.classList.remove('win');
      this.html.classList.remove('lose');
    },

    renderHint() {
      this.hintDisplay.textContent = this.hint;
    },

    resetCallback() {
      // eslint-disable-next-line no-use-before-define
      this.initiateAnswer(dictionary);
      this.renderEmptyElement();
      this.resetAndRenderParameters();
    },

    letterSelected(char) {
      if (!this.charMap[char]) {
        this.life -= 1;
        this.lifeDisplay.textContent = this.life;
        if (this.life === 0) {
          this.playAgainBtn.textContent = 'Try again';
          this.html.classList.add('lose');
        }
      } else {
        this.score += this.charMap[char].length; // Add more if char present multiple times
        for (const idx of this.charMap[char]) {
          const str = `#display-wrapper :nth-child(${String(idx + 1)})`;
          // CSS numbering starts from 1; JS starts from 0
          const node = document.querySelector(str);
          node.classList.toggle('filled');
          node.textContent = char;
        }
        if (this.score === this.answer.length) {
          this.playAgainBtn.textContent = 'Play Again';
          this.html.classList.add('win');
        }
      }
    },
  };

  const dictionary = {

    data: {
      'Alkali Metal': {
        lithium: 'Rechargeable batteries',
        sodium: 'Soap and detergents',
        potassium: 'All symbol letter(s) not present in its full name',
        rubidium: 'Vacuum tubes and atomic clocks',
        caesium: 'Drilling of oil wells',
        francium: 'Less well studied one',
      },
      'Alkaline Earth Metal': {
        beryllium: 'Highest melting point of the group',
        magnesium: 'Fireworks and flares',
        calcium: '"Approximately"',
        strontium: 'Ferrite magnets and pyrotechnics',
        barium:
          'Used in medical imaging to diagnose gastrointestinal disorders',
        radium: 'Half-life of 1600 years',
      },
      Pnictogen: {
        nitrogen: 'Amino acid',
        phosphorus: 'Semiconductor dopant',
        arsenic: 'Tool to kill others',
        antimony: '傻逼',
        bismuth: 'Biscuit',
      },
      Chalcogen: {
        oxygen: 'Third most abundant element in the universe',
        sulfur: 'Volcano',
        selenium: 'Glass, pigments, electronics',
        tellurium: 'Like to stay close to gold',
        polonium: 'Marie and Pierre discovery',
      },
      Halogen: {
        fluorine: 'Refrigerants and solvents',
        chlorine: 'Bleach',
        bromine: 'Photographic film',
        iodine: 'Goitre',
        astatine: 'Less well studied one',
      },
      'Noble gas': {
        helium: 'Expensive coolant',
        neon: 'Laser technology',
        argon: "Third most abundant gas in Earth's atmosphere",
        krypton: "Clark Kent doesn't like related compound",
        xenon: 'High-intensity discharge lamp',
        radon: 'Health hazard',
      },
    },

    getCategoryAndElementAndHint() {
      const categories = Object.keys(this.data);
      const category = categories[this.getRandomNumber(0, categories.length)];
      const elements = Object.keys(this.data[category]);
      const answer = elements[this.getRandomNumber(0, elements.length)];
      const hint = this.data[category][answer];
      return { category, answer, hint };
    },

    getRandomNumber(low, up) {
      return Math.floor(Math.random() * (up - low)) + low;
    },
  };
  display.init();
}());
