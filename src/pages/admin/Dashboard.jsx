import { useEffect, useState, useContext } from "react";
import { Container, Typography, Grid, Card, CardContent, Box, Button } from "@mui/material";
import { People, Book, Person, Category } from "@mui/icons-material";
import { getUsers } from "../../api/user";
import { getBooks } from "../../api/book";
import { getAuthors } from "../../api/author";
import { getCategories } from "../../api/category";
import { useApi } from "../../hooks/useApi";
import LoadingContext from "../../context/LoadingContext";
import Loader from "../../components/Loader";

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    books: 0,
    authors: 0,
    categories: 0,
  });

  const { callApi } = useApi();
  const { loading, error } = useContext(LoadingContext);

  const fetchStats = async () => {
    try {
      const [usersData, booksData, authorsData, categoriesData] = await Promise.all([
        callApi(getUsers),
        callApi(getBooks),
        callApi(getAuthors),
        callApi(getCategories),
      ]);

      setStats({
        users: usersData.length,
        books: booksData.length,
        authors: authorsData.length,
        categories: categoriesData.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error}</Typography>;

  const cardData = [
    { label: "Users", value: stats.users, icon: <People sx={{ fontSize: 50, opacity: 0.3 }} /> },
    { label: "Books", value: stats.books, icon: <Book sx={{ fontSize: 50, opacity: 0.3 }} /> },
    { label: "Authors", value: stats.authors, icon: <Person sx={{ fontSize: 50, opacity: 0.3 }} /> },
    { label: "Categories", value: stats.categories, icon: <Category sx={{ fontSize: 50, opacity: 0.3 }} /> },
  ];

  return (
    <Container sx={{ mt: 5 }}>
      {/* Top Bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button variant="outlined" color="primary" onClick={fetchStats}>
          Refresh
        </Button>
      </Box>

      <Grid container spacing={4}>
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Card
              sx={{
                width: "200px",
                height: "150px",
                position: "relative",
                overflow: "hidden",
                borderRadius: 3,
                background: "linear-gradient(135deg, #f36500, #ff8c42)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: "center", zIndex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {card.label}
                </Typography>
                <Typography variant="h3">{card.value}</Typography>
              </CardContent>
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  right: -20,
                  fontSize: 120,
                  color: "rgba(255,255,255,0.15)",
                }}
              >
                {card.icon}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
