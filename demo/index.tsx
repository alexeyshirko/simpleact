import { render } from "../src/simpleact-dom/SimpleactDOM";

const SimpleactJSXElement = (
  <>
    <button color="red">
      <div data-test-id="false number">
        0
        <div>1</div>
      </div>
      <div></div>
      "Test"
    </button>
  </>
)

console.log("[DEBUG]: ", SimpleactJSXElement);

const root = document.getElementById('root');
if (root) render(SimpleactJSXElement, root);
