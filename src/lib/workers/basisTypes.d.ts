type MessageFromWorker =
  | EncodingMessageFromWorker
  | TranscodingMessageFromWorker
  | ErrorMessageFromWorker;
type MessageToWorker = EncodingMessageToWorker | TranscodingMessageToWorker;

type EncodingMessageToWorker = {
  mode: "encode";
  basisEncoderJS: string;
  data: {
    name: string;
    image: Blob;
  }[];
};

type TranscodingMessageToWorker = {
  mode: "transcode";
  basisEncoderJS: string;
  data: { name: string; file: Blob }[];
  canvas: OffscreenCanvas;
};

type EncodingMessageFromWorker = {
  name: string;
  data: Uint8Array;
  status: "success";
};

type TranscodingMessageFromWorker = {
  name: string;
  blobURL: string;
  status: "success";
};

type ErrorMessageFromWorker = {
  status: "error";
  reason: string;
};

export {
  EncodingMessageToWorker,
  EncodingMessageFromWorker,
  TranscodingMessageToWorker,
  TranscodingMessageFromWorker,
  MessageFromWorker,
  MessageToWorker,
  ErrorMessageFromWorker,
};
