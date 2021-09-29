import { TokenInterface, UserInterface } from "@verto/js/dist/faces";
import {
  Button,
  Card,
  Input,
  Page,
  Select,
  Spacer,
  useSelect,
  useToasts,
  useInput,
} from "@verto/ui";
import { useEffect, useState } from "react";
import { ArrowSwitchIcon } from "@primer/octicons-react";
import { swapItems } from "../../utils/storage_names";
import Verto from "@verto/js";
import Head from "next/head";
import Metas from "../../components/Metas";
import useSWR from "swr";
import styles from "../../styles/views/swap.module.sass";
import { getPstBalance, transferPstFromAr } from "../../utils/arlocal";
import BStyles from "../../styles/components/Balance.module.sass";

const client = new Verto();

const Swap = (props: { tokens: TokenInterface[] }) => {
  const { data: tokens } = useSWR("getTokens", () => client.getTokens(true), {
    initialData: props.tokens,
  });

  const { setToast } = useToasts();

  const chainsDefaultInputsOutputs = [
    {
      id: "AR",
      name: "AR",
      ticker: "AR",
    },
  ];
  const tokensDefaultInputsOutputs = tokens;
  const [inputs, setInputs] = useState(chainsDefaultInputsOutputs);
  const [outputs, setOutputs] = useState(tokensDefaultInputsOutputs);

  const input = useInput();
  const output = useInput();
  const inputUnit = useSelect<string>("...");
  const outputUnit = useSelect<string>("...");

  function switchTokens() {
    const inputVal = { val: inputUnit.state, items: inputs },
      outputVal = { val: outputUnit.state, items: outputs };

    inputUnit.setState(outputVal.val);
    outputUnit.setState(inputVal.val);
    setInputs(outputVal.items);
    setOutputs(inputVal.items);
    input.setStatus(undefined);
    output.setStatus(undefined);
    setToast({
      title: "Switched",
      description: "Switched tokens",
      duration: 3000,
    });
  }

  const [creatingSwap, setCreatingSwap] = useState(false);

  /**
   * Prepare a swap and display confirmation modal
   */

  /**
   * Submit the swap for the protocol to process
   */

  // selected PST price in AR
  const [selectedPrice] = useState(0);

  // TODO: ETH price
  useEffect(() => {
    if (inputUnit.state !== "AR") return;
    output.setState(Number(Number(input.state)));
  }, [input.state, selectedPrice]);

  // save selected token IDs to local storage
  useEffect(() => {
    if (inputUnit.state === "..." || outputUnit.state === "...") {
      const data = getInputOutput();

      // TODO: ETH
      setOutputs(
        data.output === "AR"
          ? chainsDefaultInputsOutputs
          : tokensDefaultInputsOutputs
      );
      setInputs(
        data.input === "AR"
          ? chainsDefaultInputsOutputs
          : tokensDefaultInputsOutputs
      );

      inputUnit.setState(data.input);
      outputUnit.setState(data.output);
    } else saveInputOutput();
  }, [inputUnit, outputUnit, inputs, outputs]);

  function getInputOutput(): { input: string; output: string } {
    const data = localStorage.getItem(swapItems);
    if (!data || !JSON.parse(data)?.val)
      return {
        input: "AR",
        output: tokensDefaultInputsOutputs[0].id,
      };

    const { val: parsed } = JSON.parse(data);

    return {
      input: parsed.input,
      output: parsed.output,
    };
  }

  function saveInputOutput() {
    localStorage.setItem(
      swapItems,
      JSON.stringify({
        val: {
          input: inputUnit.state,
          output: outputUnit.state,
        },
      })
    );
  }

  const handlePstTransfer = async () => {
    setCreatingSwap(true);
    const input = {
      function: "transfer",
      target: "dknofXOcp_f-1LpbC8w2nLMWmrkbBbasQ3P9QJ91WdI",
      qty: output.state,
    };
    transferPstFromAr(input, [
      {
        name: "Dojima",
        value: "Transfer",
      },
    ]);
    setCreatingSwap(false);
    setToast({
      description: "PST transferred successfully to DOJIMA Address",
      type: "success",
      duration: 4500,
    });
    setTimeout(() => {
      getPSTBalance();
    }, 1000);
  };

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    getPSTBalance();
  }, []);

  const getPSTBalance = async () => {
    const latestState = await getPstBalance();
    setBalance(latestState);
  };

  return (
    <Page>
      <Head>
        <title>Verto - Dojima Bridge</title>
        <Metas title="Bridge" />
      </Head>
      <div className={BStyles.Balance}>
        <div className={BStyles.Data}>
          <h1>
            <p>{"PST balance"}</p>
            {balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            <b>ARDRIVE</b>
          </h1>
        </div>
      </div>
      <Spacer y={3} />
      <Spacer y={4} />
      <div className={styles.SwapContent}>
        <Card className={styles.SwapForm}>
          <Input
            label="You send"
            inlineLabel={
              <Select
                {...inputUnit.bindings}
                small
                filled
                className={styles.UnitSelect}
              >
                {[
                  {
                    id: 1,
                    ticker: "ARDRIVE",
                  },
                ].map((input, i) => (
                  <option value={input.id} key={i}>
                    {input.ticker}
                  </option>
                ))}
              </Select>
            }
            type="number"
            className={styles.SwapInput}
            {...input.bindings}
          />
          <Spacer y={1} />
          <div className={styles.SwapLogo} onClick={switchTokens}>
            <ArrowSwitchIcon />
          </div>
          <Input
            label="You receive"
            inlineLabel={
              <Select
                {...outputUnit.bindings}
                small
                filled
                className={styles.UnitSelect}
              >
                {[
                  {
                    id: 1,
                    ticker: "DOJIMA",
                  },
                ].map((output, i) => (
                  <option value={output.id} key={i}>
                    {output.ticker}
                  </option>
                ))}
              </Select>
            }
            type="number"
            className={styles.SwapInput}
            {...output.bindings}
            readOnly={inputUnit.state === "AR" || inputUnit.state === "ETH"}
            currency={
              ((inputUnit.state === "AR" || inputUnit.state === "ETH") &&
                "~") ||
              undefined
            }
          />
          <Spacer y={2} />
          <Button
            style={{ width: "100%" }}
            loading={creatingSwap}
            onClick={handlePstTransfer}
            // @ts-ignore
            title="Swapping is temporarily disabled due to gateway issues, but we'll have this resolved ASAP!"
          >
            Transfer
          </Button>
        </Card>
      </div>
      <Spacer y={4} />

      <Spacer y={2} />
    </Page>
  );
};

export async function getStaticProps() {
  const tokens = await client.getTokens(true);

  return { props: { tokens }, revalidate: 1 };
}

export default Swap;
export type ExtendedUserInterface = UserInterface & { baseAddress: string };
