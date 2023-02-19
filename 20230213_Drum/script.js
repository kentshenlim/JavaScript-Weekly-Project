const x = ((function () {
  const drum = {
    init() {
      this.cacheDom();
    },
    cacheDom() {
      this.playingClass = 'playing'; // See last declaration of CSS
      this.crashRide = document.getElementById('crash-ride');
      this.hiHatTop = document.getElementById('hihat-top');
    },
    getElementAndKeyCode(e) {
      const { keyCode } = e;
      const keyElement = document.querySelector(`div[data-keys="${keyCode}"]`);
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
      this.hiHatTop.style.top = '171px';
    },
    removeCrashRideTransition(e) {
      if (e.propertyName !== 'tranform') return;
      e.target.style.transform = 'rotate(-7.2deg) scale(1.5)';
    },

  };
})());
