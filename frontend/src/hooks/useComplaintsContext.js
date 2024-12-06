import { ComplaintContext } from "../context/ComplaintContext";
import { useContext } from "react";

export const useComplaintsContext = () => {
  const context = useContext(ComplaintContext);

  if (!context) {
    throw Error(
      "userComplaintContext must be used inside an ComplaintContextProvideer"
    );
  }

  return context;
};
