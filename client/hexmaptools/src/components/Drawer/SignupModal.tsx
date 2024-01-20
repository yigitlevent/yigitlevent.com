import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import { ValidateEmail, ValidatePassword, ValidateUsername } from "@utility/Validate";
import { useCallback, useState } from "react";

import { useUserStore } from "../../hooks/apiStores/useUserStore";


export function SignupModal({ open, close }: { open: boolean; close: () => void; }): JSX.Element {
	const { fetching, signup } = useUserStore();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");

	const [showPass, setShowPass] = useState(false);

	const [usernameError, setUsernameError] = useState<string | undefined>(undefined);
	const [emailError, setEmailError] = useState<string | undefined>(undefined);
	const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
	const [passwordRepeatError, setPasswordRepeatError] = useState<string | undefined>(undefined);

	const isFilled = [username, email, password, passwordRepeat].every(v => v.length > 0);
	const hasErrors = [usernameError, emailError, passwordError, passwordRepeatError].some(v => v !== undefined);

	const changeValue = useCallback((type: "username" | "email" | "password" | "passwordRepeat", value: string) => {
		const sanitizedValue = value.trim();
		if (type === "username") {
			setUsername(sanitizedValue);
			if (!ValidateUsername(sanitizedValue)) setUsernameError("Username must be between 4 and 64 characters.");
			else setUsernameError(undefined);
		}
		else if (type === "email") {
			setEmail(sanitizedValue);
			if (!ValidateEmail(sanitizedValue)) setEmailError("Please enter a valid email.");
			else setEmailError(undefined);
		}
		else if (type === "password") {
			setPassword(sanitizedValue);
			if (!ValidatePassword(sanitizedValue)) setPasswordError("Password must be between 8 and 64 characters, with at least one letter and one number.");
			else setPasswordError(undefined);
		}
		else if (type === "passwordRepeat") {
			setPasswordRepeat(sanitizedValue);
			if (password !== sanitizedValue) setPasswordRepeatError("Passwords don't match.");
			else setPasswordRepeatError(undefined);
		}
	}, [password]);

	const handleSignup = () => {
		if (username.length === 0) setUsernameError("Please enter an username.");
		if (email.length === 0) setEmailError("Please enter an email.");
		if (password.length === 0) setPasswordError("Please enter a password.");

		if (isFilled && !hasErrors) signup({ username, email, password }, () => close());
	};

	return (
		<Modal open={open} onClose={() => close()} sx={{ zIndex: 123456789 }}>
			<ModalDialog size="lg" variant="plain" sx={{ width: "400px" }}>
				<ModalClose />
				<Typography level="title-lg">Sign up</Typography>

				<FormControl error>
					<Input
						fullWidth
						placeholder="Username"
						value={username}
						onChange={(v) => changeValue("username", v.target.value)}
						error={Boolean(usernameError)}
					/>

					{usernameError
						&& <FormHelperText>
							<InfoOutlinedIcon />
							{usernameError}
						</FormHelperText>}
				</FormControl>

				<FormControl error>
					<Input
						fullWidth
						placeholder="Email"
						value={email}
						onChange={(v) => changeValue("email", v.target.value)}
						error={Boolean(emailError)}
					/>

					{emailError
						&& <FormHelperText>
							<InfoOutlinedIcon />
							{emailError}
						</FormHelperText>}
				</FormControl>

				<FormControl error>
					<Input
						fullWidth
						type={showPass ? "text" : "password"}
						placeholder="Password"
						value={password}
						onChange={(v) => changeValue("password", v.target.value)}
						error={Boolean(passwordError)}
						endDecorator={
							<IconButton onClick={() => setShowPass(v => !v)}>
								{showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
							</IconButton>
						}
					/>

					{passwordError
						&& <FormHelperText>
							<InfoOutlinedIcon />
							{passwordError}
						</FormHelperText>}
				</FormControl>

				<FormControl error>
					<Input
						fullWidth
						type={showPass ? "text" : "password"}
						placeholder="Password"
						value={passwordRepeat}
						onChange={(v) => changeValue("passwordRepeat", v.target.value)}
						error={Boolean(passwordRepeatError)}
					/>

					{passwordRepeatError
						&& <FormHelperText>
							<InfoOutlinedIcon />
							{passwordRepeatError}
						</FormHelperText>}
				</FormControl>

				<Button variant="outlined" fullWidth onClick={() => handleSignup()} disabled={!isFilled && (hasErrors || fetching)}>Sign up</Button>
			</ModalDialog>
		</Modal>
	);

}
