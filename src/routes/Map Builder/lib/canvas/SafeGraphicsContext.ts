import {
  GraphicsContext,
  type TextureDestroyOptions,
  type TypeOrBool,
} from "pixi.js";

class SafeGraphicsContext extends GraphicsContext {
  private destroyed: boolean;
  constructor() {
    super();

    this.destroyed = false;
  }

  public override destroy(options?: TypeOrBool<TextureDestroyOptions>): void {
    if (this.destroyed) {
      return;
    }

    super.destroy(options);
    this.destroyed = true;
  }
}

export default SafeGraphicsContext;
