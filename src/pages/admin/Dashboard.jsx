import { useEffect, useState, useContext } from "react";
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
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
    categories: 0
  });

  const { callApi } = useApi();
  const { loading, error } = useContext(LoadingContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersData, booksData, authorsData, categoriesData] = await Promise.all([
          callApi(getUsers),
          callApi(getBooks),
          callApi(getAuthors),
          callApi(getCategories)
        ]);

        setStats({
          users: usersData.length,
          books: booksData.length,
          authors: authorsData.length,
          categories: categoriesData.length
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={4}>
        {/* Users Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Users</Typography>
              <Typography variant="h4">{stats.users}</Typography>
            </CardContent>
            
          </Card>
        </Grid>

        {/* Books Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Books</Typography>
              <Typography variant="h4">{stats.books}</Typography>
            </CardContent>
      
          </Card>
        </Grid>

        {/* Authors Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Authors</Typography>
              <Typography variant="h4">{stats.authors}</Typography>
            </CardContent>

          </Card>
        </Grid>

        {/* Categories Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">Categories</Typography>
              <Typography variant="h4">{stats.categories}</Typography>
            </CardContent>
            
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
