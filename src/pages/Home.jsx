import { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getBooks } from "../api/book";
import { useApi } from "../hooks/useApi";
import LoadingContext from "../context/LoadingContext";
import Loader from "../components/Loader";

function Home() {
  const [books, setBooks] = useState([]);
  const { callApi } = useApi();
  const { loading, error } = useContext(LoadingContext);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await callApi(getBooks);
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to Hondana
        </Typography>
        <Typography variant="h5" gutterBottom>
          Explore our collection of books
        </Typography>
      </Box>

      {/* Loader */}
      {loading && <Loader />}
      {error && <Typography color="error">{error}</Typography>}

      {/* Books Grid */}
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
            <Card
              sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column" }}
            >
              {book.cover && (
                <CardMedia
                  component="img"
                  height="200"
                  cover={book.cover}
                  alt={book.name}
                />
              )}
              <CardContent sx={{ flex: 1, color: "#f36500ff" }}>
                <Typography variant="h5" gutterBottom>
                  {book.name || "Untitled Book"}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Author: {book.author?.name || "Unknown"}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Category: {book.category?.name || "Uncategorized"}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {book.description || "No description available."}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Created:{" "}
                  {new Date(book.createdAt).toLocaleDateString() || "N/A"}
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

export default Home;
