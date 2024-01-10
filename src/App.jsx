import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Shop from "./Components/Shop/Shop";
import Contact from "./Components/Contact/Contact";
import "./App.scss";
import ProductPage from "./Components/Comman/ProductPage";
import AddToCart from "./Components/Cart/AddToCart";

function App() {
  return (
    <SkeletonTheme baseColor="#d3d3d6" highlightColor="#ccccd5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<AddToCart/>}/>
          <Route path="/product/:category/:name/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
