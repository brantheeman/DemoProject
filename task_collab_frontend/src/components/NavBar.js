import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/tasks" style={{ marginRight: "1rem" }}>Tasks</Link>
          <span style={{ marginRight: "1rem" }}>Logged in as <strong>{user.email}</strong></span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signup" style={{ marginRight: "1rem" }}>Sign Up</Link>
          <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
        </>
      )}
    </nav>
  );
}
