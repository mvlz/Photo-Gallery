import "./Product.css";
const ProductComponent = ({ product }) => {
  return (
    <div className="product">
      <div className="product-img">
        <img src={product.image_url} alt="" />
        <a href={product.url} className="hover-box">
          <p>Open</p>
          <h4 className="product-domain">{product.domain}</h4>
        </a>
      </div>
      <div className="product-body">
        <p className="product-name">{product.name}</p>
        <p className="product-desc">{product.describtion}</p>
      </div>
    </div>
  );
};

export default ProductComponent;
