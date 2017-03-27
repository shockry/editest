import { init, startPartWorkers } from '../masterPreProcessor';
// import imageRenderer from './imageRenderer';
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

  const mosaicData = [];
  const messageHandler = makeMessageHandler(mosaicData, partCount, imageWidth, imageHeight);
  const workerScript = './filtersWorker.js';

  startPartWorkers(imageWidth, imageHeight, partHeight,
                               partCount, messageHandler, workerScript);
}

function makeMessageHandler(mosaicData=[], partsLeft, imageWidth, imageHeight) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = imageWidth;
  tempCanvas.height = imageHeight;
  return function messageHandler(e) {
    partsLeft--;
    const dataArray = new Uint8ClampedArray(e.data.imageData);
    const imageData = new ImageData(dataArray, e.data.partData.width, e.data.partData.height);
    tempCanvas.getContext('2d').putImageData(imageData, e.data.partData.start.x, e.data.partData.start.y);
    if (partsLeft === 0) { // When all workers have finished, start drawing
      shared.canvas.getContext('2d').drawImage(tempCanvas, 0, 0);
    }
  }
}


export default {
  processImage
};
