import { init, startPartWorkers } from '../masterPreProcessor';
import { getNumberOfThreads } from '../../utils/numberOfThreads';
import { getWorkersPublicPath } from '../../utils/workersPublicPath';


let filter;
function processImage(filterName, originalImage, resultCanvas) {
  filter = filterName;

  init(originalImage, filter);

  const imageWidth = originalImage.naturalWidth;
  const imageHeight = originalImage.naturalHeight;

  const partCount = getNumberOfThreads();
  const partHeight = Math.floor(imageHeight/partCount);

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = imageWidth;
  tempCanvas.height = imageHeight;
  const messageHandler = makeMessageHandler(partCount,
                                            imageWidth, imageHeight, tempCanvas, resultCanvas);
  const workerScript = getWorkersPublicPath() + '/filtersWorker.js';

  startPartWorkers(imageWidth, imageHeight, partHeight,
                               partCount, messageHandler, workerScript);
}

function makeMessageHandler(partsLeft,
                            imageWidth, imageHeight, tempCanvas, resultCanvas, mosaicData=[]) {
  return function messageHandler(e) {
    partsLeft--;
    drawToTempCanvas(tempCanvas, e.data);
    if (partsLeft === 0) { // When all workers have finished, draw
      resultCanvas.getContext('2d').clearRect(0, 0, imageWidth, imageHeight);
      resultCanvas.getContext('2d').drawImage(tempCanvas, 0, 0);
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
