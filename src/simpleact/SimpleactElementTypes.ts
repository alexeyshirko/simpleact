import { type Fragment } from "./SimpleactFragment";
import { type Hook } from "./SimpleactHooksTypes";

export type SimpleactComponent<P extends Props = any> = (props: P) => Child;
export type Props = Record<string, any>;
export type ElementSource = string | typeof Fragment | SimpleactComponent;

export type SimpleactKey = string | number;
export type EmptyChild = null | undefined | boolean;
export type Child = SimpleactElement | string | number | EmptyChild | Children;
export type Children = Child[];

export enum SimpleactElementType {
  Empty = "empty",
  Component = "component",
  Fragment = "fragment",
  Tag = "tag",
  Text = "text",
}

export interface SimpleactElementEmpty {
  target: Text | null;
  type: SimpleactElementType.Empty;
}

export interface SimpleactElementTag {
  children: SimpleactElementChildren;
  props: Props;
  target: HTMLElement | null;
  tag: string;
  type: SimpleactElementType.Tag;
}

export interface SimpleactElementText {
  target: Text | null;
  type: SimpleactElementType.Text;
  value: string;
}

export interface SimpleactElementFragment {
  children: SimpleactElementChildren;
  type: SimpleactElementType.Fragment;
}

export interface SimpleactElementComponent {
  children: SimpleactElementChildren;
  component: SimpleactComponent;
  componentInstance: ComponentInstance | null;
  props: Props;
  type: SimpleactElementType.Component;
}

export interface ComponentInstance {
  id: number;
  element: SimpleactElementComponent;
  hooks: Hook[];
  hookIndex: number;
  isMounted: boolean;
  isUpdateScheduled: boolean;
}

export type SimpleactElement =
  | SimpleactElementEmpty
  | SimpleactElementTag
  | SimpleactElementText
  | SimpleactElementFragment
  | SimpleactElementComponent;

export type SimpleactElementParent = Extract<SimpleactElement, { children: unknown }>;
export type SimpleactElementChildren = SimpleactElement[];
