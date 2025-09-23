import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Avatar,
} from "@mui/material";
import { getUserById } from "../../api/user";
import { getBooks } from "../../api/book";
import { useApi } from "../../hooks/useApi";
import LoadingContext from "../../context/LoadingContext";
import Loader from "../../components/Loader";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const { callApi } = useApi();
  const { loading, error } = useContext(LoadingContext);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await callApi(getUserById, id);
      setUser(userData);

      const allBooks = await callApi(getBooks);
      // filter books by user if necessary (assuming book.owner or userId)
      const userBooks = allBooks.filter((book) => book.owner === id);
      setBooks(userBooks);
    };
    fetchData();
  }, [id]);

  if (loading) return <Loader />;

  if (error)
    return (
      <Container sx={{ mt: 5 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  if (!user) return null;

  return (
    <Container sx={{ mt: 5 }}>
      {/* User Info */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 5 }}>
        <Avatar
          src={user.picture || ""}
          sx={{ width: 100, height: 100, mr: 3 }}
        />
        <Box>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>
      </Box>

      {/* User's Books */}
      <Typography variant="h5" gutterBottom>
        My Books
      </Typography>
      {books.length === 0 && <Typography>No books added yet.</Typography>}
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              {book.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={book.image}
                  alt={book.name}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{book.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.author?.name || "Unknown Author"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.category?.name || "Uncategorized"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/book/${book._id}`}>
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Profile;
