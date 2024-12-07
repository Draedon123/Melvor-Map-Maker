import tippy from "tippy.js";
import type { Props } from "tippy.js";
import type { Action } from "svelte/action";

function newTooltipAction(
  tooltipOptions: Partial<Props> = {}
): Action<HTMLElement, unknown> {
  return function (node) {
    const tooltip = tippy(node, {
      ...tooltipOptions,
      onShown(instance) {
        instance.popper.style.pointerEvents = "unset";
      },
    });

    return {
      destroy() {
        tooltip.destroy();
      },
    };
  };
}

export { newTooltipAction };
