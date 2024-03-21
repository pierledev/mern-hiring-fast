import {
  SET_USER,
  LOGOUT_USER,
  SET_JOB_TO_BE_UPDATED,
  SET_ARTICLE_TO_BE_UPDATED,
  HANDLE_UPDATE_JOB_INPUT,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_USER) {
    localStorage.setItem(
      "user-hiring-fast",
      JSON.stringify(action.payload.user),
    );

    return { ...state, user: action.payload.user };
  }

  if (action.type === LOGOUT_USER) {
    localStorage.removeItem("user-hiring-fast");

    return {
      ...state,
      user: null,
      jobToBeUpdated: null,
      articleToBeUpdated: null,
    };
  }

  if (action.type === SET_JOB_TO_BE_UPDATED) {
    return { ...state, jobToBeUpdated: action.payload.job };
  }

  if (action.type === SET_ARTICLE_TO_BE_UPDATED) {
    return { ...state, articleToBeUpdated: action.payload.article };
  }

  if (action.type === HANDLE_UPDATE_JOB_INPUT) {
    return {
      ...state,
      jobToBeUpdated: {
        ...state.jobToBeUpdated,
        [action.payload.name]: action.payload.value,
      },
    };
  }

  return state;
};

export default reducer;
