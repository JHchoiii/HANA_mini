export default function InsuranceTypeBtn({ data, bgColor, setCurrentSlide }) {
  return (
    <div
      className={` px-5 py-3 rounded-3xl font-bold cursor-pointer ${bgColor}`}
      onClick={setCurrentSlide}
    >
      {data.title}
    </div>
  );
}
