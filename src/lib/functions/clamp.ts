function clamp(value: number, minimum: number, maximum: number): number {
  return Math.max(Math.min(value, maximum), minimum);
}

export default clamp;
