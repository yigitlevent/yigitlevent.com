import Typography from "@mui/material/Typography";
import { Fragment } from "react";


export function JourneySoFar(): JSX.Element {
	return (
		<Fragment>
			<Typography variant="h6">journey so far</Typography>
			<Typography sx={{ margin: "16px 0", padding: "0 0 0 10px", borderLeft: "1px solid grey" }}>
				It all started with a kid who wanted to show his huge maps to his friends. he tried to download the maps.google.com by right clicking and saving it. It didn't work.
			</Typography>
			<Typography sx={{ margin: "16px 0" }}>
				Luckily, there were some libraries (like leaflet, but I think I used another one back then) and very barebone tutorials. After some work, I was able to actually create an html file with embedded JavaScript, and a tileset of my huge png file (4000x4000px, wow).
			</Typography>
			<Typography sx={{ margin: "16px 0" }}>
				I don't know why, but after that point I wanted to put everything into neatly created html files and share it that way. This led to learning the difference between a domain and a host, then to jQuery, and from then on, I was fully immersed into JavaScript.
			</Typography>
			<Typography sx={{ margin: "16px 0" }}>
				At early-10s I have started to work on game development. I used C++ to create games from ground up. For some reason, I wasn't a big fan of game engines back then. Learning more about C++ was a gret experience, it made me understand what programming is. During this time, I was studying physics full time while all my spare time went to OpenGL and pointer errors.
			</Typography>
			<Typography sx={{ margin: "16px 0" }}>
				After the university, I decided to go back to JavaScript. But after years of C++, having no type safety was a big problem, which almost made me quit JavaScript for good —then I discovered Typescript and React. 
			</Typography>
			<Typography sx={{ margin: "16px 0" }}>
				And since 2021, I have been learning F# and python (which I used to some capacity before). Learning more functional programming languages (in this case, F#) has provided an interesting perspective.
			</Typography>
		</Fragment >
	);
}
