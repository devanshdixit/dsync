import { BsChevronDown, BsPlus } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";
import { SlBell } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { appConfig } from "../../config/appConfig";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { useRouter } from "next/router";
import { notification } from "antd";
import contractConfig from "../../config/smartContracts/contractConfigs";
import { FaChevronDown } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import WalletConnect from "../WalletConnect";

const Header = () => {
  const { user, logOutUser } = useContext(UserContext);
  const router = useRouter();
  const [iswalletConnected, setIswalletConnected] = useState(false);
  useEffect(() => {
    if (user) {
      setIswalletConnected(true);
    } else {
      setIswalletConnected(false);
    }
  }, [user]);

  return (
    <div className="bg-[#0C0C0E] py-[21px] flex justify-between items-center md:justify-between lg:justify-between xl:justify-between  largeLaptop:justify-evenly   px-[24px] text-white sticky top-0 z-10">
      <div className="flex gap-[48px] text-white text-[16px] font-[400] items-center">
        <Link href={"/"}>
          <Image
            className="cursor-pointer"
            width={77}
            height={38}
            src={appConfig.logo}
            alt={"logo"}
          />
        </Link>
        {/* <div className="flex gap-[12px] items-center">
          For Developers <BsChevronDown />
        </div>
        <div className="flex gap-[12px] items-center">
          For Project Manager <BsChevronDown />
        </div>
        <div>News</div> */}
        {/* <div className="hidden md:block cursor-pointer">My Projects</div> */}
      </div>
      <WalletConnect />
      {/* <div className="flex justify-center items-center gap-[5px]">
        {!iswalletConnected && (
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(router.asPath);
              router.push({
                pathname: "/login",
                query: { redirect: router.asPath },
              });
            }}
            className="md:flex hidden hover:bg-[#242426] text-white w-[120px]  justify-center items-center px-[16px] py-[10px] gap-[15px] border-[1px]"
          >
            <HiUserCircle />
            Login
          </button>
        )}
        {iswalletConnected && <LogedInView user={user} />}
        {/* three dots view */}
      {/*  {!iswalletConnected ? (
          <div className="dropdown dropdown-bottom dropdown-end block md:hidden">
            <label tabIndex={0} className=" bg-[#0C0C0E]">
              <GiHamburgerMenu className="md:hidden block text-white h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu shadow bg-[#0C0C0E] w-[150px] mt-2  "
            >
              <li className="border-[1px] border-[#3D3D3D] flex justify-center items-center ">
                <Link href="/login" className="w-[150px]  hover:bg-[#242426]">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="text-white flex items-center gap-[21px] ">
            <SlBell className=" md:hidden" />
            <div className="dropdown dropdown-bottom dropdown-end  md:hidden">
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
                className="dropdown-content menu shadow bg-[#0C0C0E] w-[150px] mt-2  "
              >
                <li className="border-[1px] border-[#3D3D3D] flex justify-center items-center ">
                  <a
                    href={"/create-project"}
                    className="cursor-pointer block md:hidden w-[150px]"
                  >
                    Create Project
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        <Link href={"/create-project"} className="md:flex hidden ">
          <button className="md:flex cursor-pointer text-black w-[187px]  justify-center items-center px-[16px] py-[10px] gap-[15px] border-[1px] border-[#A9FF1C] bg-[#A9FF1C] hover:opacity-80">
            <BsPlus className="h-6 w-6" />
            Create Project
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default Header;

const NetworkInfo = () => {
  const { chain, chains } = useNetwork();
  useEffect(() => {
    console.log({ chain, chains });
  }, []);
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

const LogedInView = ({ user }: any) => {
  const { logOutUser } = useContext(UserContext);
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  return (
    <div className="text-white flex items-center gap-[21px] mr-[20px]">
      <SlBell className="hidden md:block" />
      <NetworkInfo />
      <div className="dropdown dropdown-bottom dropdown-end hidden md:block">
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
          className="dropdown-content menu shadow bg-[#0C0C0E] w-[150px] mt-2  "
        >
          <li className="border-[1px] border-[#3D3D3D] flex justify-center items-center ">
            <a
              href={"/create-project"}
              className="cursor-pointer block md:hidden w-[150px]"
            >
              Create Project
            </a>
            {user?.provider === "wallet" && isConnected && (
              <div
                onClick={async (e) => {
                  e.preventDefault();
                  disconnect();
                  logOutUser();
                }}
                className="w-[150px]"
              >
                Disconnect
              </div>
            )}
            {user?.provider !== "wallet" && (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  logOutUser();
                }}
                className="w-[150px]"
              >
                Logout
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
