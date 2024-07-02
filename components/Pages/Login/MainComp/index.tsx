import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IoIosClose } from "react-icons/io";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { UserContext } from "../../../../context/user.context";

const Main = ({
  setComponent,
}: {
  setComponent: Dispatch<
    SetStateAction<
      | "main"
      | "signup"
      | "signin"
      | "forgotpass"
      | "resetPass"
      | "otp"
      | "login"
    >
  >;
}) => {
  const { user, logOutUser, checkUserWallet } = useContext(UserContext);
  const { isConnected } = useAccount();
  const [walletdata, setWalletdata] = useState(null);
  const [reConnectWalletConnector, setReConnectWalletConnector] =
    useState<any>(null);
  const router = useRouter();
  const redirectUrl: any = router?.query?.redirect || "";

  const { connect, connectors, error, isLoading, pendingConnector, data } =
    useConnect({
      async onSuccess(data: any) {
        // console.log("User connected Successfully");
        // await checkUserWallet(data.account);
        // setWalletdata(data);
        // if (redirectUrl !== "") {
        //   router.push(redirectUrl);
        // }
      },
    });
  const { signMessage } = useSignMessage({
    async onSuccess() {},
  });
  const { disconnect } = useDisconnect();

  // useEffect(() => {
  //   disconnect();
  // }, [error]);

  return (
    <>
      <div className="m-2 smallMobile:m-0 relative w-[368px] border-[0.2px] border-opacity-50 border-gray-700 bg-[#1A1B1F] rounded-[25px]  text-white flex flex-col justify-between  py-[20px] px-[10px] gap-1 text-[16px] overflow-hidden">
        <div className="text-[19px] mb-1 font-bold text-center font-sans ">
          Connect a Wallet
        </div>
        <div className="font-bold text-[14px] opacity-50 px-4 font-sans ">
          Popular
        </div>
        {isConnected && user ? (
          <div className="text-[18px] font-bold text-center font-sans flex justify-center text-[#8ACE19] items-center">
            User Already logged In! &nbsp;&nbsp;
            <Link
              href={redirectUrl}
              passHref
              className={`text-white hover:scale-105 font-sans bg-[#3898FF] rounded-full w-fit px-4 font-bold flex items-center h-8`}
            >
              Go Back
            </Link>
          </div>
        ) : (
          <div>
            {connectors.map((connector: any) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                className=" text-white w-full  text-[18px] h-[44px] text-center py-[10px] bg-transparent  flex justify-start items-center gap-[13px] font-sans hover:bg-[#2E3036] rounded-xl font-bold"
                onClick={() => {
                  setReConnectWalletConnector(connector);
                  connect({ connector });
                  if (redirectUrl !== "" && isConnected) {
                    router.push(redirectUrl);
                  }
                }}
              >
                <div className="rounded-md  ml-4 ">
                  {connector.name === "MetaMask" && (
                    <Image
                      className="rounded-md"
                      src={"/icons/metamask.png"}
                      alt="meta"
                      height={30}
                      width={30}
                    />
                  )}
                  {connector.name === "Coinbase Wallet" && (
                    <Image
                      className="rounded-md"
                      src={"/icons/coinbase.png"}
                      alt="meta"
                      height={30}
                      width={30}
                    />
                  )}
                  {connector.name === "WalletConnect" && (
                    <Image
                      className="rounded-md"
                      src={"/icons/walletConnect.png"}
                      alt="meta"
                      height={30}
                      width={30}
                    />
                  )}
                </div>
                {connector.name}
                {!connector.ready && " (unsupported)"}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  "(connecting)"}
              </button>
            ))}

            {error && (
              <>
                <p className="font-sans text-center mb-2">
                  Please Reconnect Wallet!
                </p>
                <p className="font-sans text-center">{error.message}</p>
              </>
            )}
          </div>
        )}
        <div className="bg-[#2C2D31] rounded-full w-fit h-fit hover:scale-110 absolute right-[18px] top-[18px]">
          <IoIosClose className="h-7 w-7 opacity-80 cursor-pointer " />
        </div>
        <div className="border-b-2 w-[400px] -translate-x-4 border-[#2C2D31] mt-3"></div>
        <div className="flex justify-between items-center flex-col smallMobile:flex-row px-5 pt-4">
          <div className="opacity-60 text-[14px] font-bold font-sans tracking-wider">
            New to Etherium Wallets?
          </div>
          <a className="font-bold text-[14px] font-sans tracking-wider text-[#3896FC] hover:scale-105">
            Learn More
          </a>
        </div>
      </div>
    </>
  );
};

export default Main;
