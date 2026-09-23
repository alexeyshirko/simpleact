import { type Children, type Props } from "./Simpleact";
import { normalizeChildren } from "./SimpleactChildren";

export enum SimpleactElementType {
  Empty = 'empty',
  Tag = 'tag',
  Text = 'text',
}

export interface SimpleactElementEmpty {
  type: SimpleactElementType.Empty;
}

export interface SimpleactElementTag {
  children: SimpleactElementChildren;
  props: Props;
  tag: string;
  type: SimpleactElementType.Tag;
}

export interface SimpleactElementText {
  type: SimpleactElementType.Text;
  value: string;
}

export type SimpleactElement = SimpleactElementEmpty | SimpleactElementTag | SimpleactElementText;

export type SimpleactElementParent = SimpleactElementTag;
export type SimpleactElementChildren = SimpleactElement[];

export function createElement(tag: string, props: Props, children: Children) {
  return SimpleactElement(tag, props, children);
}

function SimpleactElement(tag: string, props: Props, children: Children) {
  const formattedChildren = normalizeChildren(children);

  const virtualElement: SimpleactElement = {
    children: formattedChildren,
    props,
    tag,
    type: SimpleactElementType.Tag,
  };

  return virtualElement;
}
