import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

export default function AdminModal({
  open,
  onClose,
  entity,
  formData,
  onChange,
  onSave,
  authors = [],
  categories = [],
}) {

  const renderFields = () => {
    switch (entity) {
      case "book":
        return (
          <>
            <TextField
              label="Name"
              value={formData.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
            />
            <TextField
              select
              label="Author"
              value={formData.author || ""}
              onChange={(e) => onChange("author", e.target.value)}
            >
              {authors.map(a => (
                <MenuItem key={a._id} value={a._id}>{a.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Category"
              value={formData.category || ""}
              onChange={(e) => onChange("category", e.target.value)}
            >
              {categories.map(c => (
                <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Description"
              multiline
              rows={3}
              value={formData.description || ""}
              onChange={(e) => onChange("description", e.target.value)}
            />
            <TextField
              label="Image URL"
              value={formData.cover || "/images/default.png"}
              onChange={(e) => onChange("cover", e.target.value)}
            />
          </>
        );
      case "user":
        return (
          <>
            <TextField
              label="Name"
              value={formData.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
            />
            <TextField
              label="Email"
              value={formData.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={formData.password || ""}
              onChange={(e) => onChange("password", e.target.value)}
            />
            <TextField
              label="Role"
              select
              value={formData.role || "user"}
              onChange={(e) => onChange("role", e.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </>
        );
      case "author":
      case "category":
        return (
          <TextField
            label="Name"
            value={formData.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{formData._id ? `Edit ${entity}` : `Add ${entity}`}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        {renderFields()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={onSave}>
          {formData._id ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
