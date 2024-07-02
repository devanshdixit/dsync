import { FC, useContext, useEffect, useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { UserContext } from "../../context/user.context";
import truncateEthAddress from "../../utils/truncateAddress";
import { useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HiUserCircle } from "react-icons/hi";
import Image from "next/image";
import { SlBell } from "react-icons/sl";
import contractConfig from "../../config/smartContracts/contractConfigs";
import { notification } from "antd";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { BsBoxArrowRight, BsPlus } from "react-icons/bs";
import { CiUser } from "react-icons/ci";

interface Props {
  type?: "default" | "large";
  hasTopMargin?: boolean;
}

const WalletConnect: FC<Props> = ({
  type = "default",
  hasTopMargin = false,
}) => {
  const { address } = useAccount();
  const { user, logOutUser } = useContext(UserContext);
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(false);
  if (loading) return null;
  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }: any) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <div className="flex justify-center items-center gap-6">
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className="flex hover:bg-[#242426] text-white w-[120px]  justify-center items-center px-[16px] py-[10px] gap-[15px] border-[1px]"
                      >
                        <HiUserCircle />
                        Login
                      </button>
                      <Link href={"/create-project"} className="md:flex hidden">
                        <button className="md:flex cursor-pointer text-black md:w-[187px]  justify-center items-center px-[0px] md:px-[16px] py-[0px] md:py-[10px] gap-[15px] border-[1px] border-[#A9FF1C] bg-[#A9FF1C] hover:opacity-80">
                          <BsPlus className="h-6 w-6" />
                          <div>Create Project</div>
                        </button>
                      </Link>
                    </div>
                  );
                }
                if (chain.unsupported) {
                  return (
                    <button
                      className="flex text-black items-center justify-center bg-[#a9ff1c] p-2"
                      onClick={openChainModal}
                      type="button"
                    >
                      Wrong network
                    </button>
                  );
                }
                return (
                  <div className="text-white flex items-center gap-[21px] ">
                    <SlBell className="hidden md:block" />
                    <NetworkInfo />
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <label tabIndex={0} className=" bg-[#0C0C0E]">
                        <Image
                          src={"/icons/user.png"}
                          width={24}
                          height={24}
                          alt={"profile"}
                        />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu shadow bg-[#0C0C0E] w-[150px] mt-2 relative "
                      >
                        <div className="h-2 w-2 -top-1 bg-[#0C0C0E] z-10  right-2 border border-l-0 border-b-0 border-[#3D3D3D] -rotate-45 absolute" />
                        <li className="border-[1px] border-[#3D3D3D] md:flex justify-center items-center hidden">
                          <Link
                            href="/profile"
                            className="w-[150px]  hover:bg-[#242426]"
                          >
                            <CiUser className="h-4 w-4 text-white" />
                            View Profile
                          </Link>
                        </li>
                        <li
                          onClick={openAccountModal}
                          className="border-[1px] cursor-pointer md:border-t-0 border-[#3D3D3D] flex justify-start  content-start	 items-center "
                        >
                          <div className="w-[150px]  hover:bg-[#242426]  py-3  px-4  ">
                            <BsBoxArrowRight className="h-4 w-4 fill-white text-white" />{" "}
                            Disconnect
                          </div>
                        </li>
                      </ul>
                    </div>
                    <Link href={"/create-project"} className="md:flex hidden">
                      <button className="md:flex cursor-pointer text-black md:w-[187px]  justify-center items-center px-[0px] md:px-[16px] py-[0px] md:py-[10px] gap-[15px] border-[1px] border-[#A9FF1C] bg-[#A9FF1C] hover:opacity-80">
                        <BsPlus className="h-6 w-6" />
                        <div>Create Project </div>
                      </button>
                    </Link>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
};

export default WalletConnect;

const NetworkInfo = () => {
  const { chain, chains } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  return (
    <>
      {chain && (
        <div className="dropdown dropdown-bottom dropdown-end">
          <div className="text-white">
            {chain.name === contractConfig.network.testnet.name ? (
              <Image
                src="https://polygonscan.com/token/images/matic_32.png"
                width={24}
                height={24}
                alt="polygon"
                onClick={(e: any) => {
                  e.preventDefault();
                  notification.info({ message: "Polygon Network" });
                }}
              />
            ) : (
              <p
                onClick={(e: any) => {
                  e.preventDefault();
                  switchNetwork?.(contractConfig.network.testnet.id);
                }}
                className="text-red-400 hover:cursor-pointer border-[1px] border-[#3D3D3D]  font-semibold text-[16px] p-2 rounded-lg flex justify-center items-center gap-2 btn"
              >
                Wrong Network
                <FaChevronDown className="text-white " />
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
