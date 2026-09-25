import { type SimpleactElementChildren, type Children, type Child, type SimpleactElement, SimpleactElementType, type EmptyChild } from "./SimpleactElementTypes";

export function normalizeChildren(children: Children): SimpleactElementChildren {
  const formattedChildren: SimpleactElementChildren = [];

  const recursiveCreation = (children: Children) => {
    for (const child of children) {
      if (Array.isArray(child)) {
        recursiveCreation(child);
      } else {
        const formattedChild = normalizeChild(child);
        formattedChildren.push(formattedChild)
      }
    }
  };

  recursiveCreation(children);

  return formattedChildren;
}

function normalizeChild(child: Exclude<Child, Children>): SimpleactElement {
  if (isEmptyChild(child)) return { type: SimpleactElementType.Empty };

  if (typeof child === "object") return child;

  return {
    type: SimpleactElementType.Text,
    value: String(child),
  }
}

function isEmptyChild(child: Child): child is EmptyChild {
  return child === null || child === undefined || typeof child === "boolean";
}
