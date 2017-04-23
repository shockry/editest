function hex(component) {
  const hex = component.toString(16);
  return hex.length === 1? '0' + hex: hex;
}

function rgbToHex(rgb) {
  const r = hex(rgb.r);
  const g = hex(rgb.g);
  const b = hex(rgb.b);
  return `${r}${g}${b}`;
}

function getRGBA(rgba) {
  const color = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  return color;
}

export default {
  rgbToHex,
  hex,
  getRGBA
};
