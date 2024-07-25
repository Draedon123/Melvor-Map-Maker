type ResizeBy = Scale | Pixel;

type Scale = {
  type: "scale";
} & Coordinate;

type Pixel = {
  type: "pixel";
} & Coordinate;

type Coordinate = {
  x: number;
  y: number;
};

function resizeImage(
  image: HTMLImageElement,
  resizeBy: ResizeBy
): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx === null) {
      reject(
        new Error("[resizeImage] | Could not get 2D Canvas Rendering Context")
      );
      return;
    }

    const width =
      resizeBy.type === "scale"
        ? image.width * resizeBy.x
        : image.width + resizeBy.x;
    const height =
      resizeBy.type === "scale"
        ? image.height * resizeBy.y
        : image.height + resizeBy.y;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob === null) {
        reject(new Error("[imageResize] | Could not turn canvas into blob"));
        return;
      }

      const url = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.src = url;
    });
  });
}

export default resizeImage;
