import { useEffect } from 'react';
import axios from 'axios';

// api에서 페이지 넘버를 받아와서 넘겨줘야 함

export default function useBookSearch(query, pageNumber) {
  useEffect(() => {
    let cancle;
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancle = c)),
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancle();
  }, [query, pageNumber]);
  return null;
}
