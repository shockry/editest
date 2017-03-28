onmessage = function(e) {
    if (e.data.partData) {
      const imageData = new Uint8ClampedArray(e.data.imageData);
      generateTileData(e.data.partData, imageData);
    }
  };

/**
* calculates average color and top left pixel position for
* every tile in current part of the image
*/
function generateTileData(partData, imageData) {
  // this object will have an entry for each row of tiles describing its tiles
  const mosaicData = {};

  const tileWidth = partData.tileSize.width;
  const tileHeight = partData.tileSize.height;
  // coordinates where this part ends in the source image
  const endY = partData.start.y+partData.height;
  const endX = partData.start.x+partData.width;

  // Loop for the top left pixel of each tile, row by row, calculating its color
  for (let row=partData.start.y; row<endY; row+=tileHeight) {
    mosaicData[row] = [];
    for (let col=partData.start.x; col<endX; col+=tileWidth) {
      const color = getAverageColor(row, col, partData, imageData, tileWidth, tileHeight);

      // Now we're done calculating this tile, add it to this rows's tiles array
      mosaicData[row].push({color, col});
    }
  }
  postMessage(mosaicData);
}


// Gets the average color of a tile at a specific position in the source image
function getAverageColor(y, x, partData, imageData, tileWidth, tileHeight) {
  const rgb = {r:0, g:0, b:0};

  let pixelCount = 0;

  /* Getting pixel coordinates relative to this part's starting position;
  * e.g. if a part starts at a pixel (x, y) = (0, 50),
  * to its part, this pixel is at (0, 0).
  * This allows for naturally referencing this part's imageData array as it
  * contains only the pixel data for this part of the image
  */
  const yStart = y - partData.start.y;
  const yEnd = yStart + tileHeight;
  const xStart = x - partData.start.x;
  const xEnd = xStart + tileWidth;

  // Loop through the pixels of the tile that starts at that position.
  // Add up their color components
  for (let i=yStart; i<yEnd && i<partData.height; i++) {
    for (let j=xStart; j<xEnd && j<partData.width; j++) {
      // The index of this pixel in the imageData array
      const pixelIndex = ((i*partData.width) + j) * 4;
      rgb.r += imageData[pixelIndex];
      rgb.g += imageData[pixelIndex+1];
      rgb.b += imageData[pixelIndex+2];
      pixelCount++;
    }
  }

  // Calculating the average of each component
  const r = Math.floor(rgb.r / pixelCount);
  const g = Math.floor(rgb.g / pixelCount);
  const b = Math.floor(rgb.b / pixelCount);

  return {r, g, b};
}
