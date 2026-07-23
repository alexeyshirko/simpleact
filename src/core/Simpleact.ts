import { createElement } from "./SimpleactCreateElement";

export type Props = Record<string, any>;
export type Child = any;
export type Children = Child[];

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

export const Simpleact = { createElement };
