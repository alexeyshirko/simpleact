import type { JSX as ReactJSX } from "react";
import { Fragment } from "../simpleact/Simpleact";
import { createElement } from "../simpleact/SimpleactElement";
import type {
  Child,
  ElementSource,
  Props,
  SimpleactComponent,
  SimpleactElementParent,
  SimpleactKey,
} from "../simpleact/SimpleactElementTypes";

export namespace JSX {
  export type Element = SimpleactElementParent;
  export type ElementType = keyof IntrinsicElements | SimpleactComponent;

  export interface IntrinsicAttributes {
    key?: SimpleactKey;
  }

  export type IntrinsicElements = {
    [K in keyof ReactJSX.IntrinsicElements]: Omit<ReactJSX.IntrinsicElements[K], "children"> & { children?: Child };
  };
}

export function jsx(source: ElementSource, props: Props, _key?: SimpleactKey) {
  return createElement(source, props);
}

export const jsxs = jsx;
export const jsxDEV = jsx;

export { Fragment };
