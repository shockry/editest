import { init, startPartWorkers } from '../masterPreProcessor';
import imageRenderer from './imageRenderer';
import { getNumberOfThreads } from '../../utils/numberOfThreads';
import { getWorkersPublicPath } from '../../utils/workersPublicPath';


let effect;

function processImage(effectName, tileDimensions, canvas, originalImage) {
  // The effects have to divide the image into tiles which
  // come together to draw the result image
  const TILE_WIDTH = parseInt(tileDimensions.width, 10);
  const TILE_HEIGHT = parseInt(tileDimensions.height, 10);
  effect = effectName;

  init(originalImage, effect, TILE_WIDTH, TILE_HEIGHT);

  const imageWidth = originalImage.naturalWidth;
  const imageHeight = originalImage.naturalHeight;

  // Figuring out how the image is going to be sliced, as we wanna slice on
  // a tile basis, not pixels to prevent tile overlapping due to one tile shared
  // between more than one worker
  const tilesAlongHeight = Math.ceil(imageHeight / TILE_HEIGHT);
  let partCount = getNumberOfThreads();

  // this deals with when tiles along the height are less than the intended slices
  partCount = Math.min(partCount, tilesAlongHeight);
  const tileRowsPerPart = Math.floor(tilesAlongHeight / partCount);
  const partHeight = tileRowsPerPart * TILE_HEIGHT; // In pixels

  const messageHandler = makeMessageHandler(partCount, imageWidth,
                                            imageHeight, tileDimensions, canvas);

  const workerScript = getWorkersPublicPath() + '/averageColorsWorker.js';

  startPartWorkers(imageWidth, imageHeight, partHeight,
                               partCount, messageHandler, workerScript);
}

function makeMessageHandler(partsLeft, imageWidth,
                            imageHeight, tileDimensions, canvas, mosaicData={}) {
  return function messageHandler(e) {
    Object.assign(mosaicData, e.data);
    partsLeft--;
    if (partsLeft === 0) { // When all workers have finished, start drawing
      return imageRenderer.renderImage(mosaicData, imageWidth,
                                       imageHeight, effect, tileDimensions, canvas);
    }
  }
}

export default {
  processImage
};
