import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";


export function Skills(): JSX.Element {
	const skills = [
		{ name: "js/ts", things: ["frontend, desktop apps, backend", "react, redux, zustand, immer, electron, axios, and more"] },
		{ name: "f#", things: ["simulations, data analysis", "fsharp.data, fsharp.stats, plotly.net, ml.net, and more"] },
		{ name: "python", things: ["data analysis", "plotly, scipy, pandas, apache spark, and more"] },
		{ name: "c++", things: ["game development", "usually with custom game engines"] },
		{ name: "sql", things: ["postgresql"] },
		{ name: "nosql", things: ["mongodb"] }
	];

	return (
		<Fragment>
			<Typography variant="h6">skills</Typography>

			{skills.map((x, i) => (
				<Box key={i} sx={{ margin: "10px 0", padding: "0 0 0 10px", borderLeft: "1px solid grey" }}>
					<Typography>{x.name}</Typography>

					{x.things.map((y, ii) =>
						<Typography key={ii} variant="body2" sx={{ padding: "0 0 0 10px" }}>{y}</Typography>
					)}
				</Box>
			)
			)}
		</Fragment>
	);
}
