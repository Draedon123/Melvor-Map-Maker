import { base } from "$app/paths";
import workerCodeURL from "$lib/workers/basis?url";
import type {
  ErrorMessageFromWorker,
  TranscodingMessageFromWorker,
  TranscodingMessageToWorker,
} from "$lib/workers/basisTypes";
import chunkArray from "./chunkArray";

type TranscodedFileArray = {
  tileWidth: number;
  tileHeight: number;
  tiles: {
    x: number;
    y: number;
    image: HTMLImageElement;
  }[];
};

async function basisToImage(
  files: {
    file: File | Blob;
    name: string;
  }[],
  workerCount: number = 2,
  onConvert: (
    progress: number,
    convertedCount: number,
    totalFiles: number
  ) => void = () => {}
): Promise<TranscodedFileArray> {
  const basisEncoderJSPath = `${base}/basis_encoder.js`;
  const response = await fetch(basisEncoderJSPath);

  if (!response.ok) {
    throw new Error(
      `[basisToImage] | Could not fetch basis_encoder.js.\nFetched url: ${basisEncoderJSPath}\nResponse Status: ${response.status}`
    );
  }

  const basisEncoderJS = await response.text();

  return new Promise<TranscodedFileArray>((resolve, reject) => {
    const workers = Array.from<number>({ length: workerCount }).map(
      () =>
        new Worker(workerCodeURL, {
          type: import.meta.env.DEV ? "module" : "classic",
        })
    );

    const chunks = chunkArray(files, workerCount);
    const tiles: TranscodedFileArray = {
      tileWidth: 0,
      tileHeight: 0,
      tiles: [],
    };

    let filesTranscoded = 0;
    for (let i = 0; i < workerCount; i++) {
      const worker = workers[i];
      // dimensions are set inside worker script
      const canvas = new OffscreenCanvas(0, 0);
      const chunk = chunks[i];

      worker.addEventListener(
        "message",
        (
          message: MessageEvent<
            TranscodingMessageFromWorker | ErrorMessageFromWorker
          >
        ) => {
          const data = message.data;

          if (data.status === "error") {
            reject(new Error(data.reason));
            return;
          }

          const image = new Image();
          image.onload = () => {
            filesTranscoded++;

            tiles.tileWidth = image.width;
            tiles.tileHeight = image.height;

            // tile_0_0@0.5x.basis -> [tile, 0, 0, 0.5x.basis]
            const splitFileName = data.name.split(/_|@/g);

            tiles.tiles.push({
              x: parseInt(splitFileName[1]),
              y: parseInt(splitFileName[2]),
              image,
            });

            URL.revokeObjectURL(data.blobURL);

            onConvert(
              filesTranscoded / files.length,
              filesTranscoded,
              files.length
            );

            if (filesTranscoded === files.length) {
              for (const worker of workers) worker.terminate();
              resolve(tiles);
            }
          };
          image.src = data.blobURL;
        }
      );

      const data: TranscodingMessageToWorker = {
        mode: "transcode",
        data: chunk,
        canvas,
        basisEncoderJS,
      };
      worker.postMessage(data, [canvas]);
    }
  });
}

export default basisToImage;
