import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";


export function DiceRollerProbabilities({ probabilities, isDoubleObstacle, obstacle }: { probabilities: number[]; isDoubleObstacle: boolean; obstacle: number; }): JSX.Element {
	return (
		<Fragment>
			<Divider sx={{ margin: "10px 0 0 " }}>Probabilities</Divider>

			<Grid item xs={3} sm={3}>
				<Grid container columns={20} direction="row" flexWrap="wrap" sx={{ padding: "0" }}>
					{<Fragment>
						{Array.from(Array(20)).map((_, obIndex) => {
							const probability = probabilities.at(obIndex);

							return (
								<Grid
									item
									key={obIndex} xs={5} sm={4} md={2} lg={1}
									sx={{
										width: "100%",
										padding: "4px 4px",
										margin: "8px 0"
									}}
								>
									<Card
										sx={{
											width: "100%",
											padding: "4px",
											background: `hsl(0, 0%, ${probability === undefined ? 0 : probability * 50}%)`,
											textAlign: "center",
											border: (obIndex + 1) === (isDoubleObstacle ? obstacle * 2 : obstacle) ? "1px solid white" : "1px solid transparent"
										}}
									>
										<Typography variant="body1" sx={{ borderBottom: "1px solid white" }}>{obIndex + 1}ob</Typography>

										{probability === undefined
											? <Typography variant="body1">0%</Typography>
											: <Typography variant="body1">{Math.round(probability * 100)}%</Typography>}
									</Card>
								</Grid>
							);
						})}
					</Fragment>}
				</Grid>
			</Grid>
		</Fragment>
	);
}
