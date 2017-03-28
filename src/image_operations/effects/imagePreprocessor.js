import { init, startPartWorkers } from '../masterPreProcessor';
import imageRenderer from './imageRenderer';
import { shared } from '../../utils/sharedVars';


let effect;

function processImage(effectName, tileDimensions) {
  // The effects have to divide the image into tiles which
  // come together to draw the result image
  const TILE_WIDTH = parseInt(tileDimensions.width, 10);
  const TILE_HEIGHT = parseInt(tileDimensions.height, 10);
  const originalImage = shared.originalImage;
  effect = effectName;

  init(originalImage, effect, TILE_WIDTH, TILE_HEIGHT);

  const imageWidth = originalImage.naturalWidth;
  const imageHeight = originalImage.naturalHeight;

  // Figuring out how the image is going to be sliced, as we wanna slice on
  // a tile basis, not pixels to prevent tile overlapping due to one tile shared
  // between more than one worker
  const tilesAlongHeight = Math.ceil(imageHeight / TILE_HEIGHT);
  let partCount = window.navigator.hardwareConcurrency || 4;

  // this deals with when tiles along the height are less than the intended slices
  partCount = Math.min(partCount, tilesAlongHeight);
  const tileRowsPerPart = Math.floor(tilesAlongHeight / partCount);
  const partHeight = tileRowsPerPart * TILE_HEIGHT; // In pixels

  const messageHandler = makeMessageHandler({}, partCount, imageWidth,
                                            imageHeight, tileDimensions);

  const workerScript = './averageColorsWorker.js';

  startPartWorkers(imageWidth, imageHeight, partHeight,
                               partCount, messageHandler, workerScript);
}

function makeMessageHandler(mosaicData={}, partsLeft, imageWidth,
                            imageHeight, tileDimensions) {
  return function messageHandler(e) {
    Object.assign(mosaicData, e.data);
    partsLeft--;
    if (partsLeft === 0) { // When all workers have finished, start drawing
      return imageRenderer.renderImage(mosaicData, imageWidth,
                                       imageHeight, effect, tileDimensions);
    }
  }
}

export default {
  processImage
};
