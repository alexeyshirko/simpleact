import {
  type Children,
  type Props,
  type SimpleactElement,
  SimpleactElementType
} from "./Simpleact";
import { normalizeChildren } from "./SimpleactNormalizeElement";

export function createElement(type: string, props: Props, children: Children) {
  return createSimpleactElement(type, props, children);
}

function createSimpleactElement(type: string, props: Props, children: Children) {
  const virtualElement: SimpleactElement = {
    children: normalizeChildren(children),
    props,
    tag: type,
    type: SimpleactElementType.Tag,
  };

  return virtualElement;
}
