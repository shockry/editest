import { init, startPartWorkers } from '../masterPreProcessor';
import { shared } from '../../utils/sharedVars';
import { getNumberOfThreads } from '../../utils/numberOfThreads';

let filter;
function processImage(filterName) {
  const originalImage = shared.originalImage;

  filter = filterName;

  init(originalImage, filter);

  const imageWidth = originalImage.naturalWidth;
  const imageHeight = originalImage.naturalHeight;

  const partCount = getNumberOfThreads();
  const partHeight = Math.floor(imageHeight/partCount);

  const mosaicData = [];
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = imageWidth;
  tempCanvas.height = imageHeight;
  const messageHandler = makeMessageHandler(mosaicData, partCount,
                                            imageWidth, imageHeight, tempCanvas);
  const workerScript = './filtersWorker.js';

  startPartWorkers(imageWidth, imageHeight, partHeight,
                               partCount, messageHandler, workerScript);
}

function makeMessageHandler(mosaicData=[], partsLeft,
                            imageWidth, imageHeight, tempCanvas) {
  return function messageHandler(e) {
    partsLeft--;
    drawToTempCanvas(tempCanvas, e.data)
    if (partsLeft === 0) { // When all workers have finished, draw
      shared.canvas.getContext('2d').drawImage(tempCanvas, 0, 0);
    }
  }
}

function drawToTempCanvas(tempCanvas, renderingData) {
  const dataArray = new Uint8ClampedArray(renderingData.imageData);
  const partData = renderingData.partData;
  const imageData = new ImageData(dataArray, partData.width, partData.height);
  tempCanvas.getContext('2d').putImageData(imageData, partData.start.x, partData.start.y);
}

export default {
  processImage
};
