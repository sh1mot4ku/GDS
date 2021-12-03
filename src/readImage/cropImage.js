const MAX_IMG_SIZE = 4194304; // Set max limit of cropped img as 4MB
// const MAX_IMG_SIZE = 1; // Set max limit of cropped img as 4MB
const ERROR_TOO_BIG_IMG = "Image size is too large. Max limit 4MB"
const ERROR_LOADING_FAILED = "Failed to upload image. Try to upload again."
// Image size is too large. Max limit 4MB

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', () => reject(ERROR_LOADING_FAILED))
    image.src = url
  })

const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
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
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => 
      ( blob.size <= MAX_IMG_SIZE ) ? resolve(blob) : reject(ERROR_TOO_BIG_IMG)
    , 'image/png')
  })
}

export { createImage as default, getCroppedImg };