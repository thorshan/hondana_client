import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function DashboardLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0, 
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
