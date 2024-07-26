async function splitImage(
  image: HTMLImageElement,
  tilesX: number,
  tilesY: number,
  onProgress: (
    progress: number,
    convertedCount: number,
    totalImages: number
  ) => void = () => {}
): Promise<{ x: number; y: number; image: HTMLImageElement }[]> {
  const promises: Promise<{ x: number; y: number; image: HTMLImageElement }>[] =
    [];

  const tileWidth = image.width / tilesX;
  const tileHeight = image.height / tilesY;

  const tileCount = tilesX * tilesY;
  let splitCount = 0;

  for (let x = 0; x < tilesX; x++) {
    for (let y = 0; y < tilesY; y++) {
      promises.push(
        new Promise((resolve, reject) => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const sourceX = tileWidth * x;
          const sourceY = tileHeight * y;

          canvas.width = tileWidth;
          canvas.height = tileHeight;

          if (ctx === null) {
            throw new Error(
              "[splitImage] | Could not get 2d canvas rendering context"
            );
          }

          ctx.drawImage(
            image,
            sourceX,
            sourceY,
            tileWidth,
            tileHeight,
            0,
            0,
            tileWidth,
            tileHeight
          );
          canvas.toBlob((blob) => {
            if (blob === null) {
              reject(
                new Error("[splitImage] | Could not turn canvas into blob")
              );
              return;
            }

            const blobURL = URL.createObjectURL(blob);
            const image = new Image();
            image.onload = () => {
              splitCount++;
              onProgress(splitCount / tileCount, splitCount, tileCount);
              resolve({
                x,
                y,
                image,
              });
            };
            image.src = blobURL;
          });
        })
      );
    }
  }

  return await Promise.all(promises);
}

export default splitImage;
