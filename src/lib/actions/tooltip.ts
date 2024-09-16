import type { Action } from "svelte/action";
import type { Props } from "tippy.js";
import tippy from "tippy.js";

function newTooltipAction(
  tooltipOptions: Partial<Props> = {}
): Action<HTMLElement, unknown> {
  return function (node) {
    const tooltip = tippy(node, tooltipOptions);

    return {
      destroy() {
        tooltip.destroy();
      },
    };
  };
}

export { newTooltipAction };
