import "./PrimaryButton.css";
import propTypes from "prop-types";

export default function PrimaryButton({ children, onClickCallback }) {
  return (
    <button className="crab-primary-button" onClick={(e) => onClickCallback(e)}>
      {children}
    </button>
  );
}

PrimaryButton.defaultProps = {
  onClickCallback: undefined,
};

PrimaryButton.propTypes = {
  onClickCallback: propTypes.func,
};
