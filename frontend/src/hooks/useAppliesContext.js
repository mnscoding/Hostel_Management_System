import { ApplyContext } from "../context/ApplyContext";
import { useContext } from "react";

export const useAppliesContext = () => {
  const context = useContext(ApplyContext);

  if (!context) {
    throw Error(
      "userApplyContext must be used inside an ApplyContextProvideer"
    );
  }

  return context;
};
