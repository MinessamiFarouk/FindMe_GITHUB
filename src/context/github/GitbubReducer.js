const GithubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payLoad,
        loading: false,
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payLoad,
        loading: false,
      };
    case "GET_REPOS":
      return {
        ...state,
        repos: action.payLoad,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
};

export default GithubReducer;
