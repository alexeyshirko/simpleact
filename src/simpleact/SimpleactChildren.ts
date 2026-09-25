import {
  type SimpleactElementChildren,
  type Child,
  type SimpleactElement,
  SimpleactElementType,
  type EmptyChild,
  type Children,
  type SimpleactElementEmpty,
} from "./SimpleactElementTypes";

interface NormalizeChildrenOptions {
  saveDOMPosition?: boolean;
}

export function normalizeChildren(
  children: Child,
  { saveDOMPosition }: NormalizeChildrenOptions = {},
): SimpleactElementChildren {
  const formattedChildren: SimpleactElementChildren = [];

  const recursiveCreation = (child: Child) => {
    if (Array.isArray(child)) child.forEach(recursiveCreation);
    else {
      const formattedChild = normalizeChild(child);
      formattedChildren.push(formattedChild);
    }
  };

  if (children !== undefined) recursiveCreation(children);

  const isCreateEmptyPosition = saveDOMPosition && formattedChildren.length === 0;
  if (isCreateEmptyPosition) {
    const simpleactElementEmpty = createSimpleactElementEmpty();
    formattedChildren.push(simpleactElementEmpty);
  }

  return formattedChildren;
}

function normalizeChild(child: Exclude<Child, Children>): SimpleactElement {
  if (isEmptyChild(child)) {
    const simpleactElementEmpty = createSimpleactElementEmpty();
    return simpleactElementEmpty;
  }

  if (typeof child === "object") return child;

  return {
    target: null,
    type: SimpleactElementType.Text,
    value: String(child),
  };
}

function createSimpleactElementEmpty(): SimpleactElementEmpty {
  return { target: null, type: SimpleactElementType.Empty };
}

function isEmptyChild(child: Child): child is EmptyChild {
  return child === null || child === undefined || typeof child === "boolean";
}
