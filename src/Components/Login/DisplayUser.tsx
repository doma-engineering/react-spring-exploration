import { useAtom } from "jotai";
import { companyName } from "../../Atoms/Company";

const DisplayUser = () => {
  const [company] = useAtom(companyName);
  return (
    <div>
      Current Company Logined as
      <span style={{ fontWeight: "bold" }}> {company} </span>
    </div>
  );
}

export default DisplayUser;