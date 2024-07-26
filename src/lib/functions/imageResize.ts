type ResizeBy = Scale | Additive | Absolute;

type Scale = {
  type: "scale";
} & Coordinate;

type Additive = {
  type: "additive";
} & Coordinate;

type Absolute = {
  type: "to";
} & Coordinate;

type Coordinate = {
  x: number;
  y: number;
};

function resizeImage(
  image: HTMLImageElement,
  resizeBy: ResizeBy,
  returnValue: "image"
): Promise<HTMLImageElement>;
function resizeImage(
  image: HTMLImageElement,
  resizeBy: ResizeBy,
  returnValue: "url"
): Promise<string>;
function resizeImage(
  image: HTMLImageElement,
  resizeBy: ResizeBy,
  returnValue: "image" | "url"
): Promise<HTMLImageElement | string> {
  return new Promise<HTMLImageElement | string>((resolve, reject) => {
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
        : resizeBy.type === "additive"
          ? image.width + resizeBy.x
          : resizeBy.x;
    const height =
      resizeBy.type === "scale"
        ? image.height * resizeBy.y
        : resizeBy.type === "additive"
          ? image.height + resizeBy.y
          : resizeBy.y;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob === null) {
        reject(new Error("[imageResize] | Could not turn canvas into blob"));
        return;
      }

      const url = URL.createObjectURL(blob);
      if (returnValue === "image") {
        const image = new Image();
        image.onload = () => {
          resolve(image);
        };
        image.src = url;
      } else {
        resolve(url);
      }
    });
  });
}

export default resizeImage;
