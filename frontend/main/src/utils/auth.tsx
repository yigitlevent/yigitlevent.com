import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";


export interface AuthContextType {
	user: any;
	signin: (user: string, callback: VoidFunction) => void;
	signout: (callback: VoidFunction) => void;
}

export const FakeAuthProvider = {
	isAuthenticated: false,
	signin(callback: VoidFunction) {
		FakeAuthProvider.isAuthenticated = true;
		setTimeout(callback, 100); // fake async
	},
	signout(callback: VoidFunction) {
		FakeAuthProvider.isAuthenticated = false;
		setTimeout(callback, 100);
	}
};

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode; }) {
	const [user, setUser] = useState<any>(null);

	const signin = (newUser: string, callback: VoidFunction) => {
		return FakeAuthProvider.signin(() => {
			setUser(newUser);
			callback();
		});
	};

	const signout = (callback: VoidFunction) => {
		return FakeAuthProvider.signout(() => {
			setUser(null);
			callback();
		});
	};

	const value = { user, signin, signout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }: { children: JSX.Element; }) {
	const auth = useContext(AuthContext);
	const location = useLocation();
	if (!auth.user) return <Navigate to="/signin" state={{ from: location }} replace />;
	return children;
}
