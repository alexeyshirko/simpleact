import { mountComponent, unmountComponent, updateComponent } from "../../simpleact/SimpleactComponent";
import { type SimpleactElementComponent } from "../../simpleact/SimpleactElementTypes";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";
import { SimpleactElementChildrenMethods } from "./SimpleactElementChildren";

export const SimpleactElementComponentMethods: SimpleactElementTypeMethods<SimpleactElementComponent> = {
  mount: (element, parentNode, nextSibling) => {
    mountComponent(element);
    SimpleactElementChildrenMethods.mount(element, parentNode, nextSibling);
  },
  update: (oldElement, newElement, parentNode) => {
    updateComponent(oldElement, newElement);
    SimpleactElementChildrenMethods.update(oldElement, newElement, parentNode);
  },
  unmount: (element, shouldRemoveNode) => {
    unmountComponent(element);
    SimpleactElementChildrenMethods.unmount(element, shouldRemoveNode);
  },
};
