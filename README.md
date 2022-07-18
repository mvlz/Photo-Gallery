# Photo Gallery

The project was part of a job interview and involved the use of API to display information in a [Pinterest-style](https://www.pinterest.com/cabiclothing/handbags/) layout.

I completed all requirements such as responsiveness, infinite scrolling pagination, and client-side search.

This project was developed using React.js. It was challenging to implement Masonry layout and client-side search, so I used the Masonry library for layout and wrote a custom hook to handle the search functionality.

## Demo

You can see the project demo [here](https://photo-gallery-mu.vercel.app/).

## Run Locally

After cloning the project, go to the project directory and install the dependencies

```bash
  npm install
```

Then start the server

```bash
  npm start
```
Open http://localhost:3000 with your browser to see the result.
## Documentation

### useProductsFetch

```javascript
export default function useProductsFetch(offsetNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;

    axios({
      method: "GET",
      url: `http://xoosha.com/ws/1/test.php?offset=${offsetNumber}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setProducts((prevProducts) => {
          return [...new Set([...prevProducts, ...res.data])];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [offsetNumber]);

  return { loading, error, products, hasMore };
}
```

#### Description

Data is fetched for infinite scrolling by this hook. Various states are stored and updated depending on API responses. `products`, `loading`, and `error` are displayed on DOM based on request status, and infinite scroll functionality is provided by `hasMore` and `loading`\.

#### Parameters

The `offsetNumber` is a state with a default number 1 and it's passed as an argument that increases when the `hasMore` or the `loading` changes, we understand changes of these two by using `useRef` and `useCallback` hooks\.

#### Returns

`loading`, `error`, `products` and `hasMore` are the hook outputs\.

### useSearch

```javascript
export default function useSearch(searchItem, products) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const searchHandler = (search) => {
      if (!search || search === "") {
        setFiltered(products);
      } else {
        const filteredProducts = [
          ...new Set(
            products.filter((p) => p.description.toLowerCase().includes(search))
          ),
        ];
        setFiltered(filteredProducts);
      }
    };
    searchHandler(searchItem);
  }, [searchItem, products]);
  return { filtered };
}
```

#### Description

Essentially, if there is no `searchItem`, or if `searchItem` is an empty string, in other words, if the client did not search for anything, `products` updates the `filtered` state directly. But if `searchItem` exists, the hook filters `products` based on `description` data and updates the state.

#### Parameters

The `searchItem` is a state and it's passed as an argument, it is updated with `onChange` event on the search input (controlled component).

And the `products` is the output of `useProductsFetch` hook.

#### Returns

The `filtered` state is an output that is rendered on DOM instead of `products`\.

## Appendix

[Masonry library](https://bestofreactjs.com/repo/paulcollett-react-masonry-css-react-react-integration)

[Infinite Scrolling With React - Tutorial](https://www.youtube.com/watch?v=NZKUirTtxcg)
