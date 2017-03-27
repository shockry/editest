import { init, startPartWorkers } from '../masterPreProcessor';
import { shared } from '../../utils/sharedVars';


let filter;
function processImage(filterName) {
  const originalImage = shared.originalImage;

  filter = filterName;

  init(originalImage, filter);

  const imageWidth = originalImage.naturalWidth;
  const imageHeight = originalImage.naturalHeight;

  const partCount = 4;
  const partHeight = Math.floor(imageHeight/partCount);

  const messageHandler = makeMessageHandler([], partCount, imageWidth, imageHeight);
  const workerScript = './filtersWorker.js';

  startPartWorkers(imageWidth, imageHeight, partHeight,
                               partCount, messageHandler, workerScript);
}

function makeMessageHandler(mosaicData=[], partsLeft, imageWidth, imageHeight) {
  return function messageHandler(e) {
    partsLeft--;
    mosaicData[e.data.partIndex] = e.data.imageData;
    if (partsLeft === 0) { // When all workers have finished, start drawing
      const resultArray = mosaicData.reduce((a, b) => [...a, ...b]);
      const dataArray = new Uint8ClampedArray(resultArray);
      const imageData = new ImageData(dataArray, imageWidth, imageHeight);
      shared.canvas.getContext('2d').putImageData(imageData, 0, 0);
    }
  }
}

export default {
  processImage
};
