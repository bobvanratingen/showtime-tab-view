import React, { useContext } from "react";
export const HeaderTabContext = /*#__PURE__*/React.createContext(null);
export const useHeaderTabContext = () => {
  const ctx = useContext(HeaderTabContext);
  if (!ctx) throw new Error("HeaderTabContext not found");
  return ctx;
};
//# sourceMappingURL=context.js.map