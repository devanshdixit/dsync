import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { FC } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { rightToLeft } from "../Animations/View-all";
interface Props {
  divClassName?: string;
  className?: string;
  label?: string;
  path?: string;
  isPath?: boolean;
  onClick?: any;
}

const GoBack: FC<Props> = ({
  className,
  label = "Back to Home",
  path,
  isPath,
  divClassName,
  onClick,
}) => {
  const router = useRouter();

  const Back = () => {
    if (path) {
      router.push(path);
      return;
    }
    router.back();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
      key={"back"}
        variants={rightToLeft}
        initial="hidden"
        animate="show"
        exit="hide"
        className={`text-white cursor-pointer flex gap-3  items-center w-max ${divClassName}`}
        onClick={() => {
          if (path) {
            onClick();
          } else Back();
        }}
      >
        <IoIosArrowRoundBack
          className="h-7 w-7"
          onClick={() => {
            if (path) {
              onClick();
            } else Back();
          }}
        />
        <p
          className={`${className}`}
          onClick={() => {
            if (path) {
              onClick();
            } else Back();
          }}
        >
          {label}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default GoBack;
