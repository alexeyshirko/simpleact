import { createElement } from "./SimpleactCreateElement";

export type Props = Record<string, any>;
export type Child = any;
export type Children = Child[];

export enum VirtualElementType {
  Empty = 'empty',
  Tag = 'tag',
  Text = 'text',
}

export interface VirtualElementEmpty {
  type: VirtualElementType.Empty;
}

export interface VirtualElementTag {
  children: VirtualElementChildren;
  props: Props;
  tag: string;
  type: VirtualElementType.Tag;
}

export interface VirtualElementText {
  type: VirtualElementType.Text;
  value: string;
}

export type VirtualElement = VirtualElementEmpty | VirtualElementTag | VirtualElementText;

export type VirtualElementParent = VirtualElementTag;
export type VirtualElementChildren = VirtualElement[];

export const Simpleact = { createElement };
