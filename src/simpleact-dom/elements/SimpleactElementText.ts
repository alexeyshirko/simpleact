import { type SimpleactElementText } from "../../simpleact/SimpleactElementTypes";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";

export const SimpleactElementTextMethods: SimpleactElementTypeMethods<SimpleactElementText> = {
  mount: (element, parentNode, nextSibling) => {
    const node = document.createTextNode(element.value);
    element.target = node;

    parentNode.insertBefore(element.target, nextSibling);
  },
  update: (oldElement, newElement) => {
    const node = oldElement.target;
    newElement.target = node;

    const isTargetExist = !!node;
    const isElementValueChanged = oldElement.value !== newElement.value;

    if (isTargetExist && isElementValueChanged) {
      node.data = newElement.value;
    }
  },
};
