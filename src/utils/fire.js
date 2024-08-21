import confetti from 'canvas-confetti';

var count = 200;
var defaults = {
   origin: { y: 0.9 },
};

function initFire(particleRatio, opts) {
   confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
   });
}

export function fireCompletedLesson() {
   initFire(0.25, {
      spread: 26,
      startVelocity: 55,
   });
   initFire(0.2, {
      spread: 60,
   });
   initFire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
   });
   initFire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
   });
   initFire(0.1, {
      spread: 120,
      startVelocity: 45,
   });
}
