import { mountComponent } from "../../simpleact/SimpleactComponent";
import { type SimpleactElementComponent } from "../../simpleact/SimpleactElementTypes";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";
import { SimpleactElementChildrenMethods } from "./SimpleactElementChildren";

export const SimpleactElementComponentMethods: SimpleactElementTypeMethods<SimpleactElementComponent> = {
  mount: (element, parentNode, nextSibling) => {
    mountComponent(element);
    SimpleactElementChildrenMethods.mount(element, parentNode, nextSibling);
  },
  update: (_oldElement, _newElement) => {
    throw new Error("not support now");
  },
};
