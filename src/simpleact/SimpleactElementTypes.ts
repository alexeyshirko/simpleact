import { type Fragment } from "./SimpleactFragment";

export type Props = Record<string, any>;
export type ElementSource = string | typeof Fragment;

export type EmptyChild = null | undefined | boolean;
export type Child = SimpleactElement | string | number | EmptyChild | Children;
export type Children = Child[];

export enum SimpleactElementType {
  Empty = 'empty',
  Fragment = 'fragment',
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

export interface SimpleactElementFragment {
  children: SimpleactElementChildren;
  type: SimpleactElementType.Fragment;
}

export type SimpleactElement = SimpleactElementEmpty | SimpleactElementTag | SimpleactElementText | SimpleactElementFragment;

export type SimpleactElementParent = Extract<SimpleactElement, { children: unknown }>;
export type SimpleactElementChildren = SimpleactElement[];
