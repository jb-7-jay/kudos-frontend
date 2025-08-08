import Header from "./Header";
import KudosActivity from "./KudosActivity";
import KudosForm from "./KudosForm";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <KudosForm />
        </div>
        <div className="flex-1">
          <KudosActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
