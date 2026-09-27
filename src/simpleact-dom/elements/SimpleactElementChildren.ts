import { type SimpleactElementChildren, type SimpleactElementParent } from "../../simpleact/SimpleactElementTypes";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";
import { renderElement } from "../SimpleactDOMRender";
import { getElementMethodsByType } from "./SimpleactElementRegistry";
import { getLastNode } from "../SimpleactElementState";

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

    const commonChildrenCount = Math.min(oldChildren.length, newChildren.length);
    const hasRemovedChildren = oldChildren.length > commonChildrenCount;
    const hasAddedChildren = newChildren.length > commonChildrenCount;

    const nodeAfterChildren = hasAddedChildren ? getNodeAfterChildren(oldChildren) : null;

    for (let i = 0; i < commonChildrenCount; i++) {
      newChildren[i] = renderElement(oldChildren[i], newChildren[i], parentNode, null);
    }

    if (hasRemovedChildren) {
      for (let i = commonChildrenCount; i < oldChildren.length; i++) {
        const child = oldChildren[i];
        getElementMethodsByType(child.type).unmount(child, true);
      }
    }

    if (hasAddedChildren) {
      for (let i = commonChildrenCount; i < newChildren.length; i++) {
        newChildren[i] = renderElement(null, newChildren[i], parentNode, nodeAfterChildren);
      }
    }
  },
  unmount: (element, shouldRemoveNode) => {
    for (const child of element.children) {
      const unmount = getElementMethodsByType(child.type).unmount;
      unmount(child, shouldRemoveNode);
    }
  },
};

function getNodeAfterChildren(children: SimpleactElementChildren) {
  const lastChild = children[children.length - 1];
  return lastChild ? getLastNode(lastChild).nextSibling : null;
}
