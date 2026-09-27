import { type SimpleactElementFragment } from "../../simpleact/SimpleactElementTypes";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";
import { SimpleactElementChildrenMethods } from "./SimpleactElementChildren";

export const SimpleactElementFragmentMethods: SimpleactElementTypeMethods<SimpleactElementFragment> = {
  mount: (element, parentNode, nextSibling) => {
    SimpleactElementChildrenMethods.mount(element, parentNode, nextSibling);
  },
  update: (oldElement, newElement, parentNode) => {
    SimpleactElementChildrenMethods.update(oldElement, newElement, parentNode);
  },
};
