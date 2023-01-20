import { NavigateFunction } from "react-router-dom";
import produce from "immer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GenericPost } from "./_genericRequests";


interface UserState {
	user: User | undefined;
	fetching: boolean;
	setUser: (user: User | undefined) => void;
	toggleFetching: () => void;
	auth: (navigate: NavigateFunction) => void;
	signup: (formData: SignupForm, handleClose: (open: boolean) => void) => void;
	signin: (formData: SigninForm, navigate: NavigateFunction, handleClose: (open: boolean) => void) => void;
	signout: (navigate: NavigateFunction) => void;
}


export const useUserStore = create<UserState>()(
	devtools(
		(set, get) => ({
			user: undefined,
			fetching: false,

			setUser: (user: User | undefined) => {
				set(produce<UserState>((state) => { state.user = user; }));
			},

			toggleFetching: () => {
				set(produce<UserState>((state) => { state.fetching = !state.fetching; }));
			},

			auth: (navigate: NavigateFunction) => {
				const setUser = get().setUser;
				const toggleFetching = get().toggleFetching;

				toggleFetching();

				GenericPost<User>("/user/auth", null)
					.then(response => {
						if (response.status === 200) setUser({ ...response.data });
						else throw new Error();
					})
					.catch(reason => {
						setUser(undefined);
						console.error(reason);
						navigate("/");
					})
					.finally(() => toggleFetching());
			},

			signup: (formData: SignupForm, handleClose: (open: boolean) => void) => {
				const setUser = get().setUser;
				const toggleFetching = get().toggleFetching;

				toggleFetching();

				GenericPost<User>("/user/signup", formData)
					.then(response => {
						if (response.status === 200) {
							setUser({ ...response.data });
							handleClose(true);
						}
						else throw new Error();
					})
					.catch(reason => {
						console.error(reason);
					})
					.finally(() => toggleFetching());
			},

			signin: (formData: SigninForm, navigate: NavigateFunction, handleClose: (open: boolean) => void) => {
				const setUser = get().setUser;
				const toggleFetching = get().toggleFetching;

				toggleFetching();

				GenericPost<User>("/user/signin", formData)
					.then(response => {
						if (response.status === 200) {
							setUser({ ...response.data });
							handleClose(true);
						}
						else throw new Error();
					})
					.catch(reason => {
						console.error(reason);
						navigate("/");
					})
					.finally(() => toggleFetching());
			},

			signout: (navigate: NavigateFunction) => {
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
						navigate("/");
					})
					.finally(() => toggleFetching());
			}
		})
	)
);
