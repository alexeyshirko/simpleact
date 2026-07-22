import { 
  type Child, 
  type Children, 
  type VirtualElement, 
  type VirtualElementChildren, 
  type VirtualElementEmpty, 
  type VirtualElementParent, 
  VirtualElementType 
} from "./Simpleact";

export function normalizeChildren(children: Children): VirtualElementChildren {
  const formattedChildren: VirtualElementChildren = [];

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

function normalizeChild(child: Child): VirtualElement {
  if (isVirtualElementEmpty(child)) return { type: VirtualElementType.Empty };
  else if (isVirtualElementParent(child)) return child;
  else return {
    type: VirtualElementType.Text,
    value: String(child),
  }
}

function isVirtualElementParent(child: Child): child is VirtualElementParent {
  const parentVirtualTypes = [VirtualElementType.Tag];
  return parentVirtualTypes.includes(child.type);
}

function isVirtualElementEmpty(child: Child): child is VirtualElementEmpty {
  return !child || child === 0;
}
