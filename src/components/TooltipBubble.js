import "./TooltipBubble.css";

function TooltipBubble({ content, originPosition }) {
  return (
    <div className="tooltip-container">
      <p>{content}</p>
    </div>
  );
}

export default TooltipBubble;
