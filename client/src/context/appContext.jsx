import { useReducer, createContext, useContext } from "react";
import reducer from "./reducer";
import {
  SET_USER,
  LOGOUT_USER,
  SET_JOB_TO_BE_UPDATED,
  SET_ARTICLE_TO_BE_UPDATED,
  HANDLE_UPDATE_JOB_INPUT,
} from "./actions";

const initialState = {
  user: JSON.parse(localStorage.getItem("user-hiring-fast")) || null,
  articleToBeUpdated: null,
  jobToBeUpdated: null,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = (user) => {
    dispatch({ type: SET_USER, payload: { user } });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
  };

  const setJobToBeUpdated = (job) => {
    dispatch({ type: SET_JOB_TO_BE_UPDATED, payload: { job } });
  };

  const setArticleToBeUpdated = (article) => {
    dispatch({ type: SET_ARTICLE_TO_BE_UPDATED, payload: { article } });
  };

  const handleUpdateJobInput = (e) => {
    dispatch({
      type: HANDLE_UPDATE_JOB_INPUT,
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setUser,
        logoutUser,
        setJobToBeUpdated,
        setArticleToBeUpdated,
        handleUpdateJobInput,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

export default AppProvider;
