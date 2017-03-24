export const shared = {TILE_WIDTH: null, TILE_HEIGHT: null, canvas: null, originalImage: null};

export function setVars(vals) {
  Object.assign(shared, vals);
}
