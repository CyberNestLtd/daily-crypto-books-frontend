import { Route, Routes, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Dashboard } from "./layouts";
import { SignIn, SignUp } from "./pages/auth";
import { Home, Profile } from "./pages/dashboard";
import BookPage from "./pages/books/BookPage";

function App() {
  return (
    // <AuthProvider>
      <Routes>
        {/* Redirect "/" to "/dashboard" if logged in, otherwise to login */}
        <Route
          path="/"
          element={
            localStorage.getItem("authToken") ? (
              <Navigate to="/dashboard/home" replace />
            ) : (
              <Navigate to="/auth/sign-in" replace />
            )
          }
        />

        {/* Authentication Routes */}
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />

        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/books/new" element={<BookPage />} />
        <Route path="/books/edit/:id" element={<BookPage />} />

        {/* 404 Route */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    // </AuthProvider>
  );
}

export default App;
