import {
  type Children,
  type Props,
  type VirtualElement,
  VirtualElementType
} from "./Simpleact";
import { normalizeChildren } from "./SimpleactNormalizeElement";

function SimpleactElement(type: string, props: Props, children: Children) {
  const virtualElement: VirtualElement = {
    children: normalizeChildren(children),
    props,
    tag: type,
    type: VirtualElementType.Tag,
  };

  return virtualElement;
}

export function createElement(type: string, props: Props, children: Children) {
  return SimpleactElement(type, props, children);
}
