import { createContext, useReducer } from "react";

export const ComplaintContext = createContext();

export const complaintsReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMPLAINTS":
      return {
        complaints: action.payload,
      };
    case "CREATE_COMPLAINT":
      return {
        complaints: [action.payload, ...state.complaints],
      };
    default:
      return state;
  }
};

export const ComplaintContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(complaintsReducer, {
    complaints: null,
  });

  return (
    <ComplaintContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ComplaintContext.Provider>
  );
};
