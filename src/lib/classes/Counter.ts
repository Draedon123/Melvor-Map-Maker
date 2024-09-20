class Counter {
  private value: number;
  constructor(initialValue: number = 0) {
    this.value = initialValue;
  }

  public getNext(): number {
    return this.value++;
  }
}

export { Counter };
