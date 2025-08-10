import { Paper, Title, Stack, TextInput, PasswordInput, Button } from "@mantine/core";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

import { ValidateEmail } from "../../../../utility/src/Validate";
import { useUserStore } from "../hooks/apiStores/useUserStore";


export function Login(): JSX.Element {
	const { fetching, signin } = useUserStore();

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
		else if (type === "password") {
			setPassword(sanitizedValue);
		}
	}, []);

	const handleSignin = () => {
		if (email.length === 0) setEmailError("Please enter your email.");

		if (password.length === 0) setPasswordError("Please enter your password.");
		else setPasswordError(undefined);

		if (isFilled && !hasErrors) signin({ email, password }, () => navigate("/"));
	};

	return (
		<Paper
			shadow="xl"
			radius="md"
			p="xl"
			style={{ maxWidth: 400, margin: "6px", position: "relative" }}
		>
			<Title order={3} mb="md">Sign in</Title>

			<Stack>
				<TextInput
					label="Email"
					placeholder="Enter your email"
					required
					value={email}
					onChange={v => changeValue("email", v.currentTarget.value)}
					error={emailError}
				/>

				<PasswordInput
					label="Password"
					placeholder="Enter your password"
					required
					value={password}
					onChange={v => changeValue("password", v.currentTarget.value)}
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
			</Stack>
		</Paper>
	);
}
