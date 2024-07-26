type MessageFromWorker = EncodingMessageFromWorker | ErrorMessageFromWorker;
type MessageToWorker = EncodingMessageToWorker;

type EncodingMessageToWorker = {
  mode: "encode";
  basisEncoderJS: string;
  data: {
    name: string;
    image: Blob;
  }[];
};

type EncodingMessageFromWorker = {
  name: string;
  data: Uint8Array;
  status: "success";
};

type ErrorMessageFromWorker = {
  status: "error";
  reason: string;
};

export {
  EncodingMessageToWorker,
  EncodingMessageFromWorker,
  MessageFromWorker,
  MessageToWorker,
  ErrorMessageFromWorker,
};
