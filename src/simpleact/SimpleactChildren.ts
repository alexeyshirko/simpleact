import { type SimpleactElementChildren, type Child, type SimpleactElement, SimpleactElementType, type EmptyChild, type Children } from "./SimpleactElementTypes";

export function normalizeChildren(children: Child): SimpleactElementChildren {
  const formattedChildren: SimpleactElementChildren = [];
  if (children === undefined) return formattedChildren;

  const recursiveCreation = (child: Child) => {
    if (Array.isArray(child)) child.forEach(recursiveCreation);
    else formattedChildren.push(normalizeChild(child));
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
