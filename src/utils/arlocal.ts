import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";
import { interactWrite, readContract } from "smartweave";

// export const contractAddress = process.env.REACT_APP_DOJIMA_CONTRACT_ADDRESS;
export const contractAddress = "GpM-Xw3h4myQg0ps_hl9Egf1YC3zk5Rb5xMdJirLvMU";
// const dojimaDefaultTags:Array<any> = JSON.parse(process.env.REACT_APP_DOJIMA_DEFAULT_TAGS as string)
const dojimaDefaultTags: Array<any> = [
  {
    name: "Dojima-Transfer-Address",
    value: "kkynJfegxPERA1_DBmaw7AYIsjnplTfX4tNpIF_Vy3w",
  },
];
// const dojimaWallet:JWKInterface = JSON.parse(process.env.REACT_APP_DOJIMA_WALLET)
const dojimaWallet: JWKInterface = {
  kty: "RSA",
  n:
    "xczpxevaeq1KNY6_Zhd978Qj37b9frHzNIQngd72jkAhoGshyqeSyBH6-w-3ZqYiVX8HPNizMs1XiCsizSZt4axRINwYwrpuzyKdokiV37LUs4aYX0obXX3iGwm2rbSw-T119T-x3OP3Rcd6aYBnAaYeJ8zBfmaLno9YE7jRiJuEezTo8nxDVcxT7F9hhQcIRsDzaBcNe-nWzp6AA5oM97J6R1-e37XKVzHIVlHtZZ5nuTJwBBmy1b9vG1xlxfO8jc0EVrFsRCUFLni-gIHXW8jJW8XRBBh3NBRQHQJ3OqFHR9bbfV7s-0jgQDUI8iNOTnr2N0uK5faeHGxVAQ-4wY0GQojUWQ1Ol7GYx45Io04h0EeGOK86uaPvxkqqYzcrWF1MTdv69CLpVAsOxgHh0j12fLm-fmYMSvWq6HRxs1sOpFsM_Rog-Mp-5mu9FylvQiP6RC48g9gObu2TrCWWGx_KkaId2CvIiw8qvZAQG8u8WndbygeqrpgjvatNpHTC9xyEuaem9wXOWWqblTcu9Oqj4u0MVVxqA97D9bal9neEeWfzQxLaYKQLX9qvBFr4qnX0PzsjsuSTQ24Ct-iQs5iIxxPrnm4aadiHfzh_wQjql1rWMaPx7AC54TuTQGSOQCAjQXATyJVIeVV3APyQM-LYu_uPPZZOBQUCTyr_ens",
  e: "AQAB",
  d:
    "dTBOYIC31G7OxKRqKWZJqsAeMPENhv6PBNI3Re5_TRAZ3B0czCA0Cmz8sbpCAoLzXIwCEb6hjLuz3G0SFVFrUITzG_DKirRB6l6r3fX7NamR8zsPE4WoaN-oEjTTEl83arNLK54tFp3JZoIkuFTmskdlHldlXCoNFkf--tBI9BKPjx9t1BxjGHYSUry_3jyoXqL6kvT1fDCyn3-wgHHItQf9AkRYsFnYI4jPFLU9XTNYaJTFYOiI17KvdRptAbbCQ5DvvR0o88arJzlKRICowyxWgBTXHQIRvb07KbTIRug-fwWAzOpspQQsOF4ziqH4Ru766Q_MnypZyqU0R4i1AIwjSzEswsRodXP_h-WUH8ksNiSu5HxAAKVRm0CXPjut5JkjN6zwB9UromE6jwpfJBfaXWhCmnhrNnjfsp0coSecoWJCyMLOfUcrzNnEZodwUNWfb9uSAx2UYt9Rj1op7TksiYdx-1OFc2x7kSeaMGcibcuP1vb-nsq0BkVwTLlagbe_oYfo6YRGvN0N5EweadpkjvhwgVqytFAZVxH8m9HYCV6HYp9NWBHYYkaArXmY8QlRVKIEyEZVmIWJyMuGFojyvExGvMTZk1fIMEN-1FqKCEdSyda7p8qtHMxb2ZZEzDDpyDTQ4y9sDbJR_a0yYxmJarJoMOkOLAC5TDmdjAE",
  p:
    "7l2_QCfRbJ_DfIxlpa7E24Gf-sZ8zaImlebNlMGsYy_r3cBzsY3chl_e3kO8nap2Y2GV4eHDPsV6obhNaN_8YY9q-D19qSiM-yuUxrBMiP7s3GKr_kWWQF_evRZZroUqFwmVJhn29JJViLh6VZb3E3sk_p5ErWOHce02AlqYyQ-k98i7WHeA5IdCQeXwVOjQk6PlTbll7tYIWaTGud-FdR70J9R30YRuln6HFQiGpfWACyhEMPIZ5tZGI4fzcm1S3xG0sWyadP3We2TgIm920FDKuJkvqgnrDq_YyJ_mbhLYLJbfF8pgX1QB88qjuoZUPqTUjyw5Uarq_Q_VMYIOgQ",
  q:
    "1G7rUjifP_qw5CFgNqNGZoVLAmx-cD4pr-VdVZsUpJbqYbGPUaTxz7rbVlLu_HpbCnxaheVPgaUTwyxrA9-UFPcv5iwFD7Z2X9dC8d2OVvjWJn4b0fW5Ps8hbQnYQXfnmUPG8qtUCFehWbmQS4OqhrVE4vV3mAGLJVm7J_8H6jV585ETmFqEyQ8sO3FALfjiHNUMA-m4__-_eiqOQAcYbwAYoXT_sV4FC_A-qEBtw1EbKKovLtetipUl1N5PHuDTbQCSKsbmkfqUdmdE8kFlnQMqib6EOJWZQkkROLBg1QaVxp9kOgDvUPBzRzJ4N1txRac0OM8fef7EKzLs1b5C-w",
  dp:
    "S-c0UHSdfo59THrUn2bArvle_RcZhM2epdtCGZ12jHslC48OCDsZPvzmVjaRqE8wtcLMXIpsht-Rhk_O7pdsoZBuyq-iBSyxgAXHsWFQbctnl2IgTK7SApvErMeiNS2YUo-tm91mw0iZzhiYdArHkL-E70NssR3hcojLywIYZuYBbRnRdoFPXPYpRhy3ZAJi8LCfAxoHeH9VV15eHbAsqjf6HXjN0rzuDiQqVatKXSyI4oSm-kMNtnEDEqtm_UgMvJXByUHBCYIPO2nK6Yw-9GTVuOSmxem0nQ-n43LviJudlM1SKxw5hgGVQZGEg4_k4bHRMeouMnBPtdfF1qcIgQ",
  dq:
    "M3X7Q5u72D_egiUjrZi4ATXhCeFGb-JfLuEdTxOWWJjGhowA8AJJIc1ePPcyNa9eRpgBRdZbAEkBFJK6CeIreTi4PcYEI95LpsP6z6SgSqlVF1YNXztreK-spUFxRcrKK_KjSz39yVeRGq89KU3oDWH0IhbctdIJ5y5pjDLXtADoXfyTBqFG8X3fdTbmGTzlaZ6inoAL9Nf7hpiwhQoy_RDE5rf1CP6Bsnasdw3EiUAomB1B-NL-k0e2Nm70M8K69Pjib8JnMI3HUTeLGDSHbRXLRDsGxL5YthoFNfpkOraxqcALA5IeZzkYc_Lh9GcOdZUfrXNfaKoy01Qu00iX6Q",
  qi:
    "DZlXzDbuGKIA9oqeeU23xdU5ejqJZEMY2_O0W0WLoI3b3gvzSOClLMexHs9Oq6IldW7FZDyGdQGtOEY0yFiYJwENjQ8Nyyazkm-EBC7qB8JvBOLOC1YUMp86Ken217IizNrDB141evUc6Ga7Fa0L2nF50kTYQKzeIbJCRYWzycNahXhF73IekY_kcDzxposLaYO3-XjDYhdt5Hm0x_3pchqvCD4-XgARReAKCB9Fc4CUVAqrfLVy6Ob5UvYEon4IixZW9Uz_GPG5hLmhhVG67hhNnwM6Kv-NqjjQNKJLLHSPBQm5rDEn8NOPlooR9u7jNnyoYF5n5umpEc7dTpOZTw",
};

export const arClient = new Arweave({
  host: "localhost",
  port: 1984,
  protocol: "http",
});

//transfer pst from address to dojima address
export const transferPstFromAr = async (
  input: any,
  tags?: Array<{ name: string; value: string }>,
  wallet?: JWKInterface
) => {
  // const loadCntct = await loadContract(arClient, contractAddress)
  await interactWrite(
    arClient,
    wallet ?? dojimaWallet,
    contractAddress,
    input,
    [...tags, ...dojimaDefaultTags]
  );
  await arMine();
};

//read latest contract state
export const readContractState = async (height: number) => {
  const response = await readContract(arClient, contractAddress, height, true);
  return response;
};

export const getPstBalance = async () => {
  const address = await window.arweaveWallet.getActiveAddress();
  const state = await readContractState(0);
  const balance = state.state.balances[address];
  return balance;
};

//used only incase of arlocal
export const arMine = async () => {
  await arClient.api.get("mine");
};
