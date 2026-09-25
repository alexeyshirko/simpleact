import { Fragment } from "./SimpleactFragment";
import { type Props, type SimpleactElementChildren, SimpleactElementType, type ElementSource, type SimpleactElementParent } from "./SimpleactElementTypes";

interface ElementBuilder<S extends ElementSource> {
  match(source: ElementSource): source is S;
  build(source: S, props: Props, children: SimpleactElementChildren): SimpleactElementParent;
}

const tagBuilder: ElementBuilder<string> = {
  match: (source): source is string => typeof source === "string",
  build: (source, props, children) => ({ children, props, tag: source, type: SimpleactElementType.Tag }),
}

const fragmentBuilder: ElementBuilder<typeof Fragment> = {
  match: (source): source is typeof Fragment => source === Fragment,
  build: (_s, _p, children) => ({ children, type: SimpleactElementType.Fragment }),
}

export const SimpleactElementBuilders: ElementBuilder<ElementSource>[] = [tagBuilder, fragmentBuilder];
