/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />
/// <reference types="arconnect" />
/// <reference types="react-scripts" />

interface Window {
  ethereum?: {
    isMetaMask?: true;
    isConnected?: boolean;
    on?: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
    request?: (args: RequestArguments) => Promise<unknown>;
  };
  okexchain: any;
  web3?: {};
}

interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

declare module "*.md" {
  const content: string;
  export default content;
}
