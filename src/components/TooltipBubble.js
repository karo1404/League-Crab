import { useEffect, useRef, useState } from "react";
import "./TooltipBubble.css";
import propTypes from "prop-types";
import useWindowSize from "../hooks/useWindowSize";

function TooltipBubble({ title, content, originPosition }) {
  const divRef = useRef(null);
  const windowSize = useWindowSize();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const position = {
      x: divRef.current.offsetLeft,
      y: divRef.current.offsetTop,
    };
    const dimensions = {
      width: divRef.current.offsetWidth,
      height: divRef.current.offsetHeight,
    };
    if (position.x + dimensions.width > windowSize.width) {
      divRef.current.style.left = `${
        position.x - Math.abs(position.x + dimensions.width - windowSize.width)
      }px`;
    }
    if (position.y + dimensions.height > windowSize.width) {
      divRef.current.style.top = `${
        position.y -
        Math.abs(position.y + dimensions.height - windowSize.height)
      }px`;
    }
    setIsReady(true);
  }, [windowSize]);

  return (
    <div ref={divRef} className="tooltip-container" hidden={!isReady}>
      <h6>{title}</h6>
      <p>{content}</p>
    </div>
  );
}

TooltipBubble.propTypes = {
  title: propTypes.string,
  content: propTypes.string,
};

TooltipBubble.defaultProps = {
  title: "",
  content: "",
};

export default TooltipBubble;
