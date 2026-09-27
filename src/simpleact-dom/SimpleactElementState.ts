import {
  type SimpleactElementComponent,
  type SimpleactElementTag,
  SimpleactElementType,
  type SimpleactElement,
} from "../simpleact/SimpleactElementTypes";

export function isSameElement(oldElement: SimpleactElement, newElement: SimpleactElement) {
  if (oldElement.type !== newElement.type) return false;

  switch (newElement.type) {
    case SimpleactElementType.Component: {
      return (oldElement as SimpleactElementComponent).component === newElement.component;
    }
    case SimpleactElementType.Tag: {
      return (oldElement as SimpleactElementTag).tag === newElement.tag;
    }
    default: {
      return true;
    }
  }
}

export function isElementMounted(element: SimpleactElement) {
  switch (element.type) {
    case SimpleactElementType.Component:
      return element.componentInstance !== null;
    case SimpleactElementType.Empty:
    case SimpleactElementType.Tag:
    case SimpleactElementType.Text:
      return element.target !== null;
    case SimpleactElementType.Fragment:
      return isElementMounted(element.children[0]);
  }
}

/**
 * The same element object can appear in the tree more than once (`{icon}{icon}`),
 * but each occurrence needs its own DOM node and component instance.
 */
export function cloneElement(element: SimpleactElement): SimpleactElement {
  switch (element.type) {
    case SimpleactElementType.Component:
      return { ...element, children: [], componentInstance: null };
    case SimpleactElementType.Empty:
    case SimpleactElementType.Text:
      return { ...element, target: null };
    case SimpleactElementType.Fragment:
      return { ...element, children: [...element.children] };
    case SimpleactElementType.Tag:
      return { ...element, children: [...element.children], target: null };
  }
}
