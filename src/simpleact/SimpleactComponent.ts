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

  const formattedChildren = normalizeChildren(element.component(element.props), { saveDOMPosition: true });
  element.children = formattedChildren;
}
