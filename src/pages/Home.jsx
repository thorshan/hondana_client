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
          <Grid sx={{ alignItem: "center" }} item xs={12} sm={6} md={5} lg={4} key={book._id}>
            <Card
              sx={{
                width: 200,
                height: 350,
                border: "none",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Book Cover */}
              <Box
                sx={{
                  overflow: "hidden",
                  "&:hover img": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={book.cover || "/images/defaut.png"}
                  alt={book.name}
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Book Info */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1,
                }}
              >
                <Box>
                  <Typography variant="h6" color="primary">
                    {book.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    Author : {book.author?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category : {book.category?.name}
                  </Typography>
                </Box>

                {/* Button */}
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 1, alignSelf: "center" }}
                  component={Link} to={`/book/${book._id}`}
                >
                  View Book
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;
