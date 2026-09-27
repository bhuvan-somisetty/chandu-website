import confetti from 'canvas-confetti';

export function triggerConfetti(options = {}) {
  const defaults = {
    particleCount: 60,
    spread: 70,
    origin: { y: 0.6 }
  };
  confetti({ ...defaults, ...options });
}

export function triggerPrideConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function triggerHeartBurst(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 40,
    spread: 80,
    origin: { x, y },
    colors: ['#ff4081', '#ff79b0', '#ff1744', '#f50057', '#ff80ab'],
    shapes: ['circle'],
    scalar: 1.2
  });
}

export function triggerStarShower() {
  const end = Date.now() + 1000;
  const colors = ['#ffd700', '#ffaa00', '#fff3e0', '#ffb300'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export function triggerThemedConfetti(colors = ['#ff4081', '#ffd700']) { triggerConfetti({ colors }); }
