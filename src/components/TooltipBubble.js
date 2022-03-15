import { useEffect, useRef } from "react";
import "./TooltipBubble.css";

function TooltipBubble({ title, content, originPosition }) {
  const ref = useRef(null);
  useEffect(() => {}, []);

  return (
    <div ref={ref} className="tooltip-container">
      <h6>{title}</h6>
      <p>{content}</p>
    </div>
  );
}

export default TooltipBubble;
