import { mountComponent, unmountComponent, updateComponent } from "../../simpleact/SimpleactComponent";
import { DebugAction, debugGroup, debugGroupEnd, debugLog, getElementName } from "../../simpleact/SimpleactDebug";
import { type SimpleactElementComponent } from "../../simpleact/SimpleactElementTypes";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";
import { SimpleactElementChildrenMethods } from "./SimpleactElementChildren";

export const SimpleactElementComponentMethods: SimpleactElementTypeMethods<SimpleactElementComponent> = {
  mount: (element, parentNode, nextSibling) => {
    debugGroup(DebugAction.Mount, getElementName(element));

    mountComponent(element);
    SimpleactElementChildrenMethods.mount(element, parentNode, nextSibling);

    debugGroupEnd();
  },
  update: (oldElement, newElement, parentNode) => {
    debugGroup(DebugAction.Render, `${getElementName(newElement)} — parent rerendered`);

    updateComponent(oldElement, newElement);
    SimpleactElementChildrenMethods.update(oldElement, newElement, parentNode);

    debugGroupEnd();
  },
  unmount: (element, shouldRemoveNode) => {
    debugLog(DebugAction.Unmount, getElementName(element));

    unmountComponent(element);
    SimpleactElementChildrenMethods.unmount(element, shouldRemoveNode);
  },
};
