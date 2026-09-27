// Pure Web Audio API Sound & Music Synthesizer
let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundMuted(muted) {
  isMuted = muted;
}

export function isSoundMuted() {
  return isMuted;
}

export function playTone(freq, type = 'sine', duration = 0.2, volume = 0.15) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // ignore audio errors
  }
}

export function playPop() {
  playTone(520 + Math.random() * 200, 'sine', 0.08, 0.2);
}

export function playSparkle() {
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playTone(freq, 'triangle', 0.25, 0.12);
    }, idx * 60);
  });
}

export function playChime() {
  const notes = [440, 554.37, 659.25, 880];
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      playTone(freq, 'sine', 0.35, 0.15);
    }, idx * 80);
  });
}

export function playFanfare() {
  const melody = [
    { freq: 523.25, d: 0.15 },
    { freq: 523.25, d: 0.15 },
    { freq: 523.25, d: 0.15 },
    { freq: 659.25, d: 0.35 },
    { freq: 523.25, d: 0.15 },
    { freq: 783.99, d: 0.5 }
  ];
  let delay = 0;
  melody.forEach((item) => {
    setTimeout(() => {
      playTone(item.freq, 'triangle', item.d, 0.2);
    }, delay);
    delay += item.d * 1000 + 40;
  });
}
