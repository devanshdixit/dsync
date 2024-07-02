import { Dropdown, Modal, MenuProps, notification, Spin } from "antd";
import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";

import { DownOutlined } from "@ant-design/icons";
import { BsCheck2 } from "react-icons/bs";
import { IsError, TaskCardProps, TaskStatus, Token } from "../../utils/types";
import { UserContext } from "../../context/user.context";
import { ContractInterface, ethers, Signer } from "ethers";
import { useAccount, useContractWrite, useNetwork, useProvider } from "wagmi";
import contractConfig from "../../config/smartContracts/contractConfigs";
import { contractAbi } from "../../config/smartContracts/contract-abi";
import { LoadingOutlined } from "@ant-design/icons";
import Error from "../Error";
import InfoWarning from "../InfoWarning";
import { makeHasuraAdminRequest } from "../../config/fetch-requests";
import { getTokens } from "../../utils/queries";
import LoadingBar from "../Animations/LoadingBar";

const StakedAmount: FC<{
  task: TaskCardProps;
  handleStaking: Function;
}> = ({ task, handleStaking }) => {
  const { isConnected, connector } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, updateTask } = useContext(UserContext);
  const [tokensLoading, setTokensLoading] = useState(false);
  const [taskHash, setTaskHash] = useState<any>("");
  const [processdone, setProcessdone] = useState(false);
  const [delay, setDelay] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 20, color: "white" }} spin />
  );
  const [isError, setIsError] = useState<IsError>({
    isError: false,
    message: "",
  });
  const [token, setToken] = useState<Token[]>([
    {
      tokenAddress: "",
      tokenDecimals: 0,
      tokenName: "",
      tokenNetwork: "",
      tokenSymbol: "",
    },
  ]);

  const provider = useProvider();
  const [tokenName, setTokenName] = useState("MATIC");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(0);
  const [signer, setSigner] = useState<Signer | null>(null);
  const [taskCreatorAddress, settaskCreatorAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState<Token>({
    tokenAddress: "0x0000000000000000000000000000000000000000",
    tokenDecimals: 18,
    tokenName: "MATIC",
    tokenNetwork: "Polygon",
    tokenSymbol: "https://polygonscan.com/token/images/matic_32.png",
  });
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    if (!loading) {
      setIsModalOpen(false);
      setLoading(false);
      handleStaking();
    }
  };
  const { chain } = useNetwork();

  // get signer
  useEffect(() => {
    (async () => {
      try {
        const res = await connector?.getSigner();
        setSigner(res);
      } catch (e) {
        setSigner(null);
      }
    })();
  }, [connector]);

  useEffect(() => {
    if (user?.walletAddress) {
      settaskCreatorAddress(user?.walletAddress);
    }
  }, [user]);

  const encryptTask = (task: any) => {
    console.log("task", task);

    const encryptedTask = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(task.toString())
    );
    setTaskHash(encryptedTask);
    return encryptedTask;
  };

  const { writeAsync: createTask } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: contractConfig.testnet.address,
    contractInterface: contractConfig.testnet.ABI as ContractInterface,
    functionName: "createTask",
  });
  const [items, setItems] = useState<MenuProps["items"]>([]);
  const [verifiedToken, setVerifiedToken] = useState(false);
  const getTokensList = async () => {
    try {
      setTokensLoading(true);
      const res = await makeHasuraAdminRequest(getTokens);
      console.log("fetching tokens response", res?.data?.asyncnewui_tokens);
      if (res?.errors) {
        setIsError({ isError: true, message: "error in fetching tokens" });
        setTokensLoading(false);
        return;
      } else {
        let a = await res?.data?.asyncnewui_tokens?.map(
          (item: any, index: number) => {
            let tokenList: Token[] = [];
            const data: Token = {
              tokenAddress:
                item.tokenAddress ||
                "0x0000000000000000000000000000000000000000",
              tokenDecimals: parseFloat(item.tokenDecimals) || 18,
              tokenName: item.tokenName || "MATIC",
              tokenNetwork: item.tokenNetwork || "Polygon",
              tokenSymbol:
                item.tokenSymbol ||
                "https://polygonscan.com/token/images/matic_32.png",
            };
            tokenList.push(data);
            setToken(tokenList);
            return {
              label: (
                <div
                  className="flex gap-2 text-[15px] font-[500]"
                  onClick={(e: any) => {
                    e.preventDefault();
                    setVerifiedToken(false);
                    setTokenName(data.tokenName);
                    setSelectedToken(data);
                    console.log("Seletec", { data, index });
                  }}
                >
                  <Image
                    src={data.tokenSymbol}
                    height={25}
                    width={25}
                    alt="token image"
                  />{" "}
                  {data.tokenName}
                </div>
              ),
              key: index,
            };
          }
        );
        setItems(a);
        console.log(a);
        setTokensLoading(false);
      }
    } catch (error) {
      setIsError({ isError: true, message: "error in fetching tokens" });
      setTokensLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      getTokensList();
    }
  }, [isModalOpen]);

  const handelSubmit = async () => {
    setIsError({ isError: false });
    setLoading(true);
    if (!user) {
      setIsError({
        isError: true,
        message: "No user ID",
      });
      setLoading(false);
      return;
    }

    if (!chain) {
      setIsError({
        isError: true,
        message: "Please connect wallet",
      });
      setLoading(false);
      return;
    }
    if (chain.name !== contractConfig.network.testnet.name) {
      setIsError({
        isError: true,
        message: "Please change network",
      });
      setLoading(false);
      return;
    }

    let newamount = amount * Math.pow(10, selectedToken.tokenDecimals);
    if (+newamount <= 0) {
      setLoading(false);
      setIsError({
        isError: false,
      });
      return;
    }
    console.log("submit started");
    const taskhash = encryptTask(task);
    console.log("task hash", { taskhash, newamount, selectedToken });

    if (taskhash === "" || selectedToken.tokenAddress === "") {
      setIsError({
        isError: true,
        message: "values not present!",
      });
      setLoading(false);
      return;
    }
    try {
      // const res = await contract.functions.createTask([taskhash,newamount.toString(),taskCreatorAddress], {
      //   gasPrice: ethers.utils.parseUnits("100", "gwei"),
      //   gasLimit: 1000000,
      // });
      // const receipt = await res.wait();
      const savetask: {
        status: TaskStatus;
        amount: string;
        taskhash: string;
        transactionHash: string;
      } = {
        status: "Staked",
        amount: `${amount.toString()} ${selectedToken.tokenName}`,
        taskhash: taskhash,
        transactionHash: selectedToken.tokenAddress,
      };
      let taskWriteResponse: any;
      if (selectedToken.tokenName === contractConfig.baseCurrency) {
        taskWriteResponse = await createTask({
          recklesslySetUnpreparedOverrides: {
            value: newamount.toString(),
            gasPrice: ethers.utils.parseUnits("100", "gwei"),
            gasLimit: 1000000,
          },
          recklesslySetUnpreparedArgs: [
            taskhash,
            newamount.toString(),
            selectedToken.tokenAddress,
          ],
        });
      } else {
        taskWriteResponse = await createTask({
          recklesslySetUnpreparedOverrides: {
            gasPrice: ethers.utils.parseUnits("100", "gwei"),
            gasLimit: 1000000,
          },
          recklesslySetUnpreparedArgs: [
            taskhash,
            newamount.toString(),
            selectedToken.tokenAddress,
          ],
        });
      }
      setSuccess(true);
      await taskWriteResponse.wait().then(async (value: any) => {
        // console.log(value);
        // console.log(value["transactionHash"]);

        if (value["transactionHash"].length > 0) {
          console.log(value["transactionHash"]);
          savetask.transactionHash = value["transactionHash"];
          const res = await makeHasuraAdminRequest(
            `
          mutation MyMutation($id: Int!, $status: String!, $amount: String!, $taskhash: String!, $transactionHash: String!) {
            update_asyncnewui_task_by_pk(pk_columns: {id: $id}, _set: {status: $status, amount: $amount, taskhash: $taskhash, transactionHash: $transactionHash}) {
              id
              title
            }
          }
          `,
            {
              variables: {
                id: parseInt(task?.id || "0"),
                status: savetask.status,
                amount: savetask.amount,
                taskhash: savetask.taskhash,
                transactionHash: savetask.transactionHash,
              },
            }
          );
          // const res = await updateTask(task.title, task.projectId, savetask);
          console.log("StakedAmount updated task:", res);
          setLoading(false);
          notification.success({ message: "Transaction done" });
          setProcessdone(true);
          console.log("task done");
          // window.location.reload();
        }
      });

      const txHash = taskWriteResponse.hash;
      console.log("trnax hash", { txHash });
    } catch (error: any) {
      console.log(error);
      if (error.message.includes("user rejected transaction")) {
        setIsError({
          isError: true,
          message: "The transaction is rejected!",
        });
        setLoading(false);
        return;
      }
      if (error.message.includes("insufficient funds")) {
        setIsError({
          isError: true,
          message: "Insufficient funds in your wallet!",
        });
        setLoading(false);
        return;
      }
      setIsError({
        isError: true,
        message: "Something went wrong!",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const beforeSubmit = async (currency: any) => {
    if (currency !== contractConfig.baseCurrency) {
      if (!signer) {
        notification.error({
          message: "Account not detected. Connect your wallet again.",
        });
        return false;
      }
    }

    return true;
  };
  const approveToken = async () => {
    setIsError({ isError: false });
    if (!amount) {
      notification.error({ message: "Enter amount" });
      return;
    }
    if (!selectedToken.tokenAddress) {
      notification.error({ message: "Invalid currency/token" });
      return;
    }

    const currentAmount = (
      amount * Math.pow(10, selectedToken.tokenDecimals)
    ).toString();

    if (!(await beforeSubmit(selectedToken.tokenName))) {
      return;
    }
    let contract = new ethers.Contract(
      selectedToken.tokenAddress!!,
      contractConfig.genericABI,
      signer!!
    );

    try {
      setLoading(true);
      const response = await contract.approve(
        contractConfig.testnet.address,
        currentAmount
      );
      await provider.waitForTransaction(response.hash);
      setVerifiedToken(true);
    } catch (error) {
      console.log(error, "error");
      setIsError({ isError: true, message: "token verification failed" });
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (processdone) {
      setTimeout(() => {
        setDelay(true);
      }, 1000);
    }
  }, [processdone]);

  return (
    <>
      <div
        onClick={showModal}
        className="justify-center items-center bg-[#80ED5D] flex gap-2 py-[8.5px] text-[14px] font-[400] z-50 cursor-pointer"
      >
        <Image
          className="ml-3"
          src={"/icons/stake.svg"}
          height={18}
          width={18}
          alt="stake"
        />
        Stake Amount
      </div>
      <Modal
        open={isModalOpen}
        footer={false}
        centered
        onCancel={handleCancel}
        className="stake-modal"
      >
        {!success ? (
          <div className="flex flex-col justify-center items-center">
            <div className="text-[24px] font-[700] mt-8">Stake Amount</div>
            <div className="flex gap-4 mt-4">
              <div
                className="bg-[#242426] flex gap-2 px-2 py-1 cursor-pointer justify-center items-center"
                onClick={() => setTokenName("USDT")}
              >
                <Image
                  className="h-[14px] w-[14px] rounded-full"
                  src="https://polygonscan.com/token/images/tether_32.png"
                  height={14}
                  width={14}
                  alt="token-images"
                />
                USDT
              </div>
              <div
                className="bg-[#242426] flex gap-2 px-2 py-1 cursor-pointer  items-center"
                onClick={() => setTokenName("MATIC")}
              >
                <Image
                  className="h-[14px] w-[14px] rounded-full"
                  src="https://polygonscan.com/token/images/matic_32.png"
                  height={14}
                  width={14}
                  alt="token-images"
                />
                MATIC
              </div>
              <div
                className="bg-[#242426] flex gap-2 px-2 py-1 cursor-pointer  justify-center items-center"
                onClick={() => setTokenName("BNB")}
              >
                <Image
                  className="h-[14px] w-[14px] rounded-full"
                  src="https://polygonscan.com/token/images/bnb_28_2.png"
                  height={14}
                  width={14}
                  alt="token-images"
                />
                BNB
              </div>
            </div>

            <div className="flex justify-start flex-col mt-4">
              <div>Token</div>
              {tokensLoading ? (
                <>
                  <p className="text-white text-center flex justify-center items-center gap-2 text-[16px]">
                    <Spin indicator={antIcon} /> Staking
                  </p>
                </>
              ) : (
                <>
                  <Dropdown
                    menu={{ items }}
                    trigger={["click"]}
                    className="drop-stake border-[1px] border-[#3D3D3D] py-[10px] px-[16px]  w-[250px] mobile:w-[312px]"
                  >
                    <div className="flex justify-between items-center text-[#858585]  mt-1">
                      {tokenName ? tokenName : "Select Token"} <DownOutlined />
                    </div>
                  </Dropdown>
                </>
              )}
            </div>

            <div className="flex justify-start flex-col mt-4">
              <div>Amount</div>
              <input
                type="number"
                min={0}
                className="bg-[#0C0C0E]  border-[1px] border-[#3D3D3D] py-[10px] px-[16px]  mt-1 placeholder:text-[#858585]  w-[250px] mobile:w-[312px]"
                placeholder="Enter amount"
                onChange={(e) => setAmount(parseFloat(e.target.value))}
              />
              {/* <div className="text-[12px] font-[400] text-right text-white text-opacity-50">
                {"Available 0.34 eth (~60 usdt)"}
              </div> */}
            </div>
            {isError.isError && <InfoWarning error={isError.message} />}
            {tokenName && amount > 0 ? (
              <>
                {tokenName === contractConfig.baseCurrency ? (
                  <button
                    type="submit"
                    className={`bg-[#a9ff1c] text-black text-[14px] font-[600] px-6 py-[10px] mt-4 mb-8 btn hover:bg-[#a9ff1c] rounded-none  ${
                      loading ? "loading" : ""
                    }`}
                    onClick={(e: any) => {
                      e.preventDefault();
                      console.log("info", { tokenName, amount });
                      handelSubmit();
                    }}
                  >
                    Confirm stake
                  </button>
                ) : (
                  <>
                    {verifiedToken ? (
                      <button
                        type="submit"
                        className={`bg-[#a9ff1c] text-black text-[14px] font-[600] px-6 py-[10px] mt-4 mb-8 btn hover:bg-[#a9ff1c] rounded-none  ${
                          loading ? "loading" : ""
                        }`}
                        onClick={(e: any) => {
                          e.preventDefault();
                          handelSubmit();
                        }}
                      >
                        Confirm stake
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className={`bg-[#a9ff1c] text-black text-[14px] font-[600] px-6 py-[10px] mt-4 mb-8 btn hover:bg-[#a9ff1c] rounded-none  ${
                          loading ? "loading" : ""
                        }`}
                        onClick={(e: any) => {
                          e.preventDefault();
                          console.log("info", { tokenName, amount });
                          //handelSubmit
                          setVerifiedToken(false);
                          approveToken();
                        }}
                      >
                        Verify Token
                      </button>
                    )}
                  </>
                )}
              </>
            ) : (
              <button
                type="submit"
                className="bg-[#101A00] text-white text-opacity-50 text-[14px] font-[600] px-6 py-[10px] mt-4 mb-8 loading"
              >
                Confirm stake
              </button>
            )}
          </div>
        ) : (
          <>
            {processdone ? (
              <div className="text-[16px] flex gap-2">
                <BsCheck2 className="text-[#A9FF1C] h-6 w-6 object-contain mb-[14px]" />
                Task Created
              </div>
            ) : (
              <div className="text-[16px] flex gap-2">Creating your task</div>
            )}
            <div className="flex flex-col justify-start items-start">
              <div className="flex gap-[10px] items-center justify-center mb-[12px]">
                <Image
                  className="object-contain"
                  src={"/images/projectlogo.png"}
                  height={32}
                  width={32}
                  alt="project"
                />
                <div>
                  <div className="text-[14px] font-[600]">{task.projectId}</div>
                  <div className="text-[12px] text-[#858585] break-words">
                    {task.title}
                  </div>
                </div>
              </div>
              {delay ? (
                <div className="text-[16px] text-[#a9ff1c] font-[600] mb-[12px] flex justify-end">
                  {`${amount}
                   ${tokenName} Staked`}
                </div>
              ) : (
                <div className="text-[12px] font-[400] w-[310px] mb-[15px] flex gap-2 flex-col">
                  {/* <progress className="progressbar w-80 h-1 "></progress>
                  <div>Staking in progress</div> */}
                  <LoadingBar processdone={processdone} />
                  <div>Staking in progress</div>
                </div>
              )}

              {processdone ? (
                <button
                  type="submit"
                  className="bg-[#a9ff1c] text-black text-[12px] font-[600] px-[16px] py-[10px]  btn hover:bg-[#a9ff1c] rounded-none"
                  onClick={() => handleCancel()}
                >
                  Done
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#101A00] text-[#858585] text-[12px] font-[600] px-[16px] py-[10px]  btn border-0 rounded-none"
                >
                  Done
                </button>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default StakedAmount;
