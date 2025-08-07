import AppNavbar from "../common/Navbar";
import AppFooter from "../common/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import ChatWidget from "../chat-widget/ChatWidget";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const UserLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "admin") {
      // Redirect admins away from this layout
      navigate("/admin", { replace: true });
    }
  }, [user, navigate]);

  // Optionally: show nothing or loading while checking user
  if (user?.role === "admin") {
    return null; // or a spinner
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="flex-grow-1" style={{ marginTop: "3rem" }}>
        <Outlet />
      </main>

      <ChatWidget />
      <AppFooter />
    </div>
  );
};

export default UserLayout;
