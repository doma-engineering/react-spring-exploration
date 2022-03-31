import ToLoginButton from "../Components/Login/toLoginButton";

const Error404Page = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", fontSize: "4rem" }}>
      <div style={{ padding: "20px" }}>
        404 page not found.
      </div>
      <ToLoginButton />
    </div>
  );
}

export default Error404Page;