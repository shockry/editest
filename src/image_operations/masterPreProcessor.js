import workerFactory from '../utils/workerFactory';

/**
 * This module is a generic pre-processor (or processor, depending on the worker type)
 * its task is to slice the image into parts and then
 * spawning some workers to process these parts
*/

let TILE_WIDTH, TILE_HEIGHT;
let canvas, effect;

export function init(originalImage, effectName='', tileWidth=0, tileHeight=0) {
  // In case we need them to be sent to the workers (price of generic module  ¯\_(ツ)_/¯)
  TILE_WIDTH = tileWidth;
  TILE_HEIGHT = tileHeight;
  effect = effectName; // proposed effect or filter

  canvas = document.createElement('canvas');
  canvas.width = originalImage.naturalWidth;
  canvas.height = originalImage.naturalHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(originalImage, 0, 0);

  return canvas;
}

export function startPartWorkers(imageWidth, imageHeight, partHeight,
                                 partCount, messageHandler, workerScriptSource) {
  const parts = sliceIntoParts(imageWidth, imageHeight, partHeight, partCount);

  spawnWorkers(parts, canvas.getContext('2d'), messageHandler, workerScriptSource);
}

function sliceIntoParts(imageWidth, imageHeight, partHeight, partCount=4) {
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
                  partIndex: i,
                  tileSize: {width: TILE_WIDTH, height: TILE_HEIGHT}
                 };
    parts.push(part);
  }

  return parts;
}

function spawnWorkers(parts, ctx, messageHandler, workerScriptSource) {
  for (let part of parts) {
    const worker = workerFactory.buildWorker(workerScriptSource, messageHandler);
    startWorker(worker, part, ctx);
  }
}

function startWorker(worker, part, ctx) {
  // this part's slice of the source image's pixel data array
  const imageData = ctx.getImageData(part.start.x, part.start.y,
                                     part.width, part.height).data;

  worker.postMessage({imageData: imageData.buffer, partData: part, effect}, [imageData.buffer]);
}
