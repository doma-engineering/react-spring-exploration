import ToLoginButton from "../Components/Login/toLoginButton";

const ErrorSwitcherCandidateTable = () => {

  return (
    <div className="flex flex-col justify-center">
      <div className="text-center text-4xl text-slate-200 mt-20">
        Error in switch!
      </div>
      <div className="flex justify-center items-center mt-5">
        <ToLoginButton text="Go to login" style="btnAccent py-1 px-8" />
      </div>
    </div>
  )
}

export default ErrorSwitcherCandidateTable;