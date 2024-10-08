export default function PopGifts({ data }) {
  return (
    <div className="product-item w-[300px] h-auto bg-white rounded-xl shadow-md">
      <div className="info-area flex flex-col p-5">
        <div className="txt-box mb-4">
          <span className="type-tit text-[20px] font-bold text-black block">
            {data.title}
          </span>
          <span className="type-txt text-sm text-gray-500 block">
            {data.description}
          </span>
        </div>
        <div className="tag-box mb-4">
          {data.tags.map((tag, index) => (
            <span
              key={index}
              className="type-tag text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full mr-2 inline-block my-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mg-sub-button-group bg-[#54d2c4] flex justify-around p-3 rounded-b-xl">
        <button className="mg-button calculate-btn text-white py-2 px-4 rounded flex items-center">
          공제료 계산
        </button>
        <button className="mg-button more-btn text-white py-2 px-4 rounded flex items-center">
          상품 더보기
        </button>
      </div>
    </div>
  );
}
