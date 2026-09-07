import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Fragment } from "react";


export function MyCurrentProjects(): React.JSX.Element {
  return (
    <Fragment>
      <Grid size={{ xs: 2, md: 1 }}>
        <Typography variant="h6">
          <Link href="https://yigitlevent.com" sx={{ textDecoration: "none" }}>yigitlevent.com</Link>
        </Typography>

        <Typography>
          This is my sysadmin, devops, backend, and frontend project. I could have done all of this with a hosting service and such, but I wanted to overcomplicate things to learn more about how to use a server, extend my linux skills, and learn more about devops.
        </Typography>
      </Grid>

      <Grid size={{ xs: 2, md: 1 }}>
        <Typography variant="h6">
          <Link href="https://yigitlevent.com/bwgrtools" sx={{ textDecoration: "none" }}>BWGR Tools</Link>
        </Typography>

        <Typography variant="body1">
          New iteration of one of my oldest projects, this one is a set of utilities for a tabletop game called Burning Wheel Gold. Plan is to integrate this with this api to provide a better user experience.
        </Typography>
      </Grid>

      <Grid size={{ xs: 2, md: 1 }}>
        <Typography variant="h6">
          <Link href="https://yigitlevent.com/blacktower" sx={{ textDecoration: "none" }}>Blacktower</Link>
        </Typography>

        <Typography variant="body1">
          My closed-source game project. It's work-in-progress. Uses lots of websocket and microarchitecture to ensure performance for thousands of players. Registration is probably disabled, contact me if you'd like access.
        </Typography>
      </Grid>
    </Fragment>
  );
}
