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

export default {
  rgbToHex,
  hex
};
