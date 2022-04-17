import { useCallback, useRef } from "react";
import { useState } from "react";
import useProductsFetch from "../../hook/useProductsFetch";

const ProductsComponent = () => {
  const [pageNumber, setPageNumber] = useState(20);

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
    <div>
      {products.map((product, index) => {
        if (products.length === index + 1) {
          return (
            <div ref={lastProductElementRef} key={product.page_id}>
              {product.name}
            </div>
          );
        } else {
          return <div key={product.page_id}>{product.name}</div>;
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};

export default ProductsComponent;
