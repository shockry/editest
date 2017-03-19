import imageHelper from './utils/imageHelper';
import { shared } from './sharedVars';


let TILE_WIDTH, TILE_HEIGHT, resultCanvas;
let renderingRow;
let effect;

function renderImage(mosaicData, width, height, effectType) {
  renderingRow = 0;
  [TILE_WIDTH, TILE_HEIGHT, resultCanvas] =
    [shared.TILE_WIDTH, shared.TILE_HEIGHT, shared.canvas]
  effect = effectType;

  // This is where the image is going to be drawn on the page
  resultCanvas.width = width;
  resultCanvas.height = height;
  const resultContext = resultCanvas.getContext('2d');

  // An in-memory canvas to hold each row's tiles.
  // when a complete row is obtained, we draw this canvas to the result canvas
  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = width;
  tmpCanvas.height = TILE_HEIGHT;
  const tmpContext = tmpCanvas.getContext('2d');

  const renderRows = renderTileRows(mosaicData, height, tmpContext,
                                    resultContext);
  return renderRows;
}


/**
 * Draws tile rows to the canvas, one at a time
 * returns a promise that resolves to true when all rows are rendered
 */
function renderTileRows(data, height, tmpCtx, resultCtx) {
    const tiles = data[renderingRow];

    for (let i=0; i<tiles.length; i++) {
      drawTile(tiles[i].color, tiles[i].col, 0, tmpCtx);
    }

    renderRow(tmpCtx.canvas, resultCtx, tmpCtx, renderingRow);
    renderingRow += TILE_HEIGHT;

    if (renderingRow >= height) {
      renderingRow = 0;
      return ({tmpCtx, resultCtx});
    }

    window.requestAnimationFrame(()=>renderTileRows(data, height, tmpCtx, resultCtx));
}


/**
 * Actually renders the given row, from the temporary canvas onto the visible one,
 * Then clears the temporary canvas to prepare for the next row
 */
function renderRow(tmpCanvas, resultCtx, tmpCtx, row, col=0) {
  resultCtx.drawImage(tmpCanvas, col, row);
  tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
}


// Draws a tile to the temporary canvas
function drawTile(color, col, row, tmpCtx) {
  tmpCtx.fillStyle = "#"+imageHelper.rgbToHex(color);

  switch (effect) {
    case "mosaic":
      drawEllipses(color, col, row, tmpCtx);
      break;

    case "retro":
      drawRectangles(color, col, row, tmpCtx);
      break;

    default:
      console.log("noop");
  }
}

function drawEllipses(color, col, row, tmpCtx) {
  tmpCtx.beginPath();
  tmpCtx.ellipse(col+(TILE_WIDTH/2), row+(TILE_HEIGHT/2), TILE_WIDTH/2, TILE_HEIGHT/2, 0, 0, Math.PI*2);
  tmpCtx.closePath();
  tmpCtx.fill();
}

function drawRectangles(color, col, row, tmpCtx) {
  tmpCtx.fillRect(col, row, TILE_WIDTH, TILE_HEIGHT);
}

export default {
  renderImage
};
