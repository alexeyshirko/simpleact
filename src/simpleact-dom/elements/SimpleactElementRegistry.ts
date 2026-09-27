import { type SimpleactElement, SimpleactElementType } from "../../simpleact/SimpleactElementTypes";
import { SimpleactElementComponentMethods } from "./SimpleactElementComponent";
import { SimpleactElementEmptyMethods } from "./SimpleactElementEmpty";
import { SimpleactElementFragmentMethods } from "./SimpleactElementFragment";
import { type SimpleactElementTypeMethods } from "./SimpleactElementMethodsTypes";
import { SimpleactElementTagMethods } from "./SimpleactElementTag";
import { SimpleactElementTextMethods } from "./SimpleactElementText";

type ElementOfType<T extends SimpleactElementType> = Extract<SimpleactElement, { type: T }>;

type ElementTypeMethods = {
  [K in SimpleactElementType]: SimpleactElementTypeMethods<ElementOfType<K>>;
};

const elementTypeMethods: ElementTypeMethods = {
  [SimpleactElementType.Component]: SimpleactElementComponentMethods,
  [SimpleactElementType.Empty]: SimpleactElementEmptyMethods,
  [SimpleactElementType.Fragment]: SimpleactElementFragmentMethods,
  [SimpleactElementType.Tag]: SimpleactElementTagMethods,
  [SimpleactElementType.Text]: SimpleactElementTextMethods,
};

export function getElementMethods(element: SimpleactElement): SimpleactElementTypeMethods<SimpleactElement> {
  return elementTypeMethods[element.type];
}
