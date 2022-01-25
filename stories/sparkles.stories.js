import sparkles from "./sparkles";

export default {
  title: "Sparkles",
  argTypes: {},
};

const Template = ({ play = false, ...args }) => {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.setAttribute("style", "background:black");
  if (play) {
    let i = args.frameNumber || 0;
    setInterval(() => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparkles({ canvas, ...args, frameNumber: i++ });
    }, 400);
  }
  return sparkles({ canvas, ...args });
};

export const Basic = Template.bind({});
Basic.args = {
  frameNumber: 0,
  count: 30,
  play: false,
};
