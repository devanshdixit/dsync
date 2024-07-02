import Image from "next/image";
import Link from "next/link";
import { CiUser } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="bg-[#242424] gap-[56px] md:hidden flex px-[50px] py-[10px] fixed right-0 left-0 justify-center bottom-0 z-20">
      <div>
        <Image
          src={"/images/bell.png"}
          height={40}
          width={40}
          alt="bell"
          className="text-white h-10 max-w-[2.5rem]"
        />
      </div>
      <Link href={"/create-project"}>
        <div className="flex items-center justify-center w-[44px] h-[44px] bg-[#a9ff1c] rounded-full text-black">
          <Image src={"/images/plus.png"} height={20} width={20} alt="plus" />
        </div>
      </Link>
      <Link href={"/profile"}>
        <CiUser className="h-8 w-8 text-white" />
      </Link>
    </div>
  );
};

export default Footer;
