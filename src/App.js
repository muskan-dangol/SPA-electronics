import Header from "./components/Header";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetailPage";
import ProductForm from "./pages/ProductForm";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignupForm from "./components/auth/Signup";
import SignInForm from "./components/auth/Signin";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsList />}></Route>
        <Route path="/:productTitle/:productId" element={<ProductDetails />} />
        <Route path="/productForm" element={<ProductForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SignInForm />} />
      </Routes>
      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
        position="bottom-right"
      />
    </>
  );
}

export default App;
