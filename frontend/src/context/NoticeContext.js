import { createContext, useReducer } from "react";

export const NoticeContext = createContext();

export const noticesReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTICES":
      return {
        notices: action.payload,
      };
    case "CREATE_NOTICE":
      return {
        notices: [action.payload, ...state.notices],
      };
    case "DELETE_NOTICE":
      return {
        notices: state.notices.filter((n) => n._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const NoticeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noticesReducer, {
    notices: [],
  });

  return (
    <NoticeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NoticeContext.Provider>
  );
};
