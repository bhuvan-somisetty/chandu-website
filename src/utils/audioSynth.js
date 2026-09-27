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
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);

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

export function playBirthdayTune() {
  // Happy Birthday to You notes
  const notes = [
    { f: 261.63, d: 250 }, { f: 261.63, d: 250 }, { f: 293.66, d: 500 }, { f: 261.63, d: 500 },
    { f: 349.23, d: 500 }, { f: 329.63, d: 1000 },
    { f: 261.63, d: 250 }, { f: 261.63, d: 250 }, { f: 293.66, d: 500 }, { f: 261.63, d: 500 },
    { f: 392.00, d: 500 }, { f: 349.23, d: 1000 },
    { f: 261.63, d: 250 }, { f: 261.63, d: 250 }, { f: 523.25, d: 500 }, { f: 440.00, d: 500 },
    { f: 349.23, d: 500 }, { f: 329.63, d: 500 }, { f: 293.66, d: 750 },
    { f: 466.16, d: 250 }, { f: 466.16, d: 250 }, { f: 440.00, d: 500 }, { f: 349.23, d: 500 },
    { f: 392.00, d: 500 }, { f: 349.23, d: 1000 }
  ];

  let currentDelay = 0;
  notes.forEach((note) => {
    setTimeout(() => {
      playTone(note.f, 'triangle', note.d / 1000 * 0.9, 0.18);
    }, currentDelay);
    currentDelay += note.d + 50;
  });
}

export const PIANO_KEYS = {
  'C4': 261.63,
  'C#4': 277.18,
  'D4': 293.66,
  'D#4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'F#4': 369.99,
  'G4': 392.00,
  'G#4': 415.30,
  'A4': 440.00,
  'A#4': 466.16,
  'B4': 493.88,
  'C5': 523.25,
  'D5': 587.33,
  'E5': 659.25
};

export function playPianoKey(keyNote) {
  const freq = PIANO_KEYS[keyNote];
  if (freq) {
    playTone(freq, 'triangle', 0.4, 0.2);
  }
}

export function playChord(frequencies, duration = 0.4) { frequencies.forEach(f => playTone(f, 'sine', duration, 0.1)); }
