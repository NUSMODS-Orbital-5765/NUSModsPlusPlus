import AdminAppBar from "./AdminAppBar";
import AdminDrawerComponent from "./AdminDrawerComponent";

const AdminHomePage = () => {
  return (
    <div>
      <AdminAppBar />
      <AdminDrawerComponent defaultTab={1} />
    </div>
  );
};

export default AdminHomePage;
