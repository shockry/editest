import { init, startPartWorkers } from '../masterPreProcessor';
import imageRenderer from './imageRenderer';
import { shared } from '../../utils/sharedVars';


let effect;
function processImage(effectName) {
  let TILE_WIDTH, TILE_HEIGHT, originalImage;

  [TILE_WIDTH, TILE_HEIGHT, originalImage] =
    [shared.TILE_WIDTH, shared.TILE_HEIGHT, shared.originalImage];

  effect = effectName;

  init(originalImage, effect, TILE_WIDTH, TILE_HEIGHT);

  const imageWidth = originalImage.naturalWidth;
  const imageHeight = originalImage.naturalHeight;

  const tilesAlongHeight = Math.ceil(imageHeight / TILE_HEIGHT);
  let partCount = 4;
  partCount = Math.min(partCount, tilesAlongHeight);
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
