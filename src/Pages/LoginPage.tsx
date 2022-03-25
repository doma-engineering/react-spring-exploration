import EnterButton from "../Components/Login/EnterButton";
import Login from "../Components/Login/Login";

export default () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "30px",
        paddingTop: "10rem",
      }}
    >
      <Login />
      <EnterButton />
    </div >
  );
};