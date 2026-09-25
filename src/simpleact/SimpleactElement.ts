import { SimpleactElementBuilders } from "./SimpleactElementBuilders";
import { type SimpleactElementParent, type ElementSource, type Props } from "./SimpleactElementTypes";

export function createElement(source: ElementSource, props: Props): SimpleactElementParent {
  const builder = SimpleactElementBuilders.find((builder) => builder.match(source));
  if (!builder) throw new Error(`Unknown element source: ${String(source)}`);

  const simpleactElement = builder.build(source, props);
  return simpleactElement;
}
