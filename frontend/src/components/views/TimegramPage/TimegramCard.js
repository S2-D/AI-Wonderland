import React, { useEffect, useState } from 'react';
import '../../../../public/css/Timegram.css';

export default function TimegramCard(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const list = [];
    if (props.p_no1 != null) {
      list.push(props.p_no1);
    }
    if (props.p_no2 != null) {
      list.push(props.p_no2);
    }
    if (props.p_no3 != null) {
      list.push(props.p_no3);
    }
    if (props.p_no4 != null) {
      list.push(props.p_no4);
    }
    if (props.p_no5 != null) {
      list.push(props.p_no5);
    }
    if (props.p_no6 != null) {
      list.push(props.p_no6);
    }

    // 조회된 상품이 6개보다 작을경우
    while (list.length < 6) {
      list.push({ p_no: '', p_image: 'https://aiwonderland-back.herokuapp.com/static/images/rabbit_example.png' });
    }

    setProducts(list);
  }, [props]);

  return (
    <div className="col-span-4 flex flex-wrap justify-center m-3 gap-2">
      {products.map((product, idx) => (
        <div key={idx} className="product-list-card">
          {product.p_no == '' ? (
            <img className="product-list-card-img" src={product.p_image} />
          ) : (
            <a
              href={`/product_detail/${product.p_no}`}
              style={{
                height: '100%',
                maxHeight: '150px',
                width: '100%',
                maxWidth: '130px',
              }}
            >
              <img className="product-list-card-img" src={product.p_image} />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
