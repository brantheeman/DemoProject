import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from './pages/SignupForm';
import Login from './pages/Login';
import TaskList from "./pages/TaskList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h2>Welcome to Task Collab</h2>} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
