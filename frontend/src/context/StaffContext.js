import { createContext, useReducer } from "react";

export const StaffContext = createContext();

export const staffsReducer = (state, action) => {
  switch (action.type) {
    case "SET_STAFFS":
      return {
        staffs: action.payload,
      };
    case "CREATE_STAFF":
      return {
        staffs: [action.payload, ...state.staffs],
      };
    case "DELETE_STAFF":
      return {
        staffs: state.staffs.filter((n) => n._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const StaffContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(staffsReducer, {
    staffs: [],
  });

  return (
    <StaffContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StaffContext.Provider>
  );
};
