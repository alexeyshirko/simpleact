import { type SimpleactElementTag } from "../../simpleact/SimpleactElementTypes";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";
import { mountElementProps, updateElementProps } from "../SimpleactDOMProps";
import { SimpleactElementChildrenMethods } from "./SimpleactElementChildren";

export const SimpleactElementTagMethods: SimpleactElementTypeMethods<SimpleactElementTag> = {
  mount: (element, parentNode, nextSibling) => {
    const node = document.createElement(element.tag);
    element.target = node;

    mountElementProps(node, element.props);
    SimpleactElementChildrenMethods.mount(element, node, null);

    parentNode.insertBefore(node, nextSibling);
  },
  update: (oldElement, newElement) => {
    const node = oldElement.target;
    newElement.target = node;

    const isTargetExist = !!node;

    if (isTargetExist) {
      updateElementProps(node, oldElement.props, newElement.props);
      SimpleactElementChildrenMethods.update(oldElement, newElement, node);
    }
  },
};
