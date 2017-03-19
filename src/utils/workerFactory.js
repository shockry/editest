function buildWorker(scriptSource, messageHandler) {
  const worker = new Worker(scriptSource);
  worker.onmessage = messageHandler;
  return worker;
}

export default {
  buildWorker
}
