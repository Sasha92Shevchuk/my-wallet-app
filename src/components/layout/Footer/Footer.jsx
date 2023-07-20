import { FooterBox } from "./Footer.styled";

export const Footer = () => {
  return (
    <FooterBox>
      <div>
        <p>
          © {new Date().getFullYear()} {""}
          <a
            href="https://github.com/Sasha92Shevchuk/my-wallet-app"
            target="_blank"
            rel="noreferrer"
          >
            Go to GitHub
          </a>
        </p>
      </div>
    </FooterBox>
  );
};
