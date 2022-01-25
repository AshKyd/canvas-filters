import MSRand from 'msrand';

const ellation = [
  ["0001000", "0001000", "0011100", "1111111", "0011100", "0001000", "0001000"],
  ["0000000", "0001000", "0011100", "0001000", "0000000", "0000000", "0000000"],
  ["0000000", "0000000", "0000000", "0001000", "0000000", "0000000", "0000000"]
];
let locations;
let firstRun = true;

function drawSparkle({ ctx, x, y, seed = 0, frameNumber = 0 }) {
  const offset = Math.round(seed % 2);
  const frame = Math.round(frameNumber % 2);

  const star = ellation[offset + frame];
  for (let py = 0; py < star.length; py++) {
    for (let px = 0; px < star[py].length; px++) {
      if (star[py][px] === "1") {
        ctx.fillRect(x + px, y + py, 1, 1);
      }
    }
  }
}


export default function sparkles({ canvas, frameNumber=0, seed=0, count=30 }) {
  const myRng = new MSRand(seed);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "white";

  locations = Array.from({ length: count }).map((nul, i) => {
    return [
      Math.round(myRng.randMax(canvas.width)),
      Math.round(myRng.randMax(canvas.height)),
      Math.round(myRng.randMax(2))
    ];
  });

  locations.forEach(([x, y, seed]) => {
    drawSparkle({
      ctx,
      x,
      y,
      seed,
      frameNumber
    });
  });

  return canvas;
};
