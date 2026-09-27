import { DebugAction, debugGroup, debugGroupEnd } from "../simpleact/SimpleactDebug";
import { type SimpleactElement } from "../simpleact/SimpleactElementTypes";
import { renderElement } from "./SimpleactDOMRender";

const rootElements = new WeakMap<HTMLElement, SimpleactElement>();

function render(element: SimpleactElement, container: HTMLElement) {
  const nextSibling = null;

  debugGroup(DebugAction.Render, `root #${container.id || container.localName}`);

  const previousRootElement = rootElements.get(container) ?? null;
  const renderedRootElement = renderElement(previousRootElement, element, container, nextSibling);

  rootElements.set(container, renderedRootElement);

  debugGroupEnd();
}

export { render };
