onmessage = function(e) {
    if (e.data.partData) {
      const partData = Object.assign({}, e.data.partData);
      const imageData = new Uint8ClampedArray(e.data.imageData);
      const effect = e.data.effect;
      applyfilter(partData, imageData, effect);
    }
  };


function applyfilter(partData, imageData, effect) {
  const applyfilterToPixel = getFilterFunction(effect);
  // Loop through the pixels of the tile that starts at that position.
  // Add up their color components
  for (let i=0; i<partData.height; i++) {
    for (let j=0; j<partData.width; j++) {
      // The index of this pixel in the imageData array
      const pixelIndex = ((i*partData.width) + j) * 4;
      applyfilterToPixel(imageData, pixelIndex);
    }
  }
  postMessage({imageData: imageData.buffer, partData}, [imageData.buffer]);
}

function getFilterFunction(effect) {
  switch (effect) {
    case "Negative":
      return invertPixel;

    case "GrayScale":
      return grayScalePixel;

    case "Sepia":
      return sepiatePixel;
  }
}

function invertPixel(imageData, pixelIndex) {
  imageData[pixelIndex]  = 255 - imageData[pixelIndex];
  imageData[pixelIndex+1]  = 255 - imageData[pixelIndex+1];
  imageData[pixelIndex+2]  = 255 - imageData[pixelIndex+2];
}

// Execuse the names :D
function grayScalePixel(imageData, pixelIndex) {
  const r = imageData[pixelIndex];
  const g = imageData[pixelIndex+1];
  const b = imageData[pixelIndex+2];

  const average = Math.floor((r+g+b) / 3);

  imageData[pixelIndex]  = average;
  imageData[pixelIndex+1]  = average;
  imageData[pixelIndex+2]  = average;
}


function sepiatePixel(imageData, pixelIndex) {
  const r = imageData[pixelIndex];
  const g = imageData[pixelIndex+1];
  const b = imageData[pixelIndex+2];

  const average = Math.floor((r+g+b) / 3);

  imageData[pixelIndex]  = average + 50;
  imageData[pixelIndex+1]  = average + 30;
  imageData[pixelIndex+2]  = average;
}
