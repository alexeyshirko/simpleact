import { type SimpleactElement } from "../simpleact/SimpleactElementTypes";
import { isNullable } from "../utils/isNullable";
import { getElementMethodsByType } from "./elements/SimpleactElementRegistry";
import { cloneElement, getLastNode, isElementMounted, isSameElement } from "../simpleact/SimpleactElementState";

export function renderElement(
  oldElement: SimpleactElement | null,
  newElement: SimpleactElement,
  parentNode: Node,
  nextSibling: Node | null,
): SimpleactElement {
  const isNothingChanged = oldElement === newElement;
  if (isNothingChanged) return oldElement;

  const currentElement = isElementMounted(newElement) ? cloneElement(newElement) : newElement;
  const currentElementMethods = getElementMethodsByType(currentElement.type);

  const isFirstRender = isNullable(oldElement);
  if (isFirstRender) {
    currentElementMethods.mount(currentElement, parentNode, nextSibling);
  }

  const isDifferentElement = !isNullable(oldElement) && !isSameElement(oldElement, newElement);
  if (isDifferentElement) {
    const nodeAfterOldElement = getLastNode(oldElement).nextSibling;
    const oldElementMethods = getElementMethodsByType(oldElement.type);

    oldElementMethods.unmount(oldElement, true);
    currentElementMethods.mount(currentElement, parentNode, nodeAfterOldElement);
  }

  if (!isFirstRender && !isDifferentElement) {
    currentElementMethods.update(oldElement, currentElement, parentNode);
  }

  return currentElement;
}
