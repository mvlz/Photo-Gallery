import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useProductsFetch(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [products, setProducts] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: `http://xoosha.com/ws/1/test.php?offset=${pageNumber}`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setProducts(prevProducts => {
        return [...new Set([...prevProducts, ...res.data.filter(d => d.name)])]
      })
      setHasMore(res.data.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])

  return { loading, error, products, hasMore }
}