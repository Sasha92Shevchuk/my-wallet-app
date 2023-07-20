import { Circles } from "react-loader-spinner";
import { LoaderBox } from "./Loader.styled";
export const Loader = () => {
  return (
    <LoaderBox>
      <Circles
        height="80"
        width="80"
        color="#471ca9"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderBox>
  );
};
