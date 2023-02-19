const x = ((function () {
  const drum = {
    init() {
      this.cacheDom();
      this.bindEvents();
    },
    cacheDom() {
      this.playingClass = 'playing'; // See last declaration of CSS
      this.crashRide = document.getElementById('crash-ride');
      this.hiHatTop = document.getElementById('hihat-top');
      this.drumKeys = document.querySelectorAll('.key');
    },
    bindEvents() {
      window.addEventListener('keydown', (e) => {
        // This when console.log here = drum object, so
        // this.getElementAndKeyCode, this.playSound etc all work
        const { keyElement, keyCode } = this.getElementAndKeyCode(e);
        this.playSound(keyElement, keyCode);
        // The this in function scope of function invoked here is also the
        // object, so no need binding for this.playAnimation
        this.playAnimation(keyElement, keyCode);
      });
      this.drumKeys.forEach((element) => {
        // When you pass in function in this manner, the this in the function
        // scope of the function passed will be the object to which the event
        // listener is attached to, therefore need binding, else the this
        // keyword in the function will not be calling the drum object
        element.addEventListener('transitionend', this.removeKeyTransition.bind(this));
      }); // For labels in transitions
      // For the remaining two, there is no this keyword in function so no need
      // bother
      this.crashRide.addEventListener('transitionend', this.removeCrashRideTransition);
      this.hiHatTop.addEventListener('transitionend', this.removeHiHatTopTransition);
    },
    getElementAndKeyCode(e) {
      const { keyCode } = e;
      const keyElement = document.querySelector(`div[data-key="${keyCode}"]`);
      // keyElement is the label labelling the illustration
      return { keyElement, keyCode };
    },
    playSound(keyElement, keyCode) {
      if (!keyElement) return; // Then it means you pressed invalid key
      const audioElement = document.querySelector(`audio[data-key="${keyCode}"]`);
      audioElement.currentTime = 0; // Stop play time
      audioElement.play(); // Play the audio
    },
    playAnimation(keyElement, keyCode) {
      if (!keyElement) return;
      switch (keyCode) {
        case 69:
        case 82:
          this.animateCrashOrRide(); // These two will need this animation
          break;
        case 75:
          this.animateHiHatClosed(); // This one will need this one animation
          break;
        default: // No default, rest no animation
      }
      keyElement.classList.toggle(this.playingClass);
      // Enlarge the illustration key
    },
    animateCrashOrRide() {
      this.crashRide.style.transform = 'rotate(0deg) scale(1.5)';
    },
    animateHiHatClosed() {
      this.hiHatTop.style.top = '171px'; // Larger value, go down
    },
    removeCrashRideTransition(e) {
      if (e.propertyName !== 'transform') return;
      e.target.style.transform = 'rotate(-7.2deg) scale(1.5)';
    },
    removeHiHatTopTransition(e) {
      e.target.style.top = '166px';
    },
    removeKeyTransition(e) {
      e.target.classList.remove(this.playingClass);
    },
  };
  drum.init();
  return drum; // For debug, after debugging remove this
})());
