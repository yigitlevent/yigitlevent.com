import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";

import { ValidateEmail, ValidatePassword, ValidateUsername } from "../../../../../../utility/src/Validate";
import { useUserStore } from "../../../hooks/apiStores/useUserStore";
import { GenericGrid } from "../../Shared/Grids";


export function Signup({ open, handleClose }: { open: boolean; handleClose: (open: boolean) => void; }): React.JSX.Element {
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
		else {
			setPasswordRepeat(sanitizedValue);
			if (password !== sanitizedValue) setPasswordRepeatError("Passwords don't match.");
			else setPasswordRepeatError(undefined);
		}
	}, [password]);

	const handleSignup = (): void => {
		if (username.length === 0) setUsernameError("Please enter an username.");
		if (email.length === 0) setEmailError("Please enter an email.");
		if (password.length === 0) setPasswordError("Please enter a password.");

		if (isFilled && !hasErrors) signup({ username, email, password }, handleClose);
	};

	return (
		<Modal open={open} onClose={handleClose} sx={{ zIndex: 123456789 }}>
			<Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "400px", margin: "6px", padding: 4 }}>
				<Typography variant="h3">Sign up</Typography>

				<GenericGrid columns={1} spacing={[3, 0]} center="c">
					<Grid size={{ xs: 1 }}>
						<TextField
							label="Username"
							variant="standard"
							fullWidth
							required
							value={username}
							onChange={v => { changeValue("username", v.target.value); }}
							error={usernameError !== undefined}
							helperText={usernameError}
						/>
					</Grid>

					<Grid size={{ xs: 1 }}>
						<TextField
							label="Email"
							variant="standard"
							fullWidth
							required
							value={email}
							onChange={v => { changeValue("email", v.target.value); }}
							error={emailError !== undefined}
							helperText={emailError}
						/>
					</Grid>

					<Grid size={{ xs: 1 }}>
						<FormControl variant="standard" fullWidth required>
							<InputLabel>Password</InputLabel>

							<Input
								type={showPass ? "text" : "password"}
								value={password}
								onChange={v => { changeValue("password", v.target.value); }}
								error={passwordError !== undefined}
								endAdornment={(
									<InputAdornment position="end">
										<IconButton onClick={() => { setShowPass(v => !v); }}>
											{showPass ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								)}
							/>

							<FormHelperText error>{passwordError}</FormHelperText>
						</FormControl>
					</Grid>

					<Grid size={{ xs: 1 }}>
						<TextField
							label="Password Repeat"
							variant="standard"
							fullWidth
							required
							value={passwordRepeat}
							onChange={v => { changeValue("passwordRepeat", v.target.value); }}
							type={showPass ? "text" : "password"}
							error={passwordRepeatError !== undefined}
							helperText={passwordRepeatError}
						/>
					</Grid>

					<Grid>
						<Button variant="outlined" onClick={() => { handleSignup(); }} disabled={!isFilled || hasErrors || fetching}>Sign up</Button>
					</Grid>
				</GenericGrid>
			</Paper>
		</Modal>
	);
}
