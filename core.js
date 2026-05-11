export const TILE_SET = [
  { symbol: '🀇', name: 'One Bamboo', suit: 'bamboo', accent: 'jade' },
  { symbol: '🀈', name: 'Two Bamboo', suit: 'bamboo', accent: 'jade' },
  { symbol: '🀉', name: 'Three Bamboo', suit: 'bamboo', accent: 'jade' },
  { symbol: '🀊', name: 'Four Bamboo', suit: 'bamboo', accent: 'jade' },
  { symbol: '🀋', name: 'Five Bamboo', suit: 'bamboo', accent: 'jade' },
  { symbol: '🀌', name: 'Six Bamboo', suit: 'bamboo', accent: 'jade' },
  { symbol: '🀍', name: 'Seven Bamboo', suit: 'bamboo', accent: 'jade' },
  { symbol: '🀎', name: 'Eight Bamboo', suit: 'bamboo', accent: 'jade' },
  { symbol: '🀏', name: 'Nine Bamboo', suit: 'bamboo', accent: 'jade' },
  { symbol: '🀐', name: 'One Circle', suit: 'circle', accent: 'blue' },
  { symbol: '🀑', name: 'Two Circle', suit: 'circle', accent: 'blue' },
  { symbol: '🀒', name: 'Three Circle', suit: 'circle', accent: 'blue' },
  { symbol: '🀓', name: 'Four Circle', suit: 'circle', accent: 'blue' },
  { symbol: '🀔', name: 'Five Circle', suit: 'circle', accent: 'blue' },
  { symbol: '🀕', name: 'Six Circle', suit: 'circle', accent: 'blue' },
  { symbol: '🀖', name: 'Seven Circle', suit: 'circle', accent: 'blue' },
  { symbol: '🀗', name: 'Eight Circle', suit: 'circle', accent: 'blue' },
  { symbol: '🀘', name: 'Nine Circle', suit: 'circle', accent: 'blue' },
  { symbol: '🀀', name: 'East Wind', suit: 'wind', accent: 'gold' },
  { symbol: '🀁', name: 'South Wind', suit: 'wind', accent: 'gold' },
  { symbol: '🀂', name: 'West Wind', suit: 'wind', accent: 'gold' },
  { symbol: '🀃', name: 'North Wind', suit: 'wind', accent: 'gold' },
  { symbol: '🀄', name: 'Red Dragon', suit: 'dragon', accent: 'red' },
  { symbol: '🀅', name: 'Green Dragon', suit: 'dragon', accent: 'jade' }
];

export const LAYOUTS = {
  easy: {
    key: 'easy',
    label: 'Turtle Garden',
    pairCount: 12,
    hintLabel: 'Hint',
    coords: [
      [2, 0, 0], [4, 0, 0], [6, 0, 0], [8, 0, 0],
      [0, 2, 0], [2, 2, 0], [4, 2, 0], [6, 2, 0], [8, 2, 0], [10, 2, 0],
      [0, 4, 0], [2, 4, 0], [4, 4, 0], [6, 4, 0], [8, 4, 0], [10, 4, 0],
      [2, 6, 0], [4, 6, 0], [6, 6, 0], [8, 6, 0],
      [2, 2, 1], [4, 2, 1], [6, 2, 1], [8, 2, 1]
    ]
  },
  classic: {
    key: 'classic',
    label: 'Dragon Bridge',
    pairCount: 18,
    hintLabel: 'Hint',
    coords: [
      [2, 0, 0], [4, 0, 0], [6, 0, 0], [8, 0, 0],
      [0, 2, 0], [2, 2, 0], [4, 2, 0], [6, 2, 0], [8, 2, 0], [10, 2, 0],
      [0, 4, 0], [2, 4, 0], [4, 4, 0], [6, 4, 0], [8, 4, 0], [10, 4, 0],
      [0, 6, 0], [2, 6, 0], [4, 6, 0], [6, 6, 0], [8, 6, 0], [10, 6, 0],
      [2, 8, 0], [4, 8, 0], [6, 8, 0], [8, 8, 0],
      [2, 2, 1], [4, 2, 1], [6, 2, 1], [8, 2, 1],
      [2, 4, 1], [4, 4, 1], [6, 4, 1], [8, 4, 1],
      [4, 6, 1], [6, 6, 1]
    ]
  },
  grand: {
    key: 'grand',
    label: 'Fortress of Winds',
    pairCount: 24,
    hintLabel: 'Hint',
    coords: [
      [4, 0, 0], [6, 0, 0], [8, 0, 0], [10, 0, 0], [12, 0, 0],
      [2, 2, 0], [4, 2, 0], [6, 2, 0], [8, 2, 0], [10, 2, 0], [12, 2, 0], [14, 2, 0],
      [0, 4, 0], [2, 4, 0], [4, 4, 0], [6, 4, 0], [8, 4, 0], [10, 4, 0], [12, 4, 0], [14, 4, 0],
      [0, 6, 0], [2, 6, 0], [4, 6, 0], [6, 6, 0], [8, 6, 0], [10, 6, 0], [12, 6, 0], [14, 6, 0],
      [2, 8, 0], [4, 8, 0], [6, 8, 0], [8, 8, 0], [10, 8, 0], [12, 8, 0], [14, 8, 0],
      [4, 10, 0], [6, 10, 0], [8, 10, 0], [10, 10, 0], [12, 10, 0],
      [4, 4, 1], [8, 4, 1], [12, 4, 1], [4, 6, 1], [8, 6, 1], [12, 6, 1],
      [8, 4, 2], [8, 6, 2]
    ]
  }
};

export const DEFAULT_LAYOUT = 'classic';
export const GAME_MODES = {
  normal: {
    key: 'normal',
    label: 'Mahjong'
  },
  memory: {
    key: 'memory',
    label: 'Memory Mahjong'
  }
};

export const DEFAULT_GAME_MODE = 'memory';

export function getLayoutConfig(layoutKey = DEFAULT_LAYOUT) {
  return LAYOUTS[layoutKey] ?? LAYOUTS[DEFAULT_LAYOUT];
}

const SHAPE_STYLES = ['diamond', 'h', 'building', 'butterfly', 'spider', 'pagoda'];
const SHAPE_LABELS = {
  diamond: 'Diamond',
  h: 'H Shape',
  building: 'Building',
  butterfly: 'Butterfly',
  spider: 'Spider',
  pagoda: 'Pagoda'
};

function shuffle(items, random = Math.random) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getGameModeConfig(gameMode = DEFAULT_GAME_MODE) {
  return GAME_MODES[gameMode] ?? GAME_MODES[DEFAULT_GAME_MODE];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function expandProfile(template, rows) {
  if (rows === template.length) return [...template];
  if (rows === 1) return [template[Math.floor(template.length / 2)]];
  return Array.from({ length: rows }, (_, index) => {
    const position = (index / (rows - 1)) * (template.length - 1);
    const left = Math.floor(position);
    const right = Math.min(template.length - 1, Math.ceil(position));
    const mix = position - left;
    return template[left] + (template[right] - template[left]) * mix;
  });
}

function scaleProfile(profile, totalCells) {
  const raw = profile.map((value) => Math.max(1, value));
  const sum = raw.reduce((acc, value) => acc + value, 0);
  const scaled = raw.map((value) => Math.max(1, Math.floor((value / sum) * totalCells)));
  let used = scaled.reduce((acc, value) => acc + value, 0);

  while (used < totalCells) {
    let targetIndex = 0;
    let bestGap = -Infinity;
    for (let index = 0; index < scaled.length; index += 1) {
      const gap = raw[index] - scaled[index];
      if (gap > bestGap) {
        bestGap = gap;
        targetIndex = index;
      }
    }
    scaled[targetIndex] += 1;
    used += 1;
  }

  while (used > totalCells) {
    let targetIndex = scaled.findIndex((value) => value > 1);
    if (targetIndex === -1) break;
    for (let index = 0; index < scaled.length; index += 1) {
      if (scaled[index] > scaled[targetIndex]) targetIndex = index;
    }
    scaled[targetIndex] -= 1;
    used -= 1;
  }

  return scaled;
}

function rowSpanForStyle(style, filledCount, rowIndex, rowCount) {
  const center = (rowCount - 1) / 2;
  const normalized = rowCount <= 1 ? 0 : Math.abs(rowIndex - center) / Math.max(center, 1);

  if (style === 'h') {
    if (rowIndex === Math.floor(center) || rowIndex === Math.ceil(center)) return filledCount;
    return Math.max(filledCount + 4, 6);
  }
  if (style === 'butterfly') {
    return normalized < 0.34 ? filledCount : Math.max(filledCount + 2, 6);
  }
  if (style === 'spider') {
    return normalized < 0.25 ? filledCount : Math.max(filledCount + (normalized > 0.8 ? 4 : 2), 7);
  }
  return filledCount;
}

function shapeSegments(style, rowIndex, rowCount, spanWidth) {
  const center = (rowCount - 1) / 2;
  const normalized = rowCount <= 1 ? 0 : Math.abs(rowIndex - center) / Math.max(center, 1);

  if (style === 'diamond' || style === 'building' || style === 'pagoda') {
    return [[0, spanWidth - 1]];
  }

  if (style === 'h') {
    if (rowCount <= 2 || rowIndex === Math.floor(center) || rowIndex === Math.ceil(center)) return [[0, spanWidth - 1]];
    const leg = Math.max(2, Math.floor(spanWidth * 0.28));
    return [[0, leg - 1], [spanWidth - leg, spanWidth - 1]];
  }

  if (style === 'butterfly') {
    if (normalized < 0.34 || spanWidth < 6) return [[0, spanWidth - 1]];
    const wing = Math.max(2, Math.floor(spanWidth * 0.3));
    return [[0, wing - 1], [spanWidth - wing, spanWidth - 1]];
  }

  if (style === 'spider') {
    if (normalized < 0.25) return [[0, spanWidth - 1]];
    if (normalized > 0.8 && spanWidth >= 7) {
      const leg = Math.max(1, Math.floor(spanWidth * 0.2));
      const middle = Math.max(1, spanWidth - leg * 2 - 2);
      const middleStart = Math.floor((spanWidth - middle) / 2);
      return [[0, leg - 1], [middleStart, middleStart + middle - 1], [spanWidth - leg, spanWidth - 1]];
    }
    const leg = Math.max(2, Math.floor(spanWidth * 0.24));
    return [[0, leg - 1], [spanWidth - leg, spanWidth - 1]];
  }

  return [[0, spanWidth - 1]];
}

function baseProfileForStyle(style) {
  switch (style) {
    case 'diamond': return [2, 4, 6, 8, 6, 4, 2];
    case 'h': return [5, 5, 8, 5, 5];
    case 'building': return [4, 6, 6, 6, 6, 4];
    case 'butterfly': return [3, 6, 4, 8, 4, 6, 3];
    case 'spider': return [2, 5, 7, 8, 7, 5, 2];
    case 'pagoda': return [2, 4, 6, 8, 6, 4];
    default: return [2, 4, 6, 4, 2];
  }
}

function generateLayerCoords(cellCount, style, layerIndex = 0) {
  const rows = clamp(Math.round(Math.sqrt(cellCount / 1.8)) + layerIndex, 3, 7);
  const profile = expandProfile(baseProfileForStyle(style), rows);
  const rowTargets = scaleProfile(profile, cellCount);
  const rowSpans = rowTargets.map((targetCount, rowIndex) => rowSpanForStyle(style, targetCount, rowIndex, rows));
  const widest = Math.max(...rowSpans);
  const coords = [];
  const used = new Set();

  const addCoord = (x, y) => {
    const key = `${x},${y},${layerIndex}`;
    if (used.has(key)) return false;
    used.add(key);
    coords.push([x, y, layerIndex]);
    return true;
  };

  rowTargets.forEach((targetCount, rowIndex) => {
    const rowStartCount = coords.length;
    const spanWidth = rowSpanForStyle(style, targetCount, rowIndex, rows);
    const segments = shapeSegments(style, rowIndex, rows, spanWidth);
    const segmentLengths = segments.map(([start, end]) => end - start + 1);
    const segmentSum = segmentLengths.reduce((sum, value) => sum + value, 0);
    const segmentCounts = segmentLengths.map((length) => Math.max(1, Math.floor((length / segmentSum) * targetCount)));
    let assigned = segmentCounts.reduce((sum, value) => sum + value, 0);

    while (assigned < targetCount) {
      let target = -1;
      let bestCapacity = -1;
      for (let i = 0; i < segmentCounts.length; i += 1) {
        const capacityLeft = segmentLengths[i] - segmentCounts[i];
        if (capacityLeft > bestCapacity) {
          bestCapacity = capacityLeft;
          target = i;
        }
      }
      if (target === -1 || bestCapacity <= 0) break;
      segmentCounts[target] += 1;
      assigned += 1;
    }

    while (assigned > targetCount) {
      let target = segmentCounts.findIndex((value) => value > 1);
      if (target === -1) break;
      for (let i = 1; i < segmentCounts.length; i += 1) {
        if (segmentCounts[i] > segmentCounts[target]) target = i;
      }
      segmentCounts[target] -= 1;
      assigned -= 1;
    }

    segments.forEach(([segmentStart, segmentEnd], segmentIndex) => {
      const segmentWidth = segmentEnd - segmentStart + 1;
      const filled = Math.min(segmentWidth, segmentCounts[segmentIndex]);
      const inset = Math.floor((segmentWidth - filled) / 2);
      const actualStart = segmentStart + inset;
      for (let cell = 0; cell < filled; cell += 1) {
        const x = (Math.round((widest - spanWidth) / 2) + actualStart + cell) * 2;
        addCoord(x, rowIndex * 2);
      }
    });

    let rowPlaced = coords.length - rowStartCount;
    if (rowPlaced < targetCount) {
      const centerOut = [];
      const middle = (spanWidth - 1) / 2;
      for (let cell = 0; cell < spanWidth; cell += 1) {
        centerOut.push({ cell, distance: Math.abs(cell - middle) });
      }
      centerOut.sort((a, b) => a.distance - b.distance || a.cell - b.cell);
      for (const { cell } of centerOut) {
        if (rowPlaced >= targetCount) break;
        const x = (Math.round((widest - spanWidth) / 2) + cell) * 2;
        if (addCoord(x, rowIndex * 2)) rowPlaced += 1;
      }
    }
  });

  return coords.slice(0, cellCount);
}

function layerBreakdown(tileCount) {
  if (tileCount <= 16) return [tileCount];
  if (tileCount <= 26) return [tileCount - 4, 4];
  if (tileCount <= 38) return [tileCount - 8, 6, 2];
  return [tileCount - 12, 8, 4];
}

function normalizeCoords(coords) {
  const minX = Math.min(...coords.map(([x]) => x));
  const minY = Math.min(...coords.map(([, y]) => y));
  return coords.map(([x, y, z]) => [x - minX, y - minY, z]);
}

function generateShapeCoords(tileCount, random = Math.random, forcedStyle = null) {
  const style = forcedStyle ?? SHAPE_STYLES[Math.floor(random() * SHAPE_STYLES.length)];
  const layers = layerBreakdown(tileCount);
  const coords = layers.flatMap((count, layerIndex) => generateLayerCoords(count, style, layerIndex));
  return {
    style,
    shapeLabel: SHAPE_LABELS[style] ?? style,
    coords: normalizeCoords(coords)
  };
}

function buildInitialState(layout, gameMode = DEFAULT_GAME_MODE, random = Math.random) {
  const mode = getGameModeConfig(gameMode);
  const pool = shuffle(TILE_SET.slice(0, layout.pairCount), random);
  const pairDefs = shuffle(pool.flatMap((tile, pairId) => ([
    { ...tile, pairId, uid: `${pairId}-a` },
    { ...tile, pairId, uid: `${pairId}-b` }
  ])), random);

  const shape = generateShapeCoords(layout.pairCount * 2, random);
  const tiles = shape.coords.map(([x, y, z], index) => ({
    ...pairDefs[index],
    x,
    y,
    z,
    revealed: mode.key === 'normal',
    removed: false,
    selected: false,
    hinted: false
  }));

  return {
    layout: layout.key,
    pairCount: layout.pairCount,
    layoutLabel: layout.label,
    hintLabel: layout.hintLabel,
    gameMode: mode.key,
    shapeStyle: shape.style,
    shapeLabel: shape.shapeLabel,
    tiles,
    selectedIds: [],
    hintPairIds: [],
    moves: 0,
    matches: 0,
    complete: false,
    lastAction: 'idle'
  };
}

export function createInitialState(layoutKey = DEFAULT_LAYOUT, random = Math.random, options = {}) {
  const layout = getLayoutConfig(layoutKey);
  const gameMode = typeof options === 'string' ? options : (options.gameMode ?? DEFAULT_GAME_MODE);
  let fallback = buildInitialState(layout, gameMode, random);

  for (let attempt = 0; attempt < 24; attempt += 1) {
    const candidate = buildInitialState(layout, gameMode, random);
    if (getFreeMatchingPairs(candidate).length > 0) return candidate;
    fallback = candidate;
  }

  return fallback;
}

export function reshuffleRemaining(state, random = Math.random) {
  const remainingTiles = state.tiles.filter((tile) => !tile.removed);
  if (remainingTiles.length < 2) return false;

  const pairDefs = remainingTiles.map(({ symbol, name, suit, accent, pairId, uid }) => ({ symbol, name, suit, accent, pairId, uid }));
  let fallback = null;

  for (let attempt = 0; attempt < 24; attempt += 1) {
    const shape = generateShapeCoords(remainingTiles.length, random);
    const coords = shape.coords.map(([x, y, z]) => ({ x, y, z }));
    const shuffledPairs = shuffle(pairDefs, random);
    const candidateTiles = coords.map((coord, index) => ({
      ...shuffledPairs[index],
      ...coord,
      removed: false,
      selected: false,
      hinted: false,
      revealed: state.gameMode === 'memory' ? false : true
    }));
    const candidateState = {
      ...state,
      tiles: state.tiles
        .filter((tile) => tile.removed)
        .map((tile) => ({ ...tile, selected: false, hinted: false }))
        .concat(candidateTiles),
      selectedIds: [],
      hintPairIds: [],
      shapeStyle: shape.style,
      shapeLabel: shape.shapeLabel
    };
    if (getFreeMatchingPairs(candidateState).length > 0) {
      state.tiles = candidateState.tiles;
      state.selectedIds = [];
      state.hintPairIds = [];
      state.lastAction = 'reshuffled';
      return true;
    }
    fallback = candidateState;
  }

  if (fallback) {
    state.tiles = fallback.tiles;
    state.selectedIds = [];
    state.hintPairIds = [];
    state.lastAction = 'reshuffled';
    return true;
  }

  return false;
}

export function getTile(state, tileId) {
  return state.tiles.find((tile) => tile.uid === tileId) ?? null;
}

export function isTileFree(state, tileOrId) {
  const tile = typeof tileOrId === 'string' ? getTile(state, tileOrId) : tileOrId;
  if (!tile || tile.removed) return false;

  const covered = state.tiles.some((other) => (
    !other.removed && other.uid !== tile.uid && other.x === tile.x && other.y === tile.y && other.z > tile.z
  ));
  if (covered) return false;

  const leftBlocked = state.tiles.some((other) => (
    !other.removed && other.uid !== tile.uid && other.z === tile.z && other.y === tile.y && other.x === tile.x - 2
  ));
  const rightBlocked = state.tiles.some((other) => (
    !other.removed && other.uid !== tile.uid && other.z === tile.z && other.y === tile.y && other.x === tile.x + 2
  ));

  return !(leftBlocked && rightBlocked);
}

export function getFreeTiles(state) {
  return state.tiles.filter((tile) => isTileFree(state, tile));
}

export function getFreeMatchingPairs(state) {
  const freeTiles = getFreeTiles(state);
  const byPair = new Map();
  for (const tile of freeTiles) {
    const bucket = byPair.get(tile.pairId) ?? [];
    bucket.push(tile);
    byPair.set(tile.pairId, bucket);
  }
  return [...byPair.values()]
    .filter((bucket) => bucket.length >= 2)
    .map((bucket) => bucket.slice(0, 2).map((tile) => tile.uid));
}

export function clearHint(state) {
  state.hintPairIds = [];
  state.tiles.forEach((tile) => {
    tile.hinted = false;
  });
}

export function concealTiles(state, tileIds = state.selectedIds) {
  const concealed = new Set(tileIds);
  state.tiles.forEach((tile) => {
    if (!tile.removed && concealed.has(tile.uid)) {
      tile.revealed = false;
      tile.selected = false;
    }
  });
  state.selectedIds = [];
}

function syncSelectedFlags(state) {
  const selected = new Set(state.selectedIds);
  state.tiles.forEach((tile) => {
    tile.selected = selected.has(tile.uid);
  });
}

export function useHint(state) {
  clearHint(state);
  const [pair] = getFreeMatchingPairs(state);
  if (!pair) {
    state.lastAction = 'no-hint';
    return false;
  }
  state.hintPairIds = pair;
  state.tiles.forEach((tile) => {
    tile.hinted = pair.includes(tile.uid);
  });
  state.lastAction = 'hint';
  return true;
}

export function applySelection(state, tileId) {
  const tile = getTile(state, tileId);
  if (!tile || tile.removed || !isTileFree(state, tile)) {
    state.lastAction = 'blocked';
    return { state, action: 'blocked' };
  }

  clearHint(state);

  if (state.complete) {
    state.lastAction = 'complete';
    return { state, action: 'complete' };
  }

  const isMemoryMode = state.gameMode === 'memory';

  if (state.selectedIds.length === 1 && state.selectedIds[0] === tileId) {
    if (isMemoryMode) tile.revealed = false;
    state.selectedIds = [];
    syncSelectedFlags(state);
    state.lastAction = 'deselected';
    return { state, action: 'deselected' };
  }

  if (state.selectedIds.length === 0) {
    if (isMemoryMode) tile.revealed = true;
    state.selectedIds = [tileId];
    syncSelectedFlags(state);
    state.lastAction = 'selected';
    return { state, action: 'selected' };
  }

  const [firstId] = state.selectedIds;
  const first = getTile(state, firstId);
  if (isMemoryMode) tile.revealed = true;
  if (first && first.pairId === tile.pairId && first.uid !== tile.uid) {
    first.removed = true;
    tile.removed = true;
    state.selectedIds = [];
    state.moves += 1;
    state.matches += 1;
    syncSelectedFlags(state);
    if (state.matches === state.pairCount) state.complete = true;
    state.lastAction = 'matched';
    return { state, action: 'matched' };
  }

  state.selectedIds = isMemoryMode ? [firstId, tileId] : [tileId];
  syncSelectedFlags(state);
  state.lastAction = 'mismatch';
  return { state, action: 'mismatch' };
}
