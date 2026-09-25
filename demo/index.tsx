import { render } from "../src/simpleact-dom/SimpleactDOM";

const SimpleactJSXElement = (props: { row: string }) => {
  return (
    <>
      <button color="red">
        <div data-test-id="false number">
          0<div>{props.row}</div>
        </div>
        <div></div>
        "Test"
      </button>
    </>
  );
};

const root = document.getElementById("root");
if (root) render(<SimpleactJSXElement row="qwe" />, root);
