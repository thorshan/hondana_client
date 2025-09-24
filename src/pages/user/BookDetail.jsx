import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { getBookById } from "../../api/book";
import { getAuthorById } from "../../api/author";
import { getCategoryById } from "../../api/category";
import { useApi } from "../../hooks/useApi";
import LoadingContext from "../../context/LoadingContext";
import Loader from "../../components/Loader";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { callApi } = useApi();
  const { loading, error } = useContext(LoadingContext);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookData = await callApi(getBookById, id);

        if (bookData.author && typeof bookData.author === "string") {
          const authorData = await callApi(getAuthorById, bookData.author);
          bookData.author = authorData;
        }

        if (bookData.category && typeof bookData.category === "string") {
          const categoryData = await callApi(
            getCategoryById,
            bookData.category
          );
          bookData.category = categoryData;
        }

        setBook(bookData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookData();
  }, [id]);

  if (loading) return <Loader />;

  if (error)
    return (
      <Container sx={{ mt: 5 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );

  if (!book)
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>No book data found.</Typography>
      </Container>
    );

  return (
    <Container sx={{ mt: 5 }}>
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 3 }}>
        Back to Home
      </Button>

      <Card
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        {book.cover && (
          <CardMedia
            component="cover"
            sx={{ width: { md: 300 }, height: { xs: 300, md: "auto" } }}
            image={book.cover || "/images/defaut.png"}
            alt={book.name}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h4" color="text.primary" gutterBottom>
            {book.name || "Untitled Book"}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Author: {book.author?.name || "Unknown"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Category: {book.category?.name || "Uncategorized"}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {book.description || "No description available."}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created: {new Date(book.createdAt).toLocaleDateString() || "N/A"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default BookDetail;
