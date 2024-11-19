import Spinner from "../_components/Spinner";

const loading = () => {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-primary-200 text-lg mt-5">Loading cabins</p>
    </div>
  );
};

export default loading;
