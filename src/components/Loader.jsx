import { CircularProgress, Box } from "@mui/material";

const Loader = () => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
    <CircularProgress />
  </Box>
);

export default Loader;
