import { type SimpleactElement } from "../simpleact/SimpleactElementTypes";
import { mountElement } from "./SimpleactDOMMount";

function render(element: SimpleactElement, container: HTMLElement) {
  const nextSibling = null;

  mountElement(element, container, nextSibling);
}

export { render };
