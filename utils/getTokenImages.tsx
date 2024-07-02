import Image from "next/image";

const getTokenImage = (amount: any) => {
  if (amount?.toLocaleLowerCase().includes("matic")) {
    return (
      <Image src={"/icons/matic.svg"} height={18} width={18} alt="matic" />
    );
  } else if (amount?.toLocaleLowerCase().includes("bnb")) {
    return <Image src={"/icons/BNB.png"} height={18} width={18} alt="bnb" />;
  } else if (amount?.toLocaleLowerCase().includes("usdt")) {
    return <Image src={"/icons/USDT.png"} height={18} width={18} alt="usdt" />;
  }
};

export default getTokenImage;
