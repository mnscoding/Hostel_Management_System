import { StaffContext } from "../context/StaffContext";
import { useContext } from "react";

export const useStaffsContext = () => {
  const context = useContext(StaffContext);

  if (!context) {
    throw Error(
      "userHostelContext must be used inside an StaffContextProvideer"
    );
  }

  return context;
};
