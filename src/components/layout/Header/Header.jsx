import { HeaderBox, List, PageLink } from "./Header.styled";

export const Header = () => {
  return (
    <HeaderBox>
      <nav>
        <List>
          <li>
            <PageLink to="/">Logo</PageLink>
          </li>
          <li>
            <PageLink to="/">Home</PageLink>
          </li>
          <li>
            <PageLink to="/">Connect wallet</PageLink>
          </li>
        </List>
      </nav>
    </HeaderBox>
  );
};
