// pages/Home.js
export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  return (
    <div>
      <h2>Welcome to Task Collab</h2>
      {isLoggedIn ? (
        <p>You are logged in as <strong>{user.email}</strong></p>
      ) : (
        <p>Please <a href="/login">login</a> or <a href="/signup">sign up</a> to continue.</p>
      )}
    </div>
  );
}
