import { createContext, useReducer } from "react";
import GithubReducer from "./GitbubReducer";
const axios = require("axios").default;
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_API_URL;
// const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //get users
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await axios
      .get(`${GITHUB_URL}/search/users?${params}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    const { items } = await response;

    dispatch({
      type: "GET_USERS",
      payLoad: items,
    });
  };

  //get single user
  const getUser = async (login) => {
    setLoading();

    const response = await axios
      .get(`${GITHUB_URL}/users/${login}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    if (response.status === 404) {
      window.location = "/notfounde";
    } else {
      const data = await response;

      dispatch({
        type: "GET_USER",
        payLoad: data,
      });
    }
  };

  //get user repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sert: "Created",
      per_page: 10,
    });

    const response = await axios
      .get(`${GITHUB_URL}/users/${login}/repos?${params}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    const data = await response;

    dispatch({
      type: "GET_REPOS",
      payLoad: data,
    });
  };

  //Set Loading
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  //Clear User array from state
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
