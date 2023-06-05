import { useState } from "react";
import { Button } from "react-bootstrap";

function App() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <>
      <h1>React Template</h1>
      <Button onClick={() => setClickCount((c) => c + 1)}>
        Clicked {clickCount} times
      </Button>
    </>
  );
}

export default App;
