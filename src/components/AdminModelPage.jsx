import { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { Edit, Delete, Refresh } from "@mui/icons-material";
import AdminModal from "./AdminModal";
import { useApi } from "../hooks/useApi";
import LoadingContext from "../context/LoadingContext";
import Loader from "./Loader";

export default function AdminModelPage({
  entityName,
  apiGet,
  apiCreate,
  apiUpdate,
  apiDelete,
  authorsApi,
  categoriesApi,
}) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openModal, setOpenModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const { callApi } = useApi();
  const { loading, error } = useContext(LoadingContext);

  const entityMap = {
    Books: "book",
    Authors: "author",
    Categories: "category",
    Users: "user",
  };

  const fetchData = async () => {
    try {
      const items = await callApi(apiGet);
      setData(items);

      if (authorsApi) {
        const authorsData = await callApi(authorsApi);
        setAuthors(authorsData);
      }
      if (categoriesApi) {
        const categoriesData = await callApi(categoriesApi);
        setCategories(categoriesData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormData({
        ...item,
        // map author/category to IDs for book
        author: item.author?._id || "",
        category: item.category?._id || "",
        password: "", // reset password field when editing user
      });
    } else {
      setFormData({});
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSave = async () => {
    try {
      if (editingItem) {
        await callApi(apiUpdate, editingItem._id, formData);
      } else {
        await callApi(apiCreate, formData);
      }
      handleCloseModal();
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await callApi(apiDelete, deleteItemId);
      setDeleteDialogOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Manage {entityName}
      </Typography>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Add {entityMap[entityName]}
        </Button>
        <Button variant="outlined" color="secondary" startIcon={<Refresh />} onClick={fetchData}>
          Refresh
        </Button>
        <TextField
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenModal(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(item._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <AdminModal
        open={openModal}
        onClose={handleCloseModal}
        entity={entityMap[entityName]}
        formData={formData}
        onChange={(key, value) => setFormData((prev) => ({ ...prev, [key]: value }))}
        onSave={handleSave}
        authors={authors}
        categories={categories}
      />

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this {entityMap[entityName]}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
