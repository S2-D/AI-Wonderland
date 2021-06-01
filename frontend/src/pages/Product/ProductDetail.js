// 1) 전체 레이아웃 잡기
// 2) 상세 레이아웃 - 예시 url로 잡기, 순풍이 공식문서 바로가기 https://tailwindcss.com/docs/justify-content
// 3) 데이터 불러오기 분석 - 페이지 이동 시에 asin 넘버를 어떻게 물고 올 것인지
import baseUrl from '../../url/http.js';

import 'tailwindcss/tailwind.css';

export default function ProductDetail() {
  const productUrl = `${baseUrl}/products/productlist/B00007GDFV/`;
  // 예시 url. 바꿔야 할 필요.
  const reviewUrl = `${baseUrl}products/reviewlist/?p_no=B00007GDFV`;

  return (
    <div className="bg-blue-400 min-h-screen min-w-full flex items-center justify-center">
      {/* 그리드 레이아웃(전체) */}
      <div className="grid grid-cols-5 gap-x-2 gap-y-4 min-w-full md:min-w-full ">
        {/* 그리드에서는 수평, 수직축의 갭을 구분해서 넣어줄 수 있음 */}
        <div className="col-span-2 bg-white p-3 rounded">
          p_image,
          https://images-na.ssl-images-amazon.com/images/I/41HaQemJWhL._SR38,50_.jpg
        </div>
        <div className="col-span-3 bg-white p-3 rounded">
          p_name: "Buxton Heiress Pik-Me-Up Framed Case", pcategory_code: 1,
          review_avg_stars : ???, review_sum_count : ??? p_brand: "Buxton",
          p_color: ?, p_size: ?, p_price: "$16.95 ",
        </div>
        <div className="col-span-5 bg-white p-3 rounded">
          Add to Scrapbook Button
        </div>
        <div className="col-span-5 bg-white p-3 rounded">
          Amazon Best Sellers Rank: p_rank, ASIN: p_no, Date First Available:
          p_date
        </div>
        <div className="col-span-5 bg-white p-3 rounded">
          AI Review Analysis - Keywords: p_keyword???
        </div>
        <div className="col-span-5 bg-white p-3 rounded">
          Customers who bought this item also bought
        </div>
        <div className="col-span-5 bg-white p-3 rounded">캐러셀</div>
        <div className="col-span-1 bg-white p-3 rounded">
          Review User's Profile
        </div>
        <div className="col-span-4 bg-white p-3 rounded">
          This is the title : summary, review_stars: ???, review_memID: "Darrow
          H Ankrum II", review_content: "mother - in - law wanted it as a
          present for her sister. she liked it and said it would work.",
          review_date: "2013-09-22",
        </div>
        <div className="col-span-5 bg-white p-3 rounded">
          Load More Reviews(+10) Button
        </div>
      </div>
    </div>
  );
}
