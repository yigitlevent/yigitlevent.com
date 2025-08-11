import { TextInput } from "@mantine/core";
import { produce } from "immer";
import { useCallback, useEffect, useState } from "react";


interface Field {
	label: string;
	type: "Text";
}

interface Values {
	[key: string]: string | number;
}

interface UseFormReturn {
	components: JSX.Element[];
	values: Values;
}

export function useForm({ fields }: { fields: Field[]; }): UseFormReturn {
	const [components, setComponents] = useState<JSX.Element[]>([]);
	const [values, setValues] = useState<Values>({});

	const changeValue = useCallback((key: string, value: string | number) => {
		setValues(produce(values, draft => { draft[key] = value; }));
	}, [values]);

	const createComponent = useCallback((field: Field) => {
		return (
			<TextInput
				label={field.label} value={values[field.label]}
				onChange={v => changeValue(field.label, v.target.value)}
				variant="standard" required
			/>
		);
	}, [changeValue, values]);

	useEffect(() => {
		if (components.length === 0) {
			setComponents(fields.map(createComponent));
		}
	}, [components.length, createComponent, fields]);

	return { components, values };
}
