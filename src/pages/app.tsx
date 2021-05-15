import { BalanceInterface } from "@verto/js/dist/faces";
import { Card, Page, Spacer, Tooltip } from "@verto/ui";
import { useEffect, useState } from "react";
import { RootState } from "../store/reducers";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { cardListAnimation, opacityAnimation } from "../utils/animations";
import { PlusIcon, ChevronUpIcon, ChevronDownIcon } from "@iconicicons/react";
import Balance from "../components/Balance";
import Verto from "@verto/js";
import Head from "next/head";
import Metas from "../components/Metas";
import styles from "../styles/views/app.module.sass";

const client = new Verto();

const App = () => {
  const [balances, setBalances] = useState<BalanceInterface[]>([]);
  const address = useSelector((state: RootState) => state.addressReducer);
  const [showMorePsts, setShowMorePsts] = useState(false);

  useEffect(() => {
    if (!address) return;
    loadData();
  }, [address]);

  async function loadData() {
    setBalances(await client.getBalances(address));
  }

  return (
    <Page>
      <Head>
        <title>Verto - Home</title>
        <Metas title="Home" />
      </Head>
      <Spacer y={3} />
      <Balance />
      <Spacer y={4} />
      <h1 className="Title">
        Balances
        {/** TODO @martonlederer */}
        <div className="ActionSheet">
          <Tooltip text="List new">
            <button className="Btn">
              <PlusIcon />
            </button>
          </Tooltip>
        </div>
      </h1>
      <Spacer y={2} />
      <AnimatePresence>
        {balances.map(
          (item, i) =>
            (showMorePsts || i < 4) && (
              <motion.div key={i} {...cardListAnimation(i)}>
                <Card.Balance
                  id={item.id}
                  name={item.name}
                  // @ts-ignore
                  ticker={item.ticker ?? ""}
                  balance={item.balance}
                  logo={{
                    light: item.logo
                      ? `https://arweave.net/${item.logo}`
                      : "/arweave.png",
                  }}
                />
                <Spacer y={1.5} />
              </motion.div>
            )
        )}
      </AnimatePresence>
      <AnimatePresence>
        {balances.length > 4 && (
          <motion.div {...opacityAnimation()}>
            <Spacer y={1} />
            <span
              className="ShowMore"
              onClick={() => setShowMorePsts((val) => !val)}
            >
              Show{" "}
              {(showMorePsts && (
                <>
                  less
                  <ChevronUpIcon />
                </>
              )) || (
                <>
                  all
                  <ChevronDownIcon />
                </>
              )}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default App;
