import { useEffect } from "react";
import { useLocation } from "react-router";

//restore scroll on top after route change

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
