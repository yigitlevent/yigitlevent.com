import { Paper, Title, Stack, TextInput, PasswordInput, Button } from "@mantine/core";
import { Fragment, useCallback, useState } from "react";
import { useNavigate } from "react-router";

import { ValidateEmail } from "../../../../../utility/src/Validate";
import { useMegagameStore } from "../../hooks/useMegagameStore";
import { useUserStore } from "../../hooks/useUserStore";


function SignInOut(): React.JSX.Element {
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
			<Title order={3} mb="md">Sign in/out</Title>

			{user
				? <Stack>
					<Button
						variant="light"
						color="yellow"
						fullWidth
						onClick={() => {
							signout();
							navigate("/");
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
				</Stack>}
		</Paper >
	);
}

function AdminActions(): React.JSX.Element {
	const { megagame, resetMegagame, createDeadlineItem } = useMegagameStore();
	const navigate = useNavigate();

	if (!megagame) return <Fragment />;

	return (
		<Paper
			shadow="xl"
			radius="md"
			p="xl"
			style={{ maxWidth: 400, margin: "6px", position: "relative" }}
		>
			<Title order={3} mb="md">Actions</Title>

			<Button
				variant="light"
				color="yellow"
				fullWidth
				mb="md"
				onClick={() => {
					// confirm dialog
					if (window.confirm("Are you sure you want to reset the megagame? This action cannot be undone.")) {
						resetMegagame({ megagameId: megagame.id });
					}
				}}
			>
				Reset Megagame
			</Button>

			<Button
				variant="light"
				color="yellow"
				fullWidth
				mb="md"
				onClick={() => {
					if (window.confirm("Are you sure you want to add a law deadline? This action cannot be undone.")) {
						createDeadlineItem({
							megagameId: megagame.id,
							type: "Law Proposal",
							deadline: new Date(Date.now() + 25 * 60 * 1000).toISOString()
						});
					}
				}}
			>
				Add Law Deadline
			</Button>

			<Button
				variant="light"
				color="red"
				fullWidth
				onClick={() => navigate("/")}
			>
				Go Back
			</Button>
		</Paper>
	);
}

export function AdminPanel(): React.JSX.Element {
	const { user } = useUserStore();

	return (
		<Fragment>
			{user ? <AdminActions /> : null}
			<SignInOut />
		</Fragment>
	);
}
