import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ShoppingCard from "./pages/ShoppingCard";
import Login from "./pages/Login";
import SearchBill from "./pages/SearchBill";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.css";
import "./common.scss";
import Admin from "./pages/admin";
import Products from "./pages/admin/products";
import { useSelector } from "react-redux";
function App() {
  const isAuth = useSelector((state) => {
    return state?.authen?.isLogin;
  });

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/card" element={<ShoppingCard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/orders" element={<SearchBill />} />
      <Route
        path="/admin"
        element={isAuth ? <Admin /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/admin/import"
        element={isAuth ? <Products /> : <Navigate to="/login" replace />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
