import SimpleactDOM from "../src/simpleact-dom/SimpleactDOM";

const SimpleactJSXElement = (
  <button color="red">
    <div data-test-id="false number">0</div>
    <div></div>
    "Test"
  </button>
)

console.log("[DEBUG]: ", SimpleactJSXElement);

const root = document.getElementById('root');
if (root) SimpleactDOM.render(SimpleactJSXElement, root);
