(function () {
  const display = {

    init() {
      this.cacheDom();
      // eslint-disable-next-line no-use-before-define
      this.initiateAnswer(dictionary);
    },

    cacheDom() {
      this.letters = document.querySelectorAll('#character-selector button');
      this.hint = document.getElementById('hint');
      this.playAgain = document.getElementById('play-again');
      this.displayWrapper = document.getElementById('display-wrapper');
    },

    initiateAnswer(data) {
      const obj = data.getCategoryAndElementAndHint();
      this.category = obj.category;
      this.answer = obj.answer;
      this.hint = obj.hint;
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
