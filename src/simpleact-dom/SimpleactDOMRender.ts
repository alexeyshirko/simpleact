import { type SimpleactElement } from "../simpleact/SimpleactElementTypes";
import { isNullable } from "../utils/isNullable";
import { getElementMethods } from "./elements/SimpleactElementRegistry";
import { cloneElement, isElementMounted, isSameElement } from "./SimpleactElementState";

export function renderElement(
  oldElement: SimpleactElement | null,
  newElement: SimpleactElement,
  parentNode: Node,
  nextSibling: Node | null,
): SimpleactElement {
  const isNothingChanged = oldElement === newElement;
  if (isNothingChanged) return oldElement;

  const isDifferentElement = !isNullable(oldElement) && !isSameElement(oldElement, newElement);
  if (isDifferentElement) throw new Error("not support now");

  const currentElement = isElementMounted(newElement) ? cloneElement(newElement) : newElement;
  const elementMethods = getElementMethods(currentElement);

  const isFirstRender = isNullable(oldElement);

  if (isFirstRender) elementMethods.mount(currentElement, parentNode, nextSibling);
  else elementMethods.update(oldElement, currentElement, parentNode);

  return currentElement;
}
