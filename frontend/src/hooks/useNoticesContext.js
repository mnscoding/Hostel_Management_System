import { NoticeContext } from "../context/NoticeContext";
import { useContext } from "react";

export const useNoticesContext = () => {
  const context = useContext(NoticeContext);

  if (!context) {
    throw Error(
      "userNoticeContext must be used inside an NoticeContextProvideer"
    );
  }

  return context;
};
