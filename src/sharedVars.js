export let TILE_WIDTH, TILE_HEIGHT, canvas;

export function setVars(vals) {
  [TILE_WIDTH, TILE_HEIGHT, canvas] = [vals.TILE_WIDTH, vals.TILE_HEIGHT, vals.canvas];
}
