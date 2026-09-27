// LocalStorage manager for game scores, wishes, achievements & customizations

const KEYS = {
  THEME: 'bday_theme',
  ACHIEVEMENTS: 'bday_achievements',
  GAME_SCORES: 'bday_game_scores',
  WISHES: 'bday_wishes',
  CUSTOM_CARDS: 'bday_custom_cards',
  SOUND_MUTED: 'bday_sound_muted',
  CAKE_CUSTOM: 'bday_cake_design'
};

export function getStoredItem(key, fallback = null) {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

export function setStoredItem(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // ignore quota errors
  }
}

export { KEYS };
