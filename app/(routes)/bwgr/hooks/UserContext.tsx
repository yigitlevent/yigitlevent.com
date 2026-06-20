"use client";

/* eslint-disable react-refresh/only-export-components */

import { useCallback, useContext, useEffect, useReducer, createContext } from "react";

import { GenericPost } from "../utils/GenericRequests";

import type { UserSigninRequest, UserSignupRequest } from "@/types/api/request";
import type { User } from "@/types/user/user";
import type { JSX, ReactNode } from "react";


type UserSession = User;

interface UserResponseLocal {
  user: UserSession;
}

interface UserContextType {
  user: UserSession | undefined;
  fetching: boolean;
  triedAuth: boolean;
  setUser: (user: UserSession | undefined) => void;
  toggleFetching: () => void;
  auth: () => void;
  signup: (formData: UserSignupRequest, handleClose: (open: boolean) => void) => void;
  signin: (formData: UserSigninRequest, handleClose: (open: boolean) => void) => void;
  signout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserState {
  user: UserSession | undefined;
  fetching: boolean;
  triedAuth: boolean;
}

type UserAction =
  | { type: "SET_USER"; payload: UserSession | undefined; }
  | { type: "TOGGLE_FETCHING"; }
  | { type: "SET_TRIED_AUTH"; };

const InitialState: UserState = {
  user: undefined,
  fetching: false,
  triedAuth: false
};

function UserReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "TOGGLE_FETCHING":
      return { ...state, fetching: !state.fetching };
    case "SET_TRIED_AUTH":
      return { ...state, triedAuth: true };
    default:
      return state;
  }
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(UserReducer, InitialState);

  const setUser = useCallback((user: UserSession | undefined) => {
    dispatch({ type: "SET_USER", payload: user });
  }, []);

  const toggleFetching = useCallback(() => {
    dispatch({ type: "TOGGLE_FETCHING" });
  }, []);

  const auth = useCallback(() => {
    if (!state.triedAuth) {
      dispatch({ type: "SET_TRIED_AUTH" });
      toggleFetching();

      GenericPost<UserResponseLocal>("/api/user/auth", null)
        .then(response => {
          setUser({ ...response.data.user });
        })
        .catch(() => {
          setUser(undefined);
        })
        .finally(() => {
          toggleFetching();
        });
    }
  }, [state.triedAuth, setUser, toggleFetching]);

  const signup = useCallback(
    (formData: UserSignupRequest, handleClose: (open: boolean) => void) => {
      toggleFetching();

      GenericPost<UserResponseLocal>("/api/user/signup", formData)
        .then(response => {
          setUser({ ...response.data.user });
          handleClose(true);
        })
        .catch((reason: unknown) => {
          console.error(reason);
        })
        .finally(() => {
          toggleFetching();
        });
    },
    [setUser, toggleFetching]
  );

  const signin = useCallback(
    (formData: UserSigninRequest, handleClose: (open: boolean) => void) => {
      toggleFetching();

      GenericPost<UserResponseLocal>("/api/user/signin", formData)
        .then(response => {
          setUser({ ...response.data.user });
          handleClose(true);
        })
        .catch((reason: unknown) => {
          console.error(reason);
        })
        .finally(() => {
          toggleFetching();
        });
    },
    [setUser, toggleFetching]
  );

  const signout = useCallback(() => {
    toggleFetching();

    GenericPost("/api/user/signout", null)
      .then(() => {
        setUser(undefined);
      })
      .catch((reason: unknown) => {
        console.error(reason);
      })
      .finally(() => {
        toggleFetching();
      });
  }, [setUser, toggleFetching]);

  useEffect(() => {
    auth();
  }, [auth]);

  const value: UserContextType = {
    ...state,
    setUser,
    toggleFetching,
    auth,
    signup,
    signin,
    signout
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return context;
}
