{/* 상품 정보 (3) -상품 상세 설명 */}
<div
className="shadow-sm py-2 px-3"
style={{
  maxWidth: '310px',
  height: 'auto',
}}
>
<p className="flex p-1 text-sm font-semibold">Item Description</p>
{/* {productInfo.p_description.length > 0} */}
{itemDescription.length > 0 ? (
  <p className="p-2 text-xs text-center font-medium break-words">
    {/* {productInfo.p_description} */}
    Show nomal item description
  </p>
) : (
  <div className="flex flex-wrap justify-center p-1 text-xs text-center font-semibold text-gray-700">
    <img
      src="./images/rabbit_example.jpg"
      className="rounded-3xl m-4"
      style={{ width: '200px' }}
    />
    Okay, our database does not have this detail about the item.
    <br></br> How about we go back in time and extract the
    information instead?*
    <button
      type="button"
      className="bg-purple-500 hover:bg-purple-800 m-3 text-lg text-white font-semibold rounded-lg"
      style={{
        fontFamily: 'neodgm',
        width: '200px',
        height: '35px',
      }}
      onClick={() => {
        alert('Traveling through Time & Restoring Data');
        setNlpOnToggle(true);
      }}
    >
      {console.log('NLP 생성 버튼 클릭 상태 : ' + nlpOnToggle)}
      Execute
    </button>
    <p className="font-semibold text-gray-400">
      * Powered by Alice the AI Rabbit
    </p>
  </div>
)}
{nlpOnToggle === true ? (
  <p className="p-2 text-xs text-center font-medium break-words">
    {nlpDescription}
  </p>
) : null}
</div>
<div
className="shadow-sm py-2 px-3 text-md font-medium"
style={{
  maxWidth: '310px',
  height: 'auto',
}}
>
{/* 상품 인포 3 - AI 유저 키워드 */}
<p className="pl-1 pt-1 pb-1 text-sm font-semibold">
  AI Review Analysis
</p>
<div className="inline-flex flex-wrap justify-center gap-x-3 gap-y-2 m-2">
  {userKeyWords.length > 0 ? (
    userKeyWords.map((keyWord, idx) => (
      <div
        key={idx}
        className="rounded-xl text-sm py-2 px-3 bg-purple-500"
        style={{ fontFamily: 'neodgm', color: 'white' }}
      >
        {keyWord}
      </div>
    ))
  ) : (
    <div>
      <p className="p-1 text-xs text-justify font-medium">
        Oh No! There is insufficient data for the AI to analyze.
      </p>
    </div>
  )}
</div>
{/* <p>{productInfo.p_keyword}</p> */}
</div>

{/* 상품 인포 4 - 추천 상품 */}
<div
className="shadow-sm py-2 px-3 text-md font-medium"
style={{
  maxWidth: '310px',
  height: 'auto',
}}
>
<p className="pl-1 pt-1 pb-3 text-sm font-semibold">
  Customers who bought this item also bought
</p>
<div className="rounded-none shadow-none">
  <ProductDetailRecommend />
</div>
</div>

{/* 상품 인포 5 - 리뷰 불러오기 */}
<div
className="shadow-sm py-2 px-3 text-md font-medium"
style={{
  maxWidth: '310px',
  height: 'auto',
}}
>
<p className="p-1 text-sm font-semibold" ref={reviewRef}>
  Customer Reviews
</p>
{reviewInfo.map((review, idx) => (
  <div
    key={idx}
    className="grid grid-cols-5 gap-x-2 gap-y-1 p-3 mb-3 auto-rows-auto rounded-lg"
    style={{
      maxWidth: '310px',
      height: 'auto',
      borderStyle: 'inset',
      // backgroundColor: '#187FD9',
    }}
  >
    <div className="col-span-1 pl-2 flex justify-start items-center">
      <Avatar
        size={40}
        name={
          avatarName.avatarName[
            Math.floor(Math.random() * avatarName.avatarName.length)
          ]
        }
        variant="beam"
        colors={[
          '#187FD9',
          '#14A1D9',
          '#14C5D9',
          '#16F2DC',
          '#13F2C9',
        ]}
      />
    </div>
    <div className="col-span-4 flex flex-col justify-center">
      <p className="flex justify-start pl-1 mb-0 text-xs font-semibold">
        {review.summary}
      </p>
      {
        <p className="flex justify-end pt-1 pr-2 mb-0 text-xs font-medium">
          {/* Darrow H Ankrum II */}
          by {review.review_memID}
        </p>
      }
    </div>
    <div className="col-span-5 flex justify-center">
      <p className="px-3 py-2 mb-0 text-xs font-medium">
        {review.review_content}
        {/* mother-in-law wanted it as a present for her sister. she liked
      it and said it would work. */}
      </p>
    </div>
    <div className="col-span-3 flex justify-start self-center">
      <p className="pl-4 mb-0 text-xs font-medium">
        {review.review_date}
        {/* 2013-09-22 */}
      </p>
    </div>
    <div className="col-span-2 flex justify-end self-center">
      <p className="pr-1 mb-0 text-xs font-semibold">
        {review.review_vote} people
        <i
          className="far fa-thumbs-up"
          style={{
            color: '#187FD9',
            padding: '5px',
          }}
        ></i>
      </p>
    </div>
  </div>
))}
<div className="col-span-5 m-3 flex justify-center">
  {reviewNextPage === null ? null : (
    <button
      type="button"
      className="bg-purple-600 text-sm text-white font-semibold rounded-lg"
      style={{
        fontFamily: 'neodgm',
        width: '180px',
        height: '30px',
      }}
      onClick={loadMoreReview}
    >
      + Load More Reviews
    </button>
  )}
</div>
{console.log('다음 리뷰 페이지 : ', reviewNextPage)}
</div>
        </div>