import { render } from "../src/simpleact-dom/SimpleactDOM";
import { useState } from "../src/simpleact/Simpleact";

const SimpleactJSXElement = () => {
  const fetchTitle = "Seconds: ";

  return <ButtonWithText title={fetchTitle} />;
};

const ButtonWithText = ({ title }: { title: string }) => {
  const [seconds, setSeconds] = useState(0);
  if (seconds === 0) setInterval(() => setSeconds((s) => s + 1), 1000);

  return (
    <b data-test-id={seconds}>
      {title}
      {seconds}
    </b>
  );
};

const root = document.getElementById("root");
if (root) render(<SimpleactJSXElement />, root);
