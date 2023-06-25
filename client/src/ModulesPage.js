import AppBarComponent from "./AppBar/AppBarComponent";
import DrawerComponent from "./DrawerComponent";

const ModulesPage = () => {
  return (
    <div className="homepage">
      <DrawerComponent defaultTab={3} />
      <AppBarComponent />
    </div>
  );
};
export default ModulesPage;
