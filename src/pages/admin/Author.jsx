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
  TextField
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from "../../api/author";
import { useApi } from "../../hooks/useApi";
import LoadingContext from "../../context/LoadingContext";
import Loader from "../../components/Loader";

function Author() {
  const [authors, setAuthors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const { callApi } = useApi();
  const { loading, error } = useContext(LoadingContext);

  const fetchAuthors = async () => {
    try {
      const data = await callApi(getAuthors);
      setAuthors(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const handleOpenDialog = (author = null) => {
    setEditingAuthor(author);
    setFormData(author ? { name: author.name } : { name: ""});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleSave = async () => {
    try {
      if (editingAuthor) {
        await callApi(updateAuthor, editingAuthor._id, formData);
      } else {
        await callApi(createAuthor, formData);
      }
      handleCloseDialog();
      fetchAuthors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this author?")) return;
    try {
      await callApi(deleteAuthor, id);
      fetchAuthors();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Manage Authors
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleOpenDialog()}>
        Add Author
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author) => (
            <TableRow key={author._id}>
              <TableCell>{author.name}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleOpenDialog(author)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(author._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingAuthor ? "Edit Author" : "Add Author"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingAuthor ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Author;
