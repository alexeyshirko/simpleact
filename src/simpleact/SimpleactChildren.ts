import { SimpleactElement, SimpleactElementChildren, SimpleactElementEmpty, SimpleactElementParent, SimpleactElementType } from "./SimpleactElement";
import { type Child, type Children } from "./Simpleact";

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

function normalizeChild(child: Child): SimpleactElement {
  if (isVirtualElementEmpty(child)) return { type: SimpleactElementType.Empty };
  else if (isVirtualElementParent(child)) return child;
  else return {
    type: SimpleactElementType.Text,
    value: String(child),
  }
}

function isVirtualElementParent(child: Child): child is SimpleactElementParent {
  const parentVirtualTypes = [SimpleactElementType.Tag];
  return parentVirtualTypes.includes(child.type);
}

function isVirtualElementEmpty(child: Child): child is SimpleactElementEmpty {
  return !child || child === 0;
}
