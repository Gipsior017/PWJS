import { useLayoutEffect, useRef, useState } from "react";

export default function LayoutEffectExample() {
  const boxRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (boxRef.current) {
      setHeight(boxRef.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <div>
      <div ref={boxRef} style={{ padding: "50px", background: "#ddd" }}>
        Mierzę swoją wysokość!
      </div>
      <p>Wysokość: {height}px</p>
    </div>
  );
}
