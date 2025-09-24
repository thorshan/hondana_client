import AdminModelPage from "../../components/AdminModelPage";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../api/category";

export default function Category() {
  return (
    <AdminModelPage
      entityName="Categories"
      apiGet={getCategories}
      apiCreate={createCategory}
      apiUpdate={updateCategory}
      apiDelete={deleteCategory}
    />
  );
}
