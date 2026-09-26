import { type Props } from "../simpleact/SimpleactElementTypes";
import { isNullable } from "../utils/isNullable";

type StyleProp = "style";

interface Handler<K extends string = string> {
  set(node: HTMLElement, key: K, value: unknown): void;
}

const SIMPLEACT_PROPS = new Set(["key"]);

const PLAIN_PROPS = new Set([
  "flex",
  "flexGrow",
  "flexShrink",
  "fontWeight",
  "lineHeight",
  "opacity",
  "order",
  "zIndex",
  "zoom",
]);

export function mountElementProps(node: HTMLElement, props: Props) {
  for (const key in props) {
    const propValue = props[key];
    if (isNullable(propValue)) continue;

    const handler = getPropHandler(key);
    if (isNullable(handler)) continue;

    handler.set(node, key, propValue);
  }
}

function getPropHandler(key: string): Handler | null {
  if (SIMPLEACT_PROPS.has(key)) return null;

  if (key.startsWith("data-") || key.startsWith("aria-")) return attributeHandler;
  else if (key === "style") return styleHandler;
  else return propertyHandler;
}

const attributeHandler: Handler = {
  set: (node, key, value) => node.setAttribute(key, String(value)),
};

const propertyHandler: Handler = {
  set: (node, key, value) => {
    try {
      (node as unknown as Record<string, unknown>)[key] = value;
    } catch {
      attributeHandler.set(node, key, value);
    }
  },
};

const styleHandler: Handler<StyleProp> = {
  set: (node, _key, value) => {
    const style = value as Record<string, string | number | null | undefined>;

    for (const name in style) {
      const styleValue = style[name];
      if (isNullable(styleValue)) continue;

      try {
        (node.style as unknown as Record<string, string>)[name] = toCssValue(name, styleValue);
      } catch {
        // Read-only CSSStyleDeclaration members
      }
    }
  },
};

function toCssValue(name: string, value: string | number) {
  return typeof value === "number" && !PLAIN_PROPS.has(name) ? `${value}px` : String(value);
}
