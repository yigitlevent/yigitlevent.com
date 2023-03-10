import produce from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { GenericPost } from "../stores/_genericRequests";


interface UserState {
	user: UserSession | undefined;
	fetching: boolean;
	setUser: (user: UserSession | undefined) => void;
	toggleFetching: () => void;
	auth: () => void;
	signup: (formData: UserSignupRequest, handleClose: (open: boolean) => void) => void;
	signin: (formData: UserSigninRequest, handleClose: (open: boolean) => void) => void;
	signout: () => void;
}


export const useUserStore = create<UserState>()(
	devtools(
		(set, get) => ({
			user: undefined,
			fetching: false,

			setUser: (user: UserSession | undefined) => {
				set(produce<UserState>((state) => { state.user = user; }));
			},

			toggleFetching: () => {
				set(produce<UserState>((state) => { state.fetching = !state.fetching; }));
			},

			auth: () => {
				const setUser = get().setUser;
				const toggleFetching = get().toggleFetching;

				toggleFetching();

				GenericPost<UserResponse>("/user/auth", null)
					.then(response => {
						if (response.status === 200) setUser({ ...response.data.user });
						else throw new Error();
					})
					.catch(reason => {
						setUser(undefined);
						console.error(reason);
					})
					.finally(() => toggleFetching());
			},

			signup: (formData: UserSignupRequest, handleClose: (open: boolean) => void) => {
				const setUser = get().setUser;
				const toggleFetching = get().toggleFetching;

				toggleFetching();

				GenericPost<UserResponse>("/user/signup", formData)
					.then(response => {
						if (response.status === 200) {
							setUser({ ...response.data.user });
							handleClose(true);
						}
						else throw new Error();
					})
					.catch(reason => {
						console.error(reason);
					})
					.finally(() => toggleFetching());
			},

			signin: (formData: UserSigninRequest, handleClose: (open: boolean) => void) => {
				const setUser = get().setUser;
				const toggleFetching = get().toggleFetching;

				toggleFetching();

				GenericPost<UserResponse>("/user/signin", formData)
					.then(response => {
						if (response.status === 200) {
							setUser({ ...response.data.user });
							handleClose(true);
						}
						else throw new Error();
					})
					.catch(reason => {
						console.error(reason);
					})
					.finally(() => toggleFetching());
			},

			signout: () => {
				const setUser = get().setUser;
				const toggleFetching = get().toggleFetching;

				toggleFetching();

				GenericPost("/user/signout", null)
					.then(response => {
						if (response.status === 200) setUser(undefined);
						else throw new Error();
					})
					.catch(reason => {
						console.error(reason);
					})
					.finally(() => toggleFetching());
			}
		})
	)
);
