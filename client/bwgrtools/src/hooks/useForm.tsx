import { useCallback, useEffect, useState } from "react";
import produce from "immer";

import { TextField } from "@mui/material";


interface Field {
	label: string;
	type: "Text";
}

interface Values {
	[key: string]: string | number | boolean;
}

export function useForm({ fields }: { fields: Field[]; }) {
	const [components, setComponents] = useState<JSX.Element[]>([]);
	const [values, setValues] = useState<Values>({});

	const changeValue = useCallback((key: string, value: string | number | boolean) => {
		setValues(produce(values, draft => { draft[key] = value; }));
	}, [values]);

	const createComponent = useCallback((field: Field) => {
		return (
			<TextField
				label={field.label} value={values[field.label]}
				onChange={v => changeValue(field.label, v.target.value)}
				variant="standard" fullWidth required
			/>
		);
	}, [changeValue, values]);

	useEffect(() => {
		if (components.length === 0) {
			console.log("should be called only once");
			setComponents(fields.map(createComponent));
		}
	}, [components.length, createComponent, fields]);

	return { components, values };
}
