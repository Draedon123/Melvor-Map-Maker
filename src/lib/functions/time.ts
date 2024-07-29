async function time<ReturnType = unknown>(
  task: () => ReturnType,
  taskName: string
): Promise<ReturnType> {
  const start = performance.now();
  const result = await task();
  const end = performance.now();
  const elapsedMS = end - start;

  if (import.meta.env.PROD) {
    return result;
  }

  console.log(`[${taskName}] | Took ${elapsedMS}ms to complete task`);
  return result;
}

export default time;
