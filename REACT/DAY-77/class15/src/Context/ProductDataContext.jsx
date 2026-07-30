import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const ProductContext = createContext();

const ProductDataContext = ({ children }) => {
  const [productData, setProductData] = useState([]);

  const fetchproductData = async () => {
    const product = await axios.get("https://fakestoreapi.com/products/");
    setProductData(product.data);
  };

  useEffect(() => {
    fetchproductData();
  }, []);

  return (
    <>
      <ProductContext.Provider value={{ productData }}>
        {children}
      </ProductContext.Provider>
    </>
  );
};

export default ProductDataContext;