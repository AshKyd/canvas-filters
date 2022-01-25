import MSRand from "msrand";

export default function warper({ canvas, amount = 1, throttle = 10 }) {
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  function drawLine(sourceLine, destLine) {
    const sourceLineStart = Math.round(sourceLine) * imageData.width * 4;
    for (let x = 0; x < imageData.width; x++) {
      // FIXME this is super slow
      // use drawImage with src and dest ranges
      // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      const sourcePixelStart = sourceLineStart + x * 4;
      const rgba = imageData.data.slice(sourcePixelStart, sourcePixelStart + 4);
      ctx.fillStyle = `rgba(${rgba.join()})`;
      ctx.fillRect(x, destLine, 1, 1);
    }
  }

  for (let y = 0; y < imageData.height; y++) {
    const sourceLine = y - (Math.sin(y / throttle) + 1) * amount;
    drawLine(sourceLine, y);
  }

  return canvas;
}
