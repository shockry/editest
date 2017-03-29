export function getNumberOfThreads() {
  const defaultThreadCount = 4;
  return navigator.hardwareConcurrency || defaultThreadCount;
}
