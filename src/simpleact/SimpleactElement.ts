import { normalizeChildren } from "./SimpleactChildren";
import { SimpleactElementBuilders } from "./SimpleactElementBuilders";
import { type SimpleactElementParent, type Children, type ElementSource, type Props } from "./SimpleactElementTypes";

export function createElement(source: ElementSource, props: Props, ...children: Children): SimpleactElementParent {
  const builder = SimpleactElementBuilders.find((builder) => builder.match(source));
  if (!builder) throw new Error(`Unknown element source: ${String(source)}`);

  const formattedChildren = normalizeChildren(children);
  const simpleactElement = builder.build(source, props, formattedChildren);

  return simpleactElement;
}
