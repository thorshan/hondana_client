import { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getBooks, createBook, updateBook, deleteBook } from "../../api/book";
import { getAuthors } from "../../api/author";
import { getCategories } from "../../api/category";
import { useApi } from "../../hooks/useApi";
import LoadingContext from "../../context/LoadingContext";
import Loader from "../../components/Loader";

function Book() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    category: "",
    description: "",
    cover: "",
  });

  const { callApi } = useApi();
  const { loading, error } = useContext(LoadingContext);

  const fetchData = async () => {
    try {
      const [booksData, authorsData, categoriesData] = await Promise.all([
        callApi(getBooks),
        callApi(getAuthors),
        callApi(getCategories),
      ]);
      setBooks(booksData);
      setAuthors(authorsData);
      setCategories(categoriesData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (book = null) => {
    setEditingBook(book);
    setFormData(
      book
        ? {
            name: book.name,
            author: book.author?._id || "",
            category: book.category?._id || "",
            description: book.description,
            cover: book.cover,
          }
        : { name: "", author: "", category: "", description: "", cover: "" }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleSave = async () => {
    try {
      if (editingBook) {
        await callApi(updateBook, editingBook._id, formData);
      } else {
        await callApi(createBook, formData);
      }
      handleCloseDialog();
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await callApi(deleteBook, id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Manage Books
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => handleOpenDialog()}
      >
        Add Book
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cover</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id}>
              <TableCell>
                <img
                  src={
                    book.cover
                      ? book.cover.replace("public", "")
                      : "/images/default_book.png"
                  }
                  alt={book.name}
                  style={{
                    width: 100,
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              </TableCell>

              <TableCell>{book.name}</TableCell>
              <TableCell>{book.author?.name || "Unknown"}</TableCell>
              <TableCell>{book.category?.name || "Uncategorized"}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenDialog(book)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(book._id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingBook ? "Edit Book" : "Add Book"}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <TextField
            select
            label="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, author: e.target.value }))
            }
          >
            {authors.map((a) => (
              <MenuItem key={a._id} value={a._id}>
                {a.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            {categories.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <input
            type="file"
            accept="cover/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData((prev) => ({ ...prev, cover: file }));
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingBook ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Book;
