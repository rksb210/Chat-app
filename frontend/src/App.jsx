import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import {Toaster} from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { authUser, checkingAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const {theme} = useThemeStore()

    console.log({ onlineUsers });


  useEffect(() => {
    checkingAuth();
  }, [checkingAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen" data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingPage />} />
        <Route
          path="/profile"
          // element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          element={<ProfilePage />}
        />
      </Routes>

      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
}

export default App;
