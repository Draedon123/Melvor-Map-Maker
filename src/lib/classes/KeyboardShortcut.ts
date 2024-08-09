type Keybind = {
  key: string;
  modifiers: ("CTRL" | "SHIFT")[];
};

class KeyboardShortcut {
  private readonly keys: Set<Keybind>;
  constructor(
    private readonly callback: (event: KeyboardEvent) => void,
    ...keys: Keybind[]
  ) {
    this.keys = new Set(keys);
    this.registerEventListener();
  }

  private registerEventListener(): this {
    document.addEventListener("keydown", (event) => {
      for (const key of this.keys) {
        if (
          (!key.modifiers.includes("CTRL") ||
            (key.modifiers.includes("CTRL") && event.ctrlKey)) &&
          (!key.modifiers.includes("SHIFT") ||
            (key.modifiers.includes("SHIFT") && event.shiftKey)) &&
          event.key === key.key
        ) {
          this.callback(event);
          return;
        }
      }
    });
    return this;
  }

  public unregisterEventListener(): this {
    document.removeEventListener("keypress", this.callback);
    return this;
  }
}

export default KeyboardShortcut;
