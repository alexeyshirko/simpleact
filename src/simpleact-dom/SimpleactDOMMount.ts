import { mountComponent } from "../simpleact/SimpleactComponent";
import {
  SimpleactElement,
  SimpleactElementComponent,
  SimpleactElementEmpty,
  SimpleactElementFragment,
  SimpleactElementParent,
  SimpleactElementTag,
  SimpleactElementText,
  SimpleactElementType,
} from "../simpleact/SimpleactElementTypes";
import { cloneElement, isElementMounted } from "./SimpleactElementState";

type Mounter<E extends SimpleactElement> = (element: E, parentNode: Node, nextSibling: Node | null) => void;

export function mountElement(element: SimpleactElement, parentNode: Node, nextSibling: Node | null) {
  const currentElement = isElementMounted(element) ? cloneElement(element) : element;

  switch (currentElement.type) {
    case SimpleactElementType.Component: {
      mountElementComponent(currentElement, parentNode, nextSibling);
      break;
    }
    case SimpleactElementType.Empty: {
      mountEmptyElement(currentElement, parentNode, nextSibling);
      break;
    }
    case SimpleactElementType.Fragment: {
      mountFragmentElement(currentElement, parentNode, nextSibling);
      break;
    }
    case SimpleactElementType.Tag: {
      mountTagElement(currentElement, parentNode, nextSibling);
      break;
    }
    case SimpleactElementType.Text: {
      mountTextElement(currentElement, parentNode, nextSibling);
      break;
    }
  }

  return currentElement;
}

const mountElementComponent: Mounter<SimpleactElementComponent> = (element, parentNode, nextSibling) => {
  mountComponent(element);
  mountComponentChildren(element, parentNode, nextSibling);
};

const mountEmptyElement: Mounter<SimpleactElementEmpty> = (element, parentNode, nextSibling) => {
  const node = document.createTextNode("");
  element.target = node;

  parentNode.insertBefore(element.target, nextSibling);
};

const mountFragmentElement: Mounter<SimpleactElementFragment> = (element, parentNode, nextSibling) => {
  mountComponentChildren(element, parentNode, nextSibling);
};

const mountTagElement: Mounter<SimpleactElementTag> = (element, parentNode, nextSibling) => {
  const node = document.createElement(element.tag);
  element.target = node;

  mountComponentChildren(element, node, null);

  parentNode.insertBefore(node, nextSibling);
};

const mountTextElement: Mounter<SimpleactElementText> = (element, parentNode, nextSibling) => {
  const node = document.createTextNode(element.value);
  element.target = node;

  parentNode.insertBefore(element.target, nextSibling);
};

const mountComponentChildren: Mounter<SimpleactElementParent> = (element, parentNode, nextSibling) => {
  const children = element.children;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    children[i] = mountElement(child, parentNode, nextSibling);
  }
};
