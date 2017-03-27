import { init, startPartWorkers } from './masterPreProcessor';
import imageRenderer from './imageRenderer';
import { shared } from '../utils/sharedVars';


let TILE_WIDTH, TILE_HEIGHT, originalImage;
let effect;

function processImage(effectType) {
  [TILE_WIDTH, TILE_HEIGHT, originalImage] =
    [shared.TILE_WIDTH, shared.TILE_HEIGHT, shared.originalImage];

  effect = effectType;

  init(originalImage, TILE_WIDTH, TILE_HEIGHT);

  const imageWidth = originalImage.naturalWidth;
  const imageHeight = originalImage.naturalHeight;

  const tilesAlongHeight = Math.ceil(imageHeight / TILE_HEIGHT);
  const partCount = Math.min(4, tilesAlongHeight);
  const tileRowsPerPart = Math.floor(tilesAlongHeight / partCount);
  const partHeight = tileRowsPerPart * TILE_HEIGHT; // In pixels

  const messageHandler = makeMessageHandler({}, partCount, imageWidth, imageHeight);
  const workerScript = './averageColorsWorker.js';

  startPartWorkers(imageWidth, imageHeight, partHeight,
                               partCount, messageHandler, workerScript);
}

function makeMessageHandler(mosaicData={}, partsLeft, imageWidth, imageHeight) {
  return function messageHandler(e) {
    Object.assign(mosaicData, e.data);
    partsLeft--;
    if (partsLeft === 0) { // When all workers have finished, start drawing
      return imageRenderer.renderImage(mosaicData, imageWidth, imageHeight, effect);
    }
  }
}

export default {
  processImage
};
