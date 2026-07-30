import React, { useContext } from "react";
import { ProductContext } from "../Context/ProductDataContext";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const data = useContext(ProductContext);
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = data.productData.find((item) => item.id == productId);
  console.log(product);
  let renderProduct = <h1>Loading...</h1>;
  if (data.productData.length > 0) {
    renderProduct = (
      <div className="product-detail">
        <div className="product-detail-container">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-detail-info">
<button className="back-btn" onClick={() => navigate("/")}>
  ← Go Back
</button>
            <h1 className="product-detail-title">{product.title}</h1>
            <h2 className="product-detail-price">${product.price}</h2>
            <p className="product-detail-desc">{product.description}</p>
            <button className="buy-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    );
  }

  return <div>{renderProduct}</div>;
};

export default ProductDetail;