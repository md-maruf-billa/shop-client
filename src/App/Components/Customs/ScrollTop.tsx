import { useEffect } from "react";
import { useLocation } from "react-router";
const ScrollToTop = ({ isRefresh }: { isRefresh?: boolean }) => {
      const { pathname } = useLocation();

      useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
      }, [pathname, isRefresh]);

      return null;
};

export default ScrollToTop;
