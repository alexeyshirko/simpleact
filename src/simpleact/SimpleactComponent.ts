import { SimpleactElementChildrenMethods } from "../simpleact-dom/elements/SimpleactElementChildren";
import { isNullable } from "../utils/isNullable";
import { normalizeChildren } from "./SimpleactChildren";
import { getLastNode } from "./SimpleactElementState";
import { type Child, type ComponentInstance, type SimpleactElementComponent } from "./SimpleactElementTypes";

let lastInstanceId = 0;

export let currentComponentInstance: ComponentInstance | null = null;

function createComponentInstance(element: SimpleactElementComponent) {
  const componentInstance: ComponentInstance = {
    id: ++lastInstanceId,
    element,
    hookIndex: 0,
    hooks: [],
    isMounted: false,
    isUpdateScheduled: false,
  };

  return componentInstance;
}

export function mountComponent(element: SimpleactElementComponent) {
  const componentInstance = createComponentInstance(element);
  element.componentInstance = componentInstance;

  renderComponent(element);
  componentInstance.isMounted = true;
}

export function updateComponent(oldElement: SimpleactElementComponent, newElement: SimpleactElementComponent) {
  const componentInstance = oldElement.componentInstance;

  if (componentInstance) {
    componentInstance.element = newElement;
    newElement.componentInstance = componentInstance;
    oldElement.componentInstance = null;

    renderComponent(newElement);
  }
}

export function unmountComponent(element: SimpleactElementComponent) {
  const componentInstance = element.componentInstance;
  if (componentInstance) componentInstance.isMounted = false;

  element.componentInstance = null;
}

function renderComponent(element: SimpleactElementComponent) {
  const componentInstance = element.componentInstance!;

  componentInstance.hookIndex = 0;
  componentInstance.isUpdateScheduled = false;

  const renderedValue = renderComponentWithHooks(element, componentInstance);

  element.children = normalizeChildren(renderedValue, { saveDOMPosition: true });
}

function renderComponentWithHooks(element: SimpleactElementComponent, componentInstance: ComponentInstance): Child {
  currentComponentInstance = componentInstance;

  try {
    return element.component(element.props);
  } finally {
    currentComponentInstance = null;
  }
}

export function rerenderComponent(componentInstance: ComponentInstance) {
  const element = componentInstance.element;

  const parentNode = getLastNode(element).parentNode;
  if (isNullable(parentNode)) return;

  const previousElement = { ...element };
  renderComponent(element);

  SimpleactElementChildrenMethods.update(previousElement, element, parentNode);
}
