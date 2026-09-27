import { DebugAction, debugGroup, debugGroupEnd, debugLog, getElementName } from "../../simpleact/SimpleactDebug";
import { type SimpleactElementTag } from "../../simpleact/SimpleactElementTypes";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";
import { mountElementProps, updateElementProps } from "../SimpleactDOMProps";
import { SimpleactElementChildrenMethods } from "./SimpleactElementChildren";

export const SimpleactElementTagMethods: SimpleactElementTypeMethods<SimpleactElementTag> = {
  mount: (element, parentNode, nextSibling) => {
    debugGroup(DebugAction.Mount, getElementName(element));

    const node = document.createElement(element.tag);
    element.target = node;

    mountElementProps(node, element.props);
    SimpleactElementChildrenMethods.mount(element, node, null);

    parentNode.insertBefore(node, nextSibling);

    debugGroupEnd();
  },
  update: (oldElement, newElement) => {
    const node = oldElement.target;
    newElement.target = node;
    oldElement.target = null;

    const isTargetExist = !!node;

    if (isTargetExist) {
      updateElementProps(node, oldElement.props, newElement.props);
      SimpleactElementChildrenMethods.update(oldElement, newElement, node);
    }
  },
  unmount: (element, shouldRemoveNode) => {
    if (shouldRemoveNode) {
      debugLog(DebugAction.Unmount, getElementName(element));
      element.target?.remove();
    }

    element.target = null;

    SimpleactElementChildrenMethods.unmount(element, false);
  },
};
