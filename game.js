import {
  LAYOUTS,
  DEFAULT_LAYOUT,
  DEFAULT_GAME_MODE,
  createInitialState,
  getLayoutConfig,
  isTileFree,
  getFreeMatchingPairs,
  applySelection,
  concealTiles,
  reshuffleRemaining,
  useHint
} from './core.js';

const BEST_KEY = 'mahjong-solitaire-deluxe-best-v1';
const SOUND_KEY = 'mahjong-solitaire-deluxe-sound-v1';
const LAYOUT_KEY = 'mahjong-solitaire-deluxe-layout-v1';
const GAME_MODE_KEY = 'mahjong-solitaire-deluxe-game-mode-v1';
const SAVE_KEY = 'memory-majong-save-v2';

const boardEl = document.querySelector('#board');
const movesEl = document.querySelector('#moves');
const matchesEl = document.querySelector('#matches');
const streakEl = document.querySelector('#streak');
const bestScoreEl = document.querySelector('#best-score');
const elapsedTimeEl = document.querySelector('#elapsed-time');
const newGameButton = document.querySelector('#new-game');
const hintButton = document.querySelector('#hint-button');
const reshuffleButton = document.querySelector('#reshuffle-button');
const soundToggleButton = document.querySelector('#sound-toggle');
const statusTextEl = document.querySelector('#status-text');
const progressPillEl = document.querySelector('#progress-pill');
const layoutPillEl = document.querySelector('#layout-pill');
const gameModePillEl = document.querySelector('#game-mode-pill');
const playAgainButton = document.querySelector('#play-again');
const winDialog = document.querySelector('#win-dialog');
const winSummary = document.querySelector('#win-summary');
const layoutButtons = [...document.querySelectorAll('.layout-button')];
const gameModeButtons = [...document.querySelectorAll('.game-mode-button')];

let currentLayout = loadLayoutPreference();
let currentGameMode = loadGameModePreference();
let state = hydrateTimingState(createInitialState(currentLayout, Math.random, { gameMode: currentGameMode }));
let soundEnabled = loadSoundPreference();
let audioContext = null;
let bestScores = loadBestScores();
let timerInterval = null;
let statusOverride = '';
let mismatchTimeoutId = null;
let pairAnimationTimeoutId = null;

function hydrateTimingState(targetState, elapsedMs = 0) {
  targetState.elapsedMs = Number.isFinite(elapsedMs) ? Math.max(0, elapsedMs) : 0;
  targetState.timerStartedAt = null;
  return targetState;
}

function getElapsedMs() {
  if (!state) return 0;
  if (typeof state.elapsedMs !== 'number') state.elapsedMs = 0;
  if (state.timerStartedAt) {
    return state.elapsedMs + Math.max(0, Date.now() - state.timerStartedAt);
  }
  return state.elapsedMs;
}

function formatElapsed(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hours = Math.floor(minutes / 60);
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function stopTimer() {
  if (state && state.timerStartedAt) {
    state.elapsedMs = getElapsedMs();
    state.timerStartedAt = null;
  }
  clearInterval(timerInterval);
  timerInterval = null;
}

function startTimer() {
  if (state.complete || state.timerStartedAt) return;
  state.timerStartedAt = Date.now();
  clearInterval(timerInterval);
  timerInterval = window.setInterval(() => {
    elapsedTimeEl.textContent = formatElapsed(getElapsedMs());
  }, 250);
}

function loadBestScores() {
  try {
    const raw = window.localStorage.getItem(BEST_KEY);
    return JSON.parse(raw == null ? '{}' : raw);
  } catch (error) {
    return {};
  }
}

function loadSavedGame() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    const layout = getLayoutConfig(saved && saved.layout);
    const gameMode = saved && saved.gameMode === 'memory' ? 'memory' : 'normal';
    if (!saved || layout.key !== saved.layout) return null;
    if (!Array.isArray(saved.tiles) || saved.tiles.length !== layout.pairCount * 2) return null;

    return hydrateTimingState({
      layout: saved.layout,
      gameMode,
      pairCount: layout.pairCount,
      layoutLabel: layout.label,
      hintLabel: layout.hintLabel,
      shapeStyle: saved.shapeStyle == null ? null : saved.shapeStyle,
      shapeLabel: saved.shapeLabel == null ? '' : saved.shapeLabel,
      tiles: saved.tiles.map((tile) => ({
        symbol: tile.symbol,
        name: tile.name,
        suit: tile.suit,
        accent: tile.accent,
        pairId: tile.pairId,
        uid: tile.uid,
        x: tile.x,
        y: tile.y,
        z: tile.z,
        revealed: typeof tile.revealed === 'boolean' ? tile.revealed : gameMode !== 'memory',
        removed: Boolean(tile.removed),
        selected: Boolean(tile.selected),
        hinted: Boolean(tile.hinted)
      })),
      selectedIds: Array.isArray(saved.selectedIds) ? saved.selectedIds : [],
      hintPairIds: Array.isArray(saved.hintPairIds) ? saved.hintPairIds : [],
      moves: typeof saved.moves === 'number' ? saved.moves : 0,
      matches: typeof saved.matches === 'number' ? saved.matches : 0,
      complete: Boolean(saved.complete),
      lastAction: saved.lastAction == null ? 'idle' : saved.lastAction
    }, typeof saved.elapsedMs === 'number' ? saved.elapsedMs : 0);
  } catch {
    return null;
  }
}

function saveGame() {
  try {
    if (!state || state.complete) {
      window.localStorage.removeItem(SAVE_KEY);
      return;
    }

    const payload = {
      layout: currentLayout,
      tiles: state.tiles.map((tile) => ({
        symbol: tile.symbol,
        name: tile.name,
        suit: tile.suit,
        accent: tile.accent,
        pairId: tile.pairId,
        uid: tile.uid,
        x: tile.x,
        y: tile.y,
        z: tile.z,
        revealed: tile.revealed,
        removed: tile.removed,
        selected: tile.selected,
        hinted: tile.hinted
      })),
      gameMode: state.gameMode,
      shapeStyle: state.shapeStyle == null ? null : state.shapeStyle,
      shapeLabel: state.shapeLabel == null ? '' : state.shapeLabel,
      selectedIds: state.selectedIds,
      hintPairIds: state.hintPairIds,
      moves: state.moves,
      matches: state.matches,
      complete: state.complete,
      lastAction: state.lastAction,
      elapsedMs: getElapsedMs()
    };
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage failures
  }
}

function loadLayoutPreference() {
  try {
    const stored = window.localStorage.getItem(LAYOUT_KEY);
    return stored && LAYOUTS[stored] ? stored : DEFAULT_LAYOUT;
  } catch {
    return DEFAULT_LAYOUT;
  }
}

function saveLayoutPreference(layoutKey) {
  try {
    window.localStorage.setItem(LAYOUT_KEY, layoutKey);
  } catch {
    // ignore storage failures
  }
}

function loadGameModePreference() {
  try {
    const stored = window.localStorage.getItem(GAME_MODE_KEY);
    return stored === 'memory' ? 'memory' : DEFAULT_GAME_MODE;
  } catch {
    return DEFAULT_GAME_MODE;
  }
}

function saveGameModePreference(gameMode) {
  try {
    window.localStorage.setItem(GAME_MODE_KEY, gameMode);
  } catch {
    // ignore storage failures
  }
}

function saveBestScore(layoutKey, moves) {
  const previous = bestScores[layoutKey];
  if (!previous || moves < previous) {
    bestScores = { ...bestScores, [layoutKey]: moves };
    window.localStorage.setItem(BEST_KEY, JSON.stringify(bestScores));
    return true;
  }
  return false;
}

function loadSoundPreference() {
  try {
    const stored = window.localStorage.getItem(SOUND_KEY);
    return stored == null ? true : stored === 'on';
  } catch {
    return true;
  }
}

function saveSoundPreference(enabled) {
  try {
    window.localStorage.setItem(SOUND_KEY, enabled ? 'on' : 'off');
  } catch {
    // ignore storage failures
  }
}

function getAudioContext() {
  if (!soundEnabled || !window.AudioContext) return null;
  if (!audioContext) audioContext = new window.AudioContext();
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
  return audioContext;
}

function playTone(frequency, duration, type = 'sine', volume = 0.03, delay = 0) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(ctx.currentTime + delay);
  oscillator.stop(ctx.currentTime + delay + duration);
}

function playSelectSound() { playTone(480, 0.08, 'triangle', 0.02); }
function playMatchSound() {
  playTone(620, 0.09, 'sine', 0.03);
  playTone(820, 0.16, 'triangle', 0.022, 0.04);
}
function playBlockedSound() { playTone(210, 0.12, 'sawtooth', 0.015); }
function playHintSound() { playTone(700, 0.12, 'triangle', 0.022); playTone(930, 0.12, 'sine', 0.018, 0.04); }
function playWinSound() { [523.25, 659.25, 783.99, 1046.5].forEach((note, i) => playTone(note, 0.28, 'triangle', 0.025, i * 0.09)); }

function bestLabel() {
  const best = bestScores[currentLayout];
  return best ? `${best} moves` : '—';
}

function readPxVar(name, fallback) {
  const value = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
  return Number.isFinite(value) ? value : fallback;
}

function getLayoutMetrics() {
  return {
    stepX: readPxVar('--step-x', 38),
    stepY: readPxVar('--step-y', 54),
    liftX: readPxVar('--lift-x', 10),
    liftY: readPxVar('--lift-y', 10),
    tileWidth: readPxVar('--tile-width', 82),
    tileHeight: readPxVar('--tile-height', 106)
  };
}

function updateLayoutButtons() {
  layoutButtons.forEach((button) => {
    const active = button.dataset.layout === currentLayout;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function updateGameModeButtons() {
  gameModeButtons.forEach((button) => {
    const active = button.dataset.gameMode === currentGameMode;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function getFreePairCount() {
  return getFreeMatchingPairs(state).length;
}

function statusText() {
  if (statusOverride) return statusOverride;
  const freePairs = getFreePairCount();
  if (state.complete) return 'Table cleared. Nice and clean.';
  if (freePairs === 0) return 'No free matching pairs remain. Start a fresh layout and we can tune shuffle rules later if needed.';
  if (state.gameMode === 'memory') {
    if (state.selectedIds.length === 1) return 'One free tile is revealed. Try to remember where its match is.';
    if (state.selectedIds.length === 2) return 'Those two do not match — they will hide again.';
    return `Memory mode is on. There ${freePairs === 1 ? 'is' : 'are'} ${freePairs} free matching ${freePairs === 1 ? 'pair' : 'pairs'} hidden in the stack.`;
  }
  if (state.selectedIds.length === 1) {
    const tile = state.tiles.find((entry) => entry.uid === state.selectedIds[0]);
    return tile ? `${tile.name} selected. Find its matching free tile.` : 'A tile is selected.';
  }
  return `There ${freePairs === 1 ? 'is' : 'are'} ${freePairs} free matching ${freePairs === 1 ? 'pair' : 'pairs'} right now.`;
}

function clearMismatchTimeout() {
  if (mismatchTimeoutId) {
    window.clearTimeout(mismatchTimeoutId);
    mismatchTimeoutId = null;
  }
}

function clearPairAnimationTimeout() {
  if (pairAnimationTimeoutId) {
    window.clearTimeout(pairAnimationTimeoutId);
    pairAnimationTimeoutId = null;
  }
}

function animateMatchedPair(tileIds, onComplete) {
  const elements = tileIds
    .map((id) => boardEl.querySelector(`.tile[data-id="${id}"]`))
    .filter(Boolean);

  if (elements.length < 2) {
    onComplete();
    return;
  }

  const ordered = [...elements].sort((a, b) => Number(a.style.left.replace('px', '')) - Number(b.style.left.replace('px', '')));
  ordered[0].classList.add('is-celebrating-left');
  ordered[1].classList.add('is-celebrating-right');
  pairAnimationTimeoutId = window.setTimeout(() => {
    pairAnimationTimeoutId = null;
    onComplete();
  }, 360);
}

function setStatus(message, persistMs = 0) {
  statusOverride = message;
  render();
  if (persistMs > 0) {
    window.clearTimeout(setStatus.timeoutId);
    setStatus.timeoutId = window.setTimeout(() => {
      statusOverride = '';
      render();
    }, persistMs);
  }
}

function handleShortcuts(event) {
  if (event.defaultPrevented) return;
  const target = event.target;
  const tagName = target && target.tagName && typeof target.tagName.toLowerCase === 'function'
    ? target.tagName.toLowerCase()
    : '';
  if (tagName === 'input' || tagName === 'textarea' || (target && target.isContentEditable)) return;

  if (event.key.toLowerCase() === 'n') {
    event.preventDefault();
    resetGame(currentLayout);
    return;
  }

  if (event.key.toLowerCase() === 'h') {
    event.preventDefault();
    hintButton.click();
    return;
  }

  if (event.key.toLowerCase() === 'r') {
    event.preventDefault();
    reshuffleButton.click();
    return;
  }

  if (['1', '2', '3'].includes(event.key)) {
    const layoutKeys = ['easy', 'classic', 'grand'];
    const next = layoutKeys[Number(event.key) - 1];
    if (next) {
      event.preventDefault();
      resetGame(next);
    }
  }

  if (event.key.toLowerCase() === 'm') {
    event.preventDefault();
    setGameMode(currentGameMode === 'normal' ? 'memory' : 'normal');
  }
}

function render() {
  const layout = getLayoutConfig(currentLayout);
  const freePairs = getFreePairCount();
  movesEl.textContent = String(state.moves);
  matchesEl.textContent = `${state.matches} / ${state.pairCount}`;
  streakEl.textContent = String(freePairs);
  bestScoreEl.textContent = bestLabel();
  elapsedTimeEl.textContent = formatElapsed(getElapsedMs());
  progressPillEl.textContent = `${state.matches} / ${state.pairCount} pairs cleared`;
  layoutPillEl.textContent = `${layout.label} · ${state.pairCount * 2} tiles${state.shapeLabel ? ` · ${state.shapeLabel}` : ''}`;
  gameModePillEl.textContent = state.gameMode === 'memory' ? 'Memory mode' : 'Classic mode';
  statusTextEl.textContent = statusText();
  soundToggleButton.textContent = `Sound: ${soundEnabled ? 'On' : 'Off'}`;
  soundToggleButton.setAttribute('aria-pressed', String(soundEnabled));
  hintButton.disabled = state.complete;
  hintButton.textContent = layout.hintLabel;
  reshuffleButton.disabled = state.complete || state.matches === state.pairCount;
  updateLayoutButtons();
  updateGameModeButtons();
  saveGame();
  boardEl.replaceChildren();

  const activeTiles = state.tiles.filter((tile) => !tile.removed);
  const boundsTiles = activeTiles.length > 0 ? activeTiles : state.tiles;
  const { stepX, stepY, liftX, liftY, tileWidth, tileHeight } = getLayoutMetrics();
  const minX = Math.min(...boundsTiles.map((tile) => tile.x));
  const maxX = Math.max(...boundsTiles.map((tile) => tile.x));
  const minY = Math.min(...boundsTiles.map((tile) => tile.y));
  const maxY = Math.max(...boundsTiles.map((tile) => tile.y));
  const maxZ = Math.max(...boundsTiles.map((tile) => tile.z));
  boardEl.style.setProperty('--board-width', `${(maxX - minX) * stepX + tileWidth + maxZ * liftX}px`);
  boardEl.style.setProperty('--board-height', `${(maxY - minY) * stepY + tileHeight + 16}px`);

  const freeIds = new Set(state.tiles.filter((tile) => isTileFree(state, tile)).map((tile) => tile.uid));

  for (const tile of state.tiles) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tile';
    if (tile.removed) button.classList.add('is-removed');
    if (tile.selected) button.classList.add('is-selected');
    if (tile.hinted) button.classList.add('is-hinted');
    const concealed = state.gameMode === 'memory' && !tile.revealed;
    if (concealed) button.classList.add('is-concealed');
    if (freeIds.has(tile.uid)) button.classList.add('is-free');
    else button.classList.add('is-blocked');
    if (tile.z === maxZ) button.classList.add('is-top');
    button.dataset.id = tile.uid;
    button.dataset.accent = tile.accent;
    button.setAttribute('role', 'gridcell');
    button.setAttribute('aria-label', `${tile.name}${freeIds.has(tile.uid) ? ', free tile' : ', blocked tile'}`);
    button.style.left = `${(tile.x - minX) * stepX + tile.z * liftX}px`;
    button.style.top = `${(tile.y - minY) * stepY - tile.z * liftY}px`;
    button.style.zIndex = String(tile.z * 100 + tile.y * 10 + tile.x + (tile.selected ? 1000 : 0));
    button.innerHTML = concealed ? `
      <span class="tile-side" aria-hidden="true"></span>
      <span class="tile-front-edge" aria-hidden="true"></span>
      <span class="tile-face tile-face--back">
        <span class="tile-back-pattern" aria-hidden="true"></span>
      </span>
    ` : `
      <span class="tile-side" aria-hidden="true"></span>
      <span class="tile-front-edge" aria-hidden="true"></span>
      <span class="tile-face">
        <span class="tile-ink">
          <span class="tile-glyph" aria-hidden="true">${tile.symbol}</span>
        </span>
      </span>
    `;
    button.addEventListener('click', () => onTileClick(tile.uid));
    boardEl.appendChild(button);
  }

  if (state.complete) {
    const isNewBest = saveBestScore(currentLayout, state.moves);
    bestScoreEl.textContent = bestLabel();
    stopTimer();
    winSummary.textContent = `${layout.label} cleared in ${state.moves} moves over ${formatElapsed(getElapsedMs())}.${isNewBest ? ' New personal best ✨' : ''}`;
    if (!winDialog.open) {
      playWinSound();
      winDialog.showModal();
    }
  }
}

function resetGame(layoutKey = currentLayout, gameMode = currentGameMode) {
  clearMismatchTimeout();
  clearPairAnimationTimeout();
  stopTimer();
  if (winDialog.open) winDialog.close();
  statusOverride = '';
  currentLayout = layoutKey;
  currentGameMode = gameMode;
  saveLayoutPreference(currentLayout);
  saveGameModePreference(currentGameMode);
  state = hydrateTimingState(createInitialState(currentLayout, Math.random, { gameMode: currentGameMode }));
  startTimer();
  render();
}

function setGameMode(gameMode) {
  if (gameMode !== 'normal' && gameMode !== 'memory') return;
  resetGame(currentLayout, gameMode);
}

function onTileClick(tileId) {
  if (mismatchTimeoutId || pairAnimationTimeoutId) return;

  const candidate = state.tiles.find((tile) => tile.uid === tileId);
  const previousSelection = [...state.selectedIds];
  const isPotentialMatch =
    previousSelection.length === 1 &&
    previousSelection[0] !== tileId &&
    candidate &&
    !candidate.removed &&
    isTileFree(state, candidate) &&
    (() => {
      const previousTile = state.tiles.find((tile) => tile.uid === previousSelection[0]);
      return previousTile ? previousTile.pairId === candidate.pairId : false;
    })();

  if (isPotentialMatch) {
    const pairIds = [previousSelection[0], tileId];
    playMatchSound();
    animateMatchedPair(pairIds, () => {
      applySelection(state, tileId);
      setStatus('Clean pull. Pair removed.', 1200);
      render();
    });
    return;
  }

  const { action } = applySelection(state, tileId);
  if (action === 'blocked') {
    playBlockedSound();
    setStatus('That tile is blocked — it needs open air above and a free edge.', 1600);
    return;
  }

  if (action === 'selected' || action === 'deselected') {
    playSelectSound();
  } else if (action === 'mismatch') {
    playBlockedSound();
    if (state.gameMode === 'memory') {
      setStatus('Not a match — those tiles are hiding again.', 1200);
      render();
      mismatchTimeoutId = window.setTimeout(() => {
        concealTiles(state);
        mismatchTimeoutId = null;
        render();
      }, 850);
      return;
    }
    setStatus('Not a matching pair — I kept the newer tile selected for you.', 1200);
  }

  render();
}

newGameButton.addEventListener('click', () => resetGame(currentLayout));
hintButton.addEventListener('click', () => {
  const hinted = useHint(state);
  if (!hinted) {
    playBlockedSound();
    setStatus('No free matching pair to hint right now.', 1500);
    return;
  }
  playHintSound();
  setStatus('Hint: the highlighted pair is currently free.', 1500);
});
reshuffleButton.addEventListener('click', () => {
  const reshuffled = reshuffleRemaining(state);
  if (!reshuffled) {
    playBlockedSound();
    setStatus('Nothing left to reshuffle.', 1200);
    return;
  }
  playHintSound();
  setStatus('Remaining tiles reshuffled.', 1200);
  render();
});
soundToggleButton.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  saveSoundPreference(soundEnabled);
  render();
});
if (playAgainButton) {
  playAgainButton.addEventListener('click', (event) => {
    event.preventDefault();
    resetGame(currentLayout);
  });
}
layoutButtons.forEach((button) => {
  button.addEventListener('click', () => resetGame(button.dataset.layout));
});
gameModeButtons.forEach((button) => {
  button.addEventListener('click', () => setGameMode(button.dataset.gameMode));
});
window.addEventListener('keydown', handleShortcuts);

const savedGame = loadSavedGame();
if (savedGame) {
  currentLayout = savedGame.layout;
  currentGameMode = savedGame.gameMode == null ? loadGameModePreference() : savedGame.gameMode;
  state = savedGame;
  startTimer();
  render();
} else {
  resetGame(currentLayout);
}
