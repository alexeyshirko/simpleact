import { type ComponentInstance, type SimpleactElementComponent } from "./SimpleactElementTypes";

export function createComponentInstance(element: SimpleactElementComponent) {
  const componentInstance: ComponentInstance = {
    element,
  };

  return componentInstance;
}
