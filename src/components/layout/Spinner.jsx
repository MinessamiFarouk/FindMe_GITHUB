import spinner from "./assets/spinner1.gif";

function Spinner() {
  return (
    <div className="w-100 mt-20">
      <img
        src={spinner}
        alt="Loading..."
        width={100}
        className="text-center mx-auto"
      />
    </div>
  );
}

export default Spinner;
