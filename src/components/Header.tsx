import React from "react";

const Header: React.FC = () => {
  const user = React.useMemo(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return null;
    try {
      return JSON.parse(userData);
    } catch {
      return null;
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (!user) return null;

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
      <div>
        <h1 className="text-xl font-medium text-gray-800">
          Welcome, {user.first_name} {user.last_name}
        </h1>
      </div>
      <button
        onClick={handleLogout}
        className="text-sm px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
