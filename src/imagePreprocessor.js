import workerFactory from './utils/workerFactory';
import imageRenderer from './imageRenderer';
import {TILE_WIDTH, TILE_HEIGHT, canvas} from './sharedVars';

function processImage() {
  const ctx = canvas.getContext('2d');

  const parts = sliceIntoParts(canvas.width, canvas.height);

  startAvergeColorWorkers(parts, canvas.width, canvas.height, ctx);
}


/**
* Divide the source image into equal parts
* (if not evenly divisible, last part takes what's left),
* and process each in a dedicated worker
* The image is divided horizontally to get complete rows' data from workers
*  __________
* |__________| <- part 1
* |__________| <- part 2
* |__________| <- part 3
* |__________| <- part 4
*/
function sliceIntoParts(imageWidth, imageHeight, partCount=4) {
  const tilesAlongHeight = Math.ceil(imageHeight / TILE_HEIGHT);
  partCount = Math.min(partCount, tilesAlongHeight);
  const tileRowsPerPart = Math.floor(tilesAlongHeight / partCount);
  const partHeight = tileRowsPerPart * TILE_HEIGHT; // In pixels
  const parts = [];

  // create 'partCount' parts of the image, each of height 'partHeight'
  // A part is an object holding its dimensions and the top left pixel position
  for (let i=0, currentRow=0; i<partCount; i++, currentRow+=partHeight) {
    let currentPartHeight;

    // If last piece, take the rest of the image as its height
    if (i === partCount-1) {
      currentPartHeight = imageHeight - (partHeight*i);
    } else {
      currentPartHeight = partHeight;
    }

    // This is going to be passed to workers, so tile dimensions have to be sent too
    const part = {start: {y: currentRow, x: 0},
                  width: imageWidth, height: currentPartHeight,
                  tileSize: {width: TILE_WIDTH, height: TILE_HEIGHT}
                 };
    parts.push(part);
  }

  return parts;
}


/**
* Takes an array of image parts, spawns a worker for each part, each of which
* computes the average colors for its tiles.
* The parts data (tile colors and positions) are then combined into one object
*/
function startAvergeColorWorkers(parts, imageWidth, imageHeight, ctx) {
  /* This is going to hold the to-be mosaic image's data in the forllowing form:
  * { row: [ {color:{r, g, b}, column:}, .. ] }
  * That's the average color and position for every tile, per row
  */
  let mosaicData = {};
  // keeps track of how many workers have not finished processing their data yet
  let partsLeft = parts.length;

  const scriptSource = 'averageColorsWorker.js';

  // This is going to be the message handler for the workers
  const buildDataObject = makeMessageHandler(mosaicData, partsLeft, imageWidth, imageHeight);

  for (let part of parts) {
    const worker = workerFactory.buildWorker(scriptSource, buildDataObject);
    startWorker(worker, part, ctx);
  }
}


function makeMessageHandler(mosaicData={}, partsLeft, imageWidth, imageHeight) {
  return function messageHandler(e) {
    Object.assign(mosaicData, e.data);
    partsLeft--;
    if (partsLeft === 0) { // When all workers have finished, start drawing
      return imageRenderer.renderImage(mosaicData, imageWidth, imageHeight);
    }
  }
}


function startWorker(worker, part, ctx) {
  // this part's slice of the source image's pixel data array
  const imageData = ctx.getImageData(part.start.x, part.start.y,
                                     part.width, part.height).data;

  worker.postMessage({imageData: imageData.buffer, partData: part}, [imageData.buffer]);
}

export default {
  processImage
};
