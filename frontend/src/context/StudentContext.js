import { createContext, useReducer } from "react";

export const StudentContext = createContext();

export const studentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        students: action.payload,
      };
    case "CREATE_STUDENT":
      return {
        students: [action.payload, ...state.students],
      };
    default:
      return state;
  }
};

export const StudentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentsReducer, {
    students: null,
  });

  return (
    <StudentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
};
