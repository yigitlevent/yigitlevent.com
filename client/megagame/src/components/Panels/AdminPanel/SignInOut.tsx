import { Paper, Title, Stack, Button, TextInput, PasswordInput } from "@mantine/core";
import { ValidateEmail } from "@utility/Validate";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../../../hooks/useUserStore";


export function SignInOut(): React.JSX.Element {
	const { fetching, signin, signout, user } = useUserStore();

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showPass, setShowPass] = useState(false);

	const [emailError, setEmailError] = useState<string | undefined>(undefined);
	const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

	const isFilled = [email, password].every(v => v.length > 0);
	const hasErrors = [emailError, passwordError].some(v => v !== undefined);

	const changeValue = useCallback((type: "email" | "password", value: string) => {
		const sanitizedValue = value.trim();
		if (type === "email") {
			setEmail(sanitizedValue);
			if (!ValidateEmail(sanitizedValue)) setEmailError("Pclease enter a valid email.");
			else setEmailError(undefined);
		}
		else {
			setPassword(sanitizedValue);
		}
	}, []);

	const handleSignin = (): void => {
		if (email.length === 0) setEmailError("Please enter your email.");

		if (password.length === 0) setPasswordError("Please enter your password.");
		else setPasswordError(undefined);

		if (isFilled && !hasErrors) signin({ email, password }, () => void navigate("/"));
	};

	return (
		<Paper shadow="md" radius="xs" p="xl" bd="1px solid rgba(0,0,0,0.1)" mt="md">
			<Title order={2} mb="md">Sign in/out</Title>

			{user
				? <Stack>
					<Button
						variant="light"
						color="yellow"
						fullWidth
						onClick={() => {
							signout();
							void navigate("/");
						}}
					>
						Sign out
					</Button>
				</Stack>
				: <Stack>
					<TextInput
						label="Email"
						placeholder="Enter your email"
						required
						value={email}
						onChange={v => { changeValue("email", v.currentTarget.value); }}
						error={emailError}
					/>

					<PasswordInput
						label="Password"
						placeholder="Enter your password"
						required
						value={password}
						onChange={v => { changeValue("password", v.currentTarget.value); }}
						error={passwordError}
						visible={showPass}
						onVisibilityChange={setShowPass}
					/>

					<Button
						variant="outline"
						fullWidth
						onClick={handleSignin}
						disabled={hasErrors || fetching}
					>
						Sign in
					</Button>
				</Stack>}
		</Paper >
	);
}
