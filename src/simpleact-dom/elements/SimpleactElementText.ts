import { DebugAction, debugLog, getElementName } from "../../simpleact/SimpleactDebug";
import { type SimpleactElementText } from "../../simpleact/SimpleactElementTypes";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";

export const SimpleactElementTextMethods: SimpleactElementTypeMethods<SimpleactElementText> = {
  mount: (element, parentNode, nextSibling) => {
    debugLog(DebugAction.Mount, getElementName(element));

    const node = document.createTextNode(element.value);
    element.target = node;

    parentNode.insertBefore(element.target, nextSibling);
  },
  update: (oldElement, newElement) => {
    const node = oldElement.target;
    newElement.target = node;
    oldElement.target = null;

    const isTargetExist = !!node;
    const isElementValueChanged = oldElement.value !== newElement.value;

    if (isTargetExist && isElementValueChanged) {
      debugLog(DebugAction.Update, `${getElementName(oldElement)} → ${getElementName(newElement)}`);
      node.data = newElement.value;
    }
  },
  unmount: (element, shouldRemoveNode) => {
    if (shouldRemoveNode) {
      debugLog(DebugAction.Unmount, getElementName(element));
      element.target?.remove();
    }

    element.target = null;
  },
};
