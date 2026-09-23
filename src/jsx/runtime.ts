import type { Props } from "../simpleact/Simpleact";
import { createElement } from "../simpleact/SimpleactElement";

function jsx(type: string, props: Props) {
  const children = Array.isArray(props.children) ? props.children : [props.children];
  delete props.children;

  return createElement(type, props, children);
}

export const jsxs = jsx;
export const jsxDEV = jsx;
