import AdminModelPage from "../../components/AdminModelPage";
import { getBooks, createBook, updateBook, deleteBook } from "../../api/book";
import { getAuthors } from "../../api/author";
import { getCategories } from "../../api/category";

export default function Book() {
  return (
    <AdminModelPage
      entityName="Books"
      apiGet={getBooks}
      apiCreate={createBook}
      apiUpdate={updateBook}
      apiDelete={deleteBook}
      authorsApi={getAuthors}      // Pass authors for dropdown
      categoriesApi={getCategories} // Pass categories for dropdown
    />
  );
}
