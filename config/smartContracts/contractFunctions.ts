import { ContractInterface } from "ethers";
import { useAccount, useContractWrite } from "wagmi";
import {
  UseContractWriteArgs,
  UseContractWriteConfig,
} from "wagmi/dist/declarations/src/hooks/contracts/useContractWrite";
import contractConfig from "./contractConfigs";

export function StakeAmount({
  taskHash,
  amount,
  taskCreatorAddress,
}: {
  taskHash: string;
  amount: number;
  taskCreatorAddress: string;
}) {
  const { writeAsync: createTask } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: contractConfig.testnet.address,
    contractInterface: contractConfig.testnet.ABI as ContractInterface,
    functionName: "createTask",
    args: [taskHash, amount, taskCreatorAddress],
  });
  const resp = createTask();

  return resp;
}
