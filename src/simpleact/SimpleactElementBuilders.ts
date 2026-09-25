import { Fragment } from "./SimpleactFragment";
import {
  type Props,
  SimpleactElementType,
  type ElementSource,
  type SimpleactElementParent,
  type SimpleactComponent,
} from "./SimpleactElementTypes";
import { normalizeChildren } from "./SimpleactChildren";

interface ElementBuilder<S extends ElementSource> {
  match(source: ElementSource): source is S;
  build(source: S, props: Props): SimpleactElementParent;
}

const tagBuilder: ElementBuilder<string> = {
  match: (source): source is string => typeof source === "string",
  build: (source, { children, ...props }) => ({
    children: normalizeChildren(children),
    props,
    target: null,
    tag: source,
    type: SimpleactElementType.Tag,
  }),
};

const fragmentBuilder: ElementBuilder<typeof Fragment> = {
  match: (source): source is typeof Fragment => source === Fragment,
  build: (_s, { children }) => ({
    children: normalizeChildren(children, { saveDOMPosition: true }),
    type: SimpleactElementType.Fragment,
  }),
};

const componentBuilder: ElementBuilder<SimpleactComponent> = {
  match: (source): source is SimpleactComponent => typeof source === "function",
  build: (source, props) => ({
    children: [],
    component: source,
    componentInstance: null,
    props,
    type: SimpleactElementType.Component,
  }),
};

export const SimpleactElementBuilders: ElementBuilder<ElementSource>[] = [
  componentBuilder,
  tagBuilder,
  fragmentBuilder,
];
