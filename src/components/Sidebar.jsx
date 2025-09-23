import { useLocation, Link } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";

const drawerWidth = 200;
const navbarHeight = 0;

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { label: "Users", path: "/dashboard/users", icon: <PeopleIcon /> },
  { label: "Books", path: "/dashboard/books", icon: <BookIcon /> },
  { label: "Authors", path: "/dashboard/authors", icon: <PersonIcon /> },
  { label: "Categories", path: "/dashboard/categories", icon: <CategoryIcon /> },
];

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        mt: `${navbarHeight}px`, // push below Navbar
      }}
    >
      <Box
        sx={{
          width: drawerWidth,
          bgcolor: "primary.main",
          color: "white",
          height: `calc(100vh - ${navbarHeight}px)`,
        }}
      >
        <List>
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <ListItemButton
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  mb: 1,
                  px: 2,
                  bgcolor: active ? "white" : "transparent",
                  color: active ? "secondary.main" : "white",
                  "&:hover": {
                    bgcolor: active ? "white" : "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 2,
                    justifyContent: "center",
                    color: active ? "secondary.main" : "white",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
