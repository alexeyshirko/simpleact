import { type SimpleactElement } from "../../simpleact/SimpleactElementTypes";

export type SimpleactElementTypeMethods<E extends SimpleactElement> = {
  mount(element: E, parentNode: Node, nextSibling: Node | null): void;
  update(oldElement: E, newElement: E, parentNode: Node): void;
  unmount(element: E, shouldRemoveNode: boolean): void;
};
