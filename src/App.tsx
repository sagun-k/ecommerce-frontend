import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import UserLayout from "./components/user/UserLayout";
import LoginPage from "./components/user/authentication/LoginPage";
import RegisterPage from "./components/user/authentication/RegisterPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminOrdersPage from "./pages/admin/AdminOrderPage";
import AdminProductsPage from "./pages/admin/AdminProductPage";
import AdminSettingPage from "./pages/admin/AdminSettingPage";
import AdminUsersPage from "./pages/admin/AdminUserPage";
import AccessoryPage from "./pages/user/AccessoryPage";
import AccountPage from "./pages/user/AccountPage";
import CartPage from "./pages/user/CartPage";
import HomePage from "./pages/user/HomePage";
import KidsPage from "./pages/user/KidsPage";
import MensPage from "./pages/user/MensPage";
import OrdersPage from "./pages/user/OrdersPage";
import PaymentPage from "./pages/user/PaymentPage";
import UserDashboardPage from "./pages/user/UserDashboard";
import WomensPage from "./pages/user/WomenPage";
import { AdminChatViewer } from "./pages/admin/AdminChatViewer";

export function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Container fluid className="flex-grow-1 p-0">
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<HomePage />} /> {/* Public */}
              <Route element={<ProtectedRoute isAdmin={false} />}>
                <Route path="mens" element={<MensPage />} />
                <Route path="womens" element={<WomensPage />} />
                <Route path="kids" element={<KidsPage />} />
                <Route path="accessory" element={<AccessoryPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="dashboard" element={<UserDashboardPage />} />
              </Route>
            </Route>

            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Admin Routes (Protected) */}
            <Route element={<ProtectedRoute isAdmin={true} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHomePage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="settings" element={<AdminSettingPage />} />
                <Route path="chats" element={<AdminChatViewer />} />
              </Route>
            </Route>
          </Routes>
        </Container>
      </div>
    </Router>
  );
}
