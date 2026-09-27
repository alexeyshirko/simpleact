import { DebugAction, debugLog, formatDebugValue } from "../simpleact/SimpleactDebug";
import { type Props } from "../simpleact/SimpleactElementTypes";
import { isNullable } from "../utils/isNullable";

type StyleObject = Record<string, string | number | null | undefined>;

interface PropHandler {
  set(node: HTMLElement, key: string, value: unknown, oldValue: unknown): void;
  remove(node: HTMLElement, key: string, oldValue: unknown): void;
}

const SIMPLEACT_PROPS = new Set(["key"]);

const UNITLESS_STYLES = new Set([
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
  updateElementProps(node, {}, props);
}

export function updateElementProps(node: HTMLElement, oldProps: Props, newProps: Props) {
  for (const key in oldProps) {
    const oldProp = oldProps[key];
    const newProp = newProps[key];

    if (isRemoved(oldProp, newProp)) {
      const handler = getPropHandler(key);
      if (handler) debugLog(DebugAction.Prop, `<${node.localName}> ${key} removed`);

      handler?.remove(node, key, oldProp);
    }
  }

  for (const key in newProps) {
    const oldProp = oldProps[key];
    const newProp = newProps[key];

    if (isChanged(newProp, oldProp)) {
      const handler = getPropHandler(key);
      if (handler) debugLog(DebugAction.Prop, `<${node.localName}> ${key} = ${formatDebugValue(newProp)}`);

      handler?.set(node, key, newProp, oldProp);
    }
  }
}

function getPropHandler(key: string): PropHandler | null {
  if (SIMPLEACT_PROPS.has(key)) return null;
  if (key === "style") return styleHandler;
  if (key.startsWith("data-") || key.startsWith("aria-")) return attributeHandler;

  return propertyHandler;
}

const attributeHandler: PropHandler = {
  set: (node, key, value) => node.setAttribute(key, String(value)),
  remove: (node, key) => node.removeAttribute(key),
};

const propertyHandler: PropHandler = {
  set: (node, key, value) => setProperty(node, key, value),
  remove: (node, key, oldValue) => {
    setProperty(node, key, typeof oldValue === "boolean" ? false : "");
    node.removeAttribute(key);
  },
};

const styleHandler: PropHandler = {
  set: (node, _key, value, oldValue = {}) => {
    const style = value as StyleObject;
    const oldStyle = oldValue as StyleObject;

    for (const name in oldStyle) {
      if (isRemoved(oldStyle[name], style[name])) setStyle(node, name, "");
    }

    for (const name in style) {
      const styleValue = style[name];
      if (isChanged(styleValue, oldStyle[name])) setStyle(node, name, toCssValue(name, styleValue));
    }
  },
  remove: (node) => node.removeAttribute("style"),
};

function setProperty(node: HTMLElement, key: string, value: unknown) {
  try {
    (node as unknown as Record<string, unknown>)[key] = value;
  } catch {
    node.setAttribute(key, String(value));
  }
}

function setStyle(node: HTMLElement, name: string, value: string) {
  try {
    (node.style as unknown as Record<string, string>)[name] = value;
  } catch {
    // Read-only CSSStyleDeclaration members
  }
}

function toCssValue(name: string, value: string | number) {
  return typeof value === "number" && !UNITLESS_STYLES.has(name) ? `${value}px` : String(value);
}

function isRemoved(oldValue: unknown, newValue: unknown) {
  return !isNullable(oldValue) && isNullable(newValue);
}

function isChanged<T>(newValue: T, oldValue: unknown): newValue is NonNullable<T> {
  return !isNullable(newValue) && newValue !== oldValue;
}
