import Header from "./components/Header";
import ProductsList from "./pages/ProductsList";
import ProductDetails from "./pages/ProductDetailPage";
import ProductForm from "./pages/ProductForm";
import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Header />
        <Routes>
          <Route path="/" element={<ProductsList />}></Route>
          <Route
            path="/productDetail/:productTitle/:productId"
            element={<ProductDetails />}
          />
          <Route
            path="/productForm"
            element={<ProductForm />}
          />
        </Routes>
    </RecoilRoot>
  );
}

export default App;
