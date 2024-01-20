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
import { ValidateEmail } from "@utility/Validate";
import { useCallback, useState } from "react";

import { useUserStore } from "../../hooks/apiStores/useUserStore";


export function SigninModal({ open, close }: { open: boolean; close: () => void; }): JSX.Element {
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
		else setEmailError(undefined);

		if (password.length === 0) setPasswordError("Please enter your password.");
		else setPasswordError(undefined);

		if (isFilled && !hasErrors) signin({ email, password }, () => close());
	};

	return (
		<Modal open={open} onClose={() => close()} sx={{ zIndex: 123456789 }}>
			<ModalDialog size="lg" variant="plain" sx={{ width: "400px" }}>
				<ModalClose />
				<Typography level="title-lg">Sign in</Typography>

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

				<Button variant="outlined" fullWidth onClick={() => handleSignin()} disabled={!isFilled && (hasErrors || fetching)}>Sign in</Button>
			</ModalDialog>
		</Modal>
	);
}
