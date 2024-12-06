import { createContext, useReducer } from "react";

export const ApplyContext = createContext();

export const appliesReducer = (state, action) => {
  switch (action.type) {
    case "SET_APPLIES":
      return {
        applies: action.payload,
      };
    case "CREATE_APPLY":
      return {
        applies: [action.payload, ...state.applies],
      };
    default:
      return state;
  }
};

export const ApplyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appliesReducer, {
    applies: null,
  });

  return (
    <ApplyContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ApplyContext.Provider>
  );
};
