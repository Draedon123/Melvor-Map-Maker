function chunkArray<T = unknown>(array: T[], chunkCount: number): T[][] {
  const chunks: T[][] = [];
  const baseChunkSize = Math.floor(array.length / chunkCount);
  const leftoverCount = array.length - baseChunkSize * chunkCount;

  for (let i = 0; i < chunkCount; i++) {
    chunks[i] = array.slice(
      i * baseChunkSize,
      i * baseChunkSize + baseChunkSize
    );
    if (i < leftoverCount) {
      chunks[i].push(array.at(-(i + 1)) as T);
    }
  }

  return chunks;
}

export default chunkArray;
