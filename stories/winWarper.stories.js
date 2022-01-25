import { awaitImageLoad, createCanvas, createImageFilePicker } from "./util";
import sinWarper from "./sinWarper";
import imageSource from "./assets/goots.jpg";

export default {
  title: "Sin Warper",
  argTypes: {},
};

const Template = (args) => {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  const ctx = canvas.getContext("2d");

  const img = document.createElement("img");
  img.src = imageSource;
  awaitImageLoad(img).then(() => {
    ctx.drawImage(img, 0, 0);
    sinWarper({ canvas, ...args });
  });
  return canvas;
};

export const Basic = Template.bind({});
Basic.args = {
  amount: 5,
  throttle: 10,
};
