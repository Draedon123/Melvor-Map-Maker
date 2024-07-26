import type {
  EncodingMessageToWorker,
  EncodingMessageFromWorker,
  ErrorMessageFromWorker,
} from "../workers/basisTypes";
import workerCodeURL from "../workers/basis?worker&url";
import chunkArray from "./chunkArray";
import imageToBlob from "./imageToBlob";

async function convertImagesToBasis(
  images: { image: HTMLImageElement; name: string }[],
  workerCount: number,
  onConvert: (
    progress: number,
    convertedCount: number,
    totalFiles: number
  ) => void = () => {}
): Promise<{ file: Uint8Array; name: string }[]> {
  const basisEncoderJS = await (await fetch("/basis_encoder.js")).text();
  const filesToConvert = await Promise.all(
    images.map(
      (data) =>
        new Promise<{ image: Blob; name: string }>((resolve) => {
          imageToBlob(data.image).then((blob) => {
            resolve({
              name: data.name,
              image: blob,
            });
          });
        })
    )
  );

  return new Promise((resolve, reject) => {
    const basisFiles: { file: Uint8Array; name: string }[] = [];
    const workers = Array.from<number>({ length: workerCount }).map(
      () =>
        new Worker(workerCodeURL, {
          type: import.meta.env.DEV ? "module" : "classic",
        })
    );

    const chunks = chunkArray(filesToConvert, workerCount);

    let convertedCount = 0;

    for (let i = 0; i < workers.length; i++) {
      const worker = workers[i];
      const chunk = chunks[i];

      worker.addEventListener(
        "message",
        (
          message: MessageEvent<
            EncodingMessageFromWorker | ErrorMessageFromWorker
          >
        ) => {
          if (message.data.status === "error") {
            reject(new Error(message.data.reason));
            return;
          }

          convertedCount++;
          onConvert(
            convertedCount / filesToConvert.length,
            convertedCount,
            filesToConvert.length
          );

          basisFiles.push({
            name: message.data.name,
            file: message.data.data,
          });

          if (convertedCount === filesToConvert.length) {
            resolve(basisFiles);

            for (const worker of workers) {
              worker.terminate();
            }
          }
        }
      );

      const data: EncodingMessageToWorker = {
        mode: "encode",
        basisEncoderJS,
        data: chunk,
      };

      worker.postMessage(data);
    }
  });
}

export default convertImagesToBasis;
