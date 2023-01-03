import PackMan from "../assets/packmanLoading.svg";

const PackManLoading = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <img className="w-24 h-24" src={PackMan} alt="Loading" />
    </div>
  );
};

export default PackManLoading;
