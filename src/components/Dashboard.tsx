import Header from "./Header";
import KudosActivity from "./KudosActivity";
import KudosForm from "./KudosForm";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <KudosForm />
      <KudosActivity />
    </div>
  );
};

export default Dashboard;
