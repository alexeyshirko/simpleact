/// <reference types="react" />

declare namespace JSX {
  type Element = VirtualElement;
  
  interface IntrinsicElements extends React.JSX.IntrinsicElements {}
}
