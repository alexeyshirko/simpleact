import { normalizeChildren } from "./SimpleactChildren";
import { type ComponentInstance, type SimpleactElementComponent } from "./SimpleactElementTypes";

export function createComponentInstance(element: SimpleactElementComponent) {
  const componentInstance: ComponentInstance = {
    element,
  };

  return componentInstance;
}

export function mountComponent(element: SimpleactElementComponent) {
  const componentInstance = createComponentInstance(element);
  element.componentInstance = componentInstance;

  renderComponent(element);
}

export function updateComponent(oldElement: SimpleactElementComponent, newElement: SimpleactElementComponent) {
  const componentInstance = oldElement.componentInstance;

  if (componentInstance) {
    componentInstance.element = newElement;
    newElement.componentInstance = componentInstance;

    unmountComponent(oldElement);
    renderComponent(newElement);
  }
}

export function unmountComponent(element: SimpleactElementComponent) {
  element.componentInstance = null;
}

function renderComponent(element: SimpleactElementComponent) {
  const renderedValue = element.component(element.props);
  const formattedChildren = normalizeChildren(renderedValue, { saveDOMPosition: true });

  element.children = formattedChildren;
}
