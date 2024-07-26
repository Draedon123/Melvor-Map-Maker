function imageToBlob(image: HTMLImageElement): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx === null) {
      reject(
        new Error("[imageToBlob] | Could not get 2d canvas rendering context")
      );
      return;
    }

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob === null) {
        reject(new Error("[imageToBlob] | Could not turn canvas into blob"));
        return;
      }

      resolve(blob);
    });
  });
}

export default imageToBlob;
