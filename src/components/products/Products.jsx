import "./Products.css";
import { useCallback, useRef } from "react";
import Masonry from "react-masonry-css";
import { useState } from "react";
import useProductsFetch from "../../hook/useProductsFetch";
import ProductComponent from "../product/Product";
import useSearch from "../../hook/useSearch";

const ProductsComponent = ({ searchVal }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const { products, hasMore, loading, error } = useProductsFetch(pageNumber);
  const breakpointColumnsObj = {
    default: 6,
    1440: 5,
    1250: 4,
    1005: 3,
    750: 2,
    450: 1,
  };
  const { filtered } = useSearch(searchVal, products);

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
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="products-grid"
      columnClassName="products-grid_column"
    >
      {filtered.map((product, index) => {
        if (filtered.length === index + 1) {
          return (
            <ProductComponent
              ref={lastProductElementRef}
              product={product}
              key={index}
            />
          );
        } else {
          return <ProductComponent product={product} key={index} />;
        }
      })}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
    </Masonry>
  );
};

export default ProductsComponent;
