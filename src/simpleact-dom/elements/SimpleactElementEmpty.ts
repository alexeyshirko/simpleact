import { type SimpleactElementEmpty } from "../../simpleact/SimpleactElementTypes";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";

export const SimpleactElementEmptyMethods: SimpleactElementTypeMethods<SimpleactElementEmpty> = {
  mount: (element, parentNode, nextSibling) => {
    const node = document.createTextNode("");
    element.target = node;

    parentNode.insertBefore(element.target, nextSibling);
  },
  update: (oldElement, newElement) => {
    newElement.target = oldElement.target;
  },
  unmount: (element, shouldRemoveNode) => {
    if (shouldRemoveNode) element.target?.remove();
    element.target = null;
  },
};
