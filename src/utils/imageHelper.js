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

function constructUrl(color, host) {
  const hexColor = rgbToHex(color);
  return `http://${host}:8765/color/${hexColor}`;
}

function fetchImage(color, host) {
  const url = constructUrl(color, host)
  const tile = fetch(url)
               .then(response => response.text());

  return tile;
}

function makeImageFromSVG(svgString, img) {
  // Generate a data URI and use it as the source for the image
  const dataString = 'data:image/svg+xml;utf-8,';
  const imageString = dataString + svgString;

  img.src = imageString;

  /* I would like to point something out here..
   * I'm aware of the Firefox bug regarding data uris and svg,
   * the other route was to create an object url and resolve a promise on image load.
   * Comparing these two, data uris are much faster, so I went with them
   * and counted them as a "current Chrome feature" :D
   */
}

export default {
  fetchImage,
  makeImageFromSVG,
  rgbToHex
};
