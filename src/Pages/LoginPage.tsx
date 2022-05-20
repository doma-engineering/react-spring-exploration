import EnterButton from "../Components/Login/EnterButton";
import Login from "../Components/Login/Login";

export default () => {
  return (
    <div className="flex justify-center mt-40 space-x-3"
    >
      <Login />
      <EnterButton />
    </div >
  );
};