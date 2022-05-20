import ToLoginButton from "../Components/Login/toLoginButton";

const Error404Page = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="text-center text-5xl my-5 text-stone-200">
        404 page not found.
      </div>
      <div className="flex justify-center m-2">
        <ToLoginButton text="Go to login" style="btnAccent py-1 px-8 hover:bg-slate-600 hover:text-white" />
      </div>
    </div>
  );
}

export default Error404Page;