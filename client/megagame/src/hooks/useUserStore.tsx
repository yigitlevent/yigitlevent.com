import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { GenericPost } from "../utils/GenericRequests";


interface UserState {
	fetching: boolean;
	triedAuth: boolean;

	user: UserSession | undefined;
	setUser: (user: UserSession | undefined) => void;
	toggleFetching: () => void;
	setTriedAuth: (value: boolean) => void;
	hasAccess: (userAccess: UserAccess) => boolean;

	auth: () => void;
	signup: (formData: UserSignupRequest, handleClose: (open: boolean) => void) => void;
	signin: (formData: UserSigninRequest, onSuccess: () => void) => void;
	signout: () => void;
}

export const useUserStore = create<UserState>()(
	devtools(
		(set, get) => ({
			fetching: false,
			triedAuth: false,

			user: undefined,
			setUser: (user: UserSession | undefined) => { set(produce<UserState>(state => { state.user = user; })); },
			toggleFetching: () => { set(produce<UserState>(state => { state.fetching = !state.fetching; })); },
			setTriedAuth: (value: boolean) => { set(produce<UserState>(state => { state.triedAuth = value; })); },
			hasAccess: (userAccess: UserAccess): boolean => { return get().user?.userAccess.includes(userAccess) ?? false; },

			auth: () => {
				const state = get();

				state.toggleFetching();

				GenericPost<UserResponse>("/user/auth", null)
					.then(response => { state.setUser({ ...response.data.user }); })
					.catch(() => { state.setUser(undefined); })
					.finally(() => { state.toggleFetching(); });
			},

			signup: (formData: UserSignupRequest, handleClose: (open: boolean) => void) => {
				const state = get();

				state.toggleFetching();

				GenericPost<UserResponse>("/user/signup", formData)
					.then(response => {
						state.setUser({ ...response.data.user });
						handleClose(true);
					})
					.catch(console.error)
					.finally(() => { state.toggleFetching(); });
			},

			signin: (formData: UserSigninRequest, onSuccess: () => void) => {
				const state = get();

				state.toggleFetching();

				GenericPost<UserResponse>("/user/signin", formData)
					.then(response => {
						state.setUser({ ...response.data.user });
						onSuccess();
					})
					.catch(console.error)
					.finally(() => { state.toggleFetching(); });
			},

			signout: () => {
				const state = get();

				state.toggleFetching();

				GenericPost("/user/signout", null)
					.then(() => { state.setUser(undefined); })
					.catch(console.error)
					.finally(() => { state.toggleFetching(); });
			}
		}),
		{
			name: "useUserStore"
		}
	)
);
