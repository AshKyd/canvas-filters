export function createCanvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

export function createImageFilePicker(onload) {
  const fileSelector = document.createElement("input");
  fileSelector.type = "file";
  fileSelector.innerText = "Load file";
  fileSelector.addEventListener("change", async (event) => {
    console.log("got file");
    const canvas = await readImage(event.target.files[0]);
    onload(canvas);
  });
  return fileSelector;
}

function readImage(file) {
  return new Promise((resolve) => {
    // Check if the file is an image.
    if (file.type && !file.type.startsWith("image/")) {
      console.log("File is not an image.", file.type, file);
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", (event) =>
      resolve(loadDataUrlIntoCanvas(event.target.result))
    );
    reader.readAsDataURL(file);
  });
}

export function awaitImageLoad(img) {
  return new Promise((resolve, reject) => {
    if (img.complete) {
      if (!img.naturalHeight) {
        return reject();
      }
      return resolve();
    }

    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", reject);
  });
}

function loadDataUrlIntoCanvas(dataUrl) {
  const img = document.createElement("img");
  img.src = dataUrl;
  return loadImageAsCanvas(img);
}

async function loadImageAsCanvas(image) {
  await awaitImageLoad(image);
  const c = createCanvas(image.width, image.height);
  const ctx = c.getContext("2d");
  ctx.drawImage(image, 0, 0);
  return c;
}
