import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import { Layout } from "lucide-react";
import { BlogPage } from "./pages/BlogPage.tsx";
import BlogForm from "./components/BlogForm.tsx";
import AdminPage from "./pages/AdminPage.tsx";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex-col items-end">
        <div className="shadow-md">
          <nav className="max-w-4xl mx-auto py-3 px-4 flex justify-between items-center ">
            <Link to="/" className="flex items-center text-xl font-bold">
              <Layout className="text-blue-600" />
              Blog App
            </Link>
            <Link
              to="/admin"
              className="text-xl font-bold bg-blue-600 rounded-md py-2 px-4  text-white hover:bg-blue-700"
            >
              Admin Panel
            </Link>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
