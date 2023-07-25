import { Circles, Dna, ThreeDots } from "react-loader-spinner";
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

export const LoaderBtn = () => {
  return (
    <Dna
      visible={true}
      height="50"
      width="50"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
};

export const LoaderWallet = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};
