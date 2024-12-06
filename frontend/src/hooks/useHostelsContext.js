import { HostelContext } from "../context/HostelContext";
import { useContext } from "react";

export const useHostelsContext = () => {
  const context = useContext(HostelContext);

  if (!context) {
    throw Error(
      "userHostelContext must be used inside an HostelContextProvideer"
    );
  }

  return context;
};
