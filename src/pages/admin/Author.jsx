import AdminModelPage from "../../components/AdminModelPage";
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from "../../api/author";

export default function Author() {
  return (
    <AdminModelPage
      entityName="Authors"
      apiGet={getAuthors}
      apiCreate={createAuthor}
      apiUpdate={updateAuthor}
      apiDelete={deleteAuthor}
    />
  );
}
