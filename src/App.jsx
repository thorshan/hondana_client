import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LoadingProvider } from "./context/LoadingContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/user/Profile";
import BookDetail from "./pages/user/BookDetail";
import DashboardLayout from "./pages/admin/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import User from "./pages/admin/User";
import Book from "./pages/admin/Book";
import Author from "./pages/admin/Author";
import Category from "./pages/admin/Category";
import AdminRoute from "./routes/AdminRoute";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f36500ff",
    },
    secondary: {
      main: "#2b2b2bff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <AuthProvider>
          <LoadingProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/book/:id" element={<BookDetail />} />

                {/* Admin Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<User />} />
                    <Route path="books" element={<Book />} />
                    <Route path="authors" element={<Author />} />
                    <Route path="categories" element={<Category />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </LoadingProvider>
        </AuthProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
