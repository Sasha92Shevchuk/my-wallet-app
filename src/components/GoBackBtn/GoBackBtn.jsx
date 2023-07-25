import { AiOutlineArrowLeft } from "react-icons/ai";
import { BackLink } from "./GoBackBtn.styled";

export const GoBackBtn = () => {
  return (
    <BackLink to="/">
      <AiOutlineArrowLeft /> Go Back
    </BackLink>
  );
};
