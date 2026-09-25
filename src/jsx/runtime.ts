import type { JSX as ReactJSX } from "react";
import { Fragment, createElement } from "../simpleact/Simpleact";
import type { Child, Children, ElementSource, Props, SimpleactElementParent } from "../simpleact/SimpleactElementTypes";

export namespace JSX {
  export type Element = SimpleactElementParent;
  export type IntrinsicElements = {
    [K in keyof ReactJSX.IntrinsicElements]: Omit<ReactJSX.IntrinsicElements[K], "children"> & { children?: Child };
  };
}

export function jsx(source: ElementSource, { children = [], ...props }: Props & { children?: Children }) {
  return createElement(source, props, children);
}

export const jsxs = jsx;
export const jsxDEV = jsx;

export { Fragment };
