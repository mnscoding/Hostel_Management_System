import { createContext, useReducer } from "react";

export const HostelContext = createContext();

export const hostelsReducer = (state, action) => {
  switch (action.type) {
    case "SET_HOSTELS":
      return {
        hostels: action.payload,
      };
    case "CREATE_HOSTEL":
      return {
        hostels: [action.payload, ...state.hostels],
      };
    case "DELETE_HOSTEL":
      return {
        hostels: state.hostels.filter((n) => n._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const HostelContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hostelsReducer, {
    hostels: [],
  });

  return (
    <HostelContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HostelContext.Provider>
  );
};
