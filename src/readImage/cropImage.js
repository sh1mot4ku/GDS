import loadImage from "blueimp-load-image";

const MAX_IMG_SIZE = 512000; // Set max limit of cropped img as 500KB
const MAX_WIDTH_CANVAS = 1200;

const ERROR_TOO_BIG_IMG =
  "画像サイズが大きすぎます。画像を圧縮するか、他の画像をアップロードしてください。";
const ERROR_LOADING_FAILED =
  "画像のアップロードに失敗しました。もう一度お試しください。";

const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => reject(ERROR_LOADING_FAILED));
    image.src = url;
  });

const compressImage = async (blob) => {
  const canvasData = await loadImage(blob, {
    maxWidth: MAX_WIDTH_CANVAS, // max width of image written in canvas
    canvas: true,
  });

  return new Promise((resolve, reject) => {
    canvasData.image.toBlob((blob) => {
      blob.size <= MAX_IMG_SIZE ? resolve(blob) : reject(ERROR_TOO_BIG_IMG);
    }, "image/jpeg");
  });
};

const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      blob.size <= MAX_IMG_SIZE ? resolve(blob) : resolve(compressImage(blob));
    }, "image/jpeg");
  });
};

export { createImage as default, getCroppedImg, readFile };
