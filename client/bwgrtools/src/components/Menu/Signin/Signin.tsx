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

import { useUserStore } from "../../../hooks/apiStores/useUserStore";
import { ValidateEmail } from "../../../../../../utility/src/Validate";
import { GenericGrid } from "../../Shared/Grids";


export function Signin({ open, handleClose }: { open: boolean; handleClose: (open: boolean) => void; }): JSX.Element {
	const { fetching, signin } = useUserStore();

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
			if (!ValidateEmail(sanitizedValue)) setEmailError("Please enter a valid email.");
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

		if (isFilled && !hasErrors) signin({ email, password }, handleClose);
	};

	return (
		<Modal open={open} onClose={handleClose} sx={{ zIndex: 123456789 }}>
			<Paper sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", maxWidth: "400px", margin: "6px", padding: 4 }}>
				<Typography variant="h3">Sign in</Typography>

				<GenericGrid columns={1} spacing={[3, 0]} center="c">
					<Grid item xs={1}>
						<TextField
							label="Email" variant="standard" fullWidth required
							value={email}
							onChange={v => changeValue("email", v.target.value)}
							error={emailError !== undefined}
							helperText={emailError}
						/>
					</Grid>

					<Grid item xs={1}>
						<FormControl variant="standard" fullWidth required>
							<InputLabel>Password</InputLabel>

							<Input
								type={showPass ? "text" : "password"}
								value={password} onChange={v => changeValue("password", v.target.value)}
								endAdornment={
									<InputAdornment position="end">
										<IconButton onClick={() => setShowPass(v => !v)}>
											{showPass ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>

							<FormHelperText error>{passwordError}</FormHelperText>
						</FormControl>
					</Grid>

					<Grid item>
						<Button variant="outlined" fullWidth onClick={() => handleSignin()} disabled={hasErrors || fetching}>Sign in</Button>
					</Grid>
				</GenericGrid>
			</Paper>
		</Modal>
	);
}
