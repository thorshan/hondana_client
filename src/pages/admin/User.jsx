import AdminModelPage from "../../components/AdminModelPage";
import { getUsers, createUser, updateUser, deleteUser } from "../../api/user";

export default function User() {
  return (
    <AdminModelPage
      entityName="Users"
      apiGet={getUsers}
      apiCreate={createUser}
      apiUpdate={updateUser}
      apiDelete={deleteUser}
    />
  );
}
