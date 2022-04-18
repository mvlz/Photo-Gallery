import "./Product.css";
import { forwardRef } from "react";

const ProductComponent = forwardRef(({ product }, ref) => (
  <div className="product" ref={ref}>
    <div className="product-img">
      <img src={product.image_url} alt={product.tags} />
      <a href={product.url} className="hover-box">
        <p>Open</p>
        <h4 className="product-domain">{product.domain}</h4>
      </a>
    </div>
    <div className="product-body">
      <p className="product-name">{product.name}</p>
      <p className="product-desc">{product.description}</p>
    </div>
  </div>
));

export default ProductComponent;
