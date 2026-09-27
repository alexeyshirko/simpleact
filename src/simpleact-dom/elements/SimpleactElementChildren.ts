import { type SimpleactElementParent } from "../../simpleact/SimpleactElementTypes";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";
import { renderElement } from "../SimpleactDOMRender";

export const SimpleactElementChildrenMethods: SimpleactElementTypeMethods<SimpleactElementParent> = {
  mount: (element, parentNode, nextSibling) => {
    const children = element.children;

    for (let i = 0; i < children.length; i++) {
      children[i] = renderElement(null, children[i], parentNode, nextSibling);
    }
  },
  update: (oldElement, newElement, parentNode) => {
    const oldChildren = oldElement.children;
    const newChildren = newElement.children;

    if (oldChildren.length !== newChildren.length) {
      throw new Error("Changing the number of children is not supported yet");
    }

    for (let i = 0; i < newChildren.length; i++) {
      newChildren[i] = renderElement(oldChildren[i], newChildren[i], parentNode, null);
    }
  },
};
