import "./Products.css";
import { useCallback, useRef } from "react";
import { useState } from "react";
import useProductsFetch from "../../hook/useProductsFetch";
import ProductComponent from "../product/Product";

const ProductsComponent = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { products, hasMore, loading, error } = useProductsFetch(pageNumber);

  const observer = useRef();
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="products-container">
      {products.map((product, index) => {
        if (products.length === index + 1) {
          return (
            <ProductComponent
              lastProductElementRef={lastProductElementRef}
              product={product}
              key={new Date()}
            />
          );
        } else {
          return <ProductComponent product={product} key={product.page_id} />;
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};

export default ProductsComponent;
