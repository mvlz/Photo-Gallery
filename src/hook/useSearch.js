import { useEffect, useState } from 'react'

export default function useSearch(searchItem, products) {
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        const searchHandler = (search) => {
            if (!search || search === "") {
                setFiltered(products);
            } else {
                const filteredProducts = [...new Set(products.filter((p) =>
                    p.description.toLowerCase().includes(search)
                ))]
                setFiltered(filteredProducts);
            }
        };
        searchHandler(searchItem)
    }, [searchItem, products])
    return { filtered }
}