import { produce } from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { GenericPost } from "../utils/GenericRequests";


interface UserState {
	fetching: boolean;

	user: UserSession | undefined;
	setUser: (user: UserSession | undefined) => void;
	hasAccess: (userAccess: UserAccess) => boolean;

	toggleFetching: () => void;
	auth: () => void;
	signup: (formData: UserSignupRequest, handleClose: (open: boolean) => void) => void;
	signin: (formData: UserSigninRequest, onSuccess: () => void) => void;
	signout: () => void;
}

export const useUserStore = create<UserState>()(
	devtools(
		(set, get) => ({
			fetching: false,

			user: undefined,
			setUser: (user: UserSession | undefined) => {
				set(produce<UserState>((state) => { state.user = user; }));
			},
			hasAccess: (userAccess: UserAccess): boolean => {
				return get().user?.userAccess.includes(userAccess) || false;
			},

			toggleFetching: () => {
				set(produce<UserState>((state) => { state.fetching = !state.fetching; }));
			},

			auth: () => {
				const state = get();

				state.toggleFetching();

				GenericPost<UserResponse>("/user/auth", null)
					.then(response => {
						if (response.status === 200) state.setUser({ ...response.data.user });
						else throw new Error();
					})
					.catch(() => state.setUser(undefined))
					.finally(() => state.toggleFetching());
			},

			signup: (formData: UserSignupRequest, handleClose: (open: boolean) => void) => {
				const state = get();

				state.toggleFetching();

				GenericPost<UserResponse>("/user/signup", formData)
					.then(response => {
						if (response.status === 200) {
							state.setUser({ ...response.data.user });
							handleClose(true);
						}
						else throw new Error();
					})
					.catch(console.error)
					.finally(() => state.toggleFetching());
			},

			signin: (formData: UserSigninRequest, onSuccess: () => void) => {
				const state = get();

				state.toggleFetching();

				GenericPost<UserResponse>("/user/signin", formData)
					.then(response => {
						if (response.status === 200) {
							state.setUser({ ...response.data.user });
							onSuccess();
						}
						else throw new Error();
					})
					.catch(console.error)
					.finally(() => state.toggleFetching());
			},

			signout: () => {
				const state = get();

				state.toggleFetching();

				GenericPost("/user/signout", null)
					.then(response => {
						if (response.status === 200) state.setUser(undefined);
						else throw new Error();
					})
					.catch(console.error)
					.finally(() => state.toggleFetching());
			}
		}),
		{
			name: "useUserStore"
		}
	)
);
