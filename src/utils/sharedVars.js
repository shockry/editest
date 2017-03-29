export const shared = {
  canvas: null,
  originalImage: null
};

export function setVars(vals) {
  Object.assign(shared, vals);
}
