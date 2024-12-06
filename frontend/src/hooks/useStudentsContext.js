import { StudentContext } from "../context/StudentContext";
import { useContext } from "react";

export const useStudentsContext = () => {
  const context = useContext(StudentContext);

  if (!context) {
    throw Error(
      "userComplaintContext must be used inside an ComplaintContextProvideer"
    );
  }

  return context;
};
