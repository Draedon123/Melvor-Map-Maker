import type {
  EncodingMessageFromWorker,
  ErrorMessageFromWorker,
  MessageToWorker,
} from "./basisTypes";

self.addEventListener(
  "message",
  async (message: MessageEvent<MessageToWorker>) => {
    const basis = await (0, eval)(message.data.basisEncoderJS)();
    switch (message.data.mode) {
      case "encode": {
        const { BasisEncoder, initializeBasis } = basis;

        for (const { name, image } of message.data.data) {
          const imageData = new Uint8Array(await image.arrayBuffer());
          initializeBasis();

          const basisFileData = new Uint8Array(1024 * 1024 * 10);
          const basisEncoder = new BasisEncoder();

          basisEncoder.setSliceSourceImage(0, imageData, 0, 0, true);
          basisEncoder.setComputeStats(false);
          basisEncoder.setPerceptual(true);
          basisEncoder.setMipSRGB(true);
          basisEncoder.setQualityLevel(255);
          basisEncoder.setUASTC(true);
          basisEncoder.setMipGen(false);

          const outputBytes = basisEncoder.encode(basisFileData);
          const actualBasisData = new Uint8Array(
            basisFileData.buffer,
            0,
            outputBytes
          );

          basisEncoder.delete();

          if (outputBytes === 0) {
            const error: ErrorMessageFromWorker = {
              status: "error",
              reason: "Failed to convert image to .basis",
            };

            postMessage(error);
            return;
          }

          const message: EncodingMessageFromWorker = {
            status: "success",
            name,
            data: actualBasisData,
          };
          postMessage(message);
        }

        return;
      }
    }
  }
);
