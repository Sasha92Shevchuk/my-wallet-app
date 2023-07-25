import { GoBackBtn } from "../../components/GoBackBtn/GoBackBtn";
import { WrapperInfo } from "./Information.styled";

const Information = () => {
  return (
    <>
      <WrapperInfo>
        <div>
          <GoBackBtn />
        </div>

        <div>
          <h1>Welcome to Ethereum</h1>

          <section>
            <p>
              Ethereum is the community-run technology powering the
              cryptocurrency ether (ETH) and thousands of decentralized
              applications.
            </p>
            <p>
              Summary Ethereum is a network of computers all over the world that
              follow a set of rules called the Ethereum protocol. The Ethereum
              network acts as the foundation for communities, applications,
              organizations and digital assets that anyone can build and use.
              You can create an Ethereum account from anywhere, at any time, and
              explore a world of apps or build your own. The core innovation is
              that you can do all this without trusting a central authority that
              could change the rules or restrict your access. Keep reading to
              learn more…
            </p>
          </section>
          <section>
            <h2>What is a blockchain?</h2>
            <p>
              A blockchain is a database of transactions that is updated and
              shared across many computers in a network. Every time a new set of
              transactions is added, its called a “block” - hence the name
              blockchain. Public blockchains like Ethereum allow anyone to add,
              but not remove, data. If someone wanted to alter any of the
              information or cheat the system, they’d need to do so on the
              majority of computers on the network. That is a lot! This makes
              decentralized blockchains like Ethereum highly secure.
            </p>
          </section>
          <a
            href="https://ethereum.org/en/what-is-ethereum/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more about Ethereum
          </a>
        </div>
      </WrapperInfo>
    </>
  );
};

export default Information;
