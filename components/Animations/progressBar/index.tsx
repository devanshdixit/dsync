import { AnimatePresence, motion } from "framer-motion";

const ProgressBar = ({ percentage, width }: any) => {
  return (
    <div
      className={`h-[6px] w-[100%] overflow-hidden  mt-[22px] md:mt-0 md:w-[${width}px] bg-[#3D3D3E]`}
    >
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          className="bg-[#858585] h-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          // animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1,
            // delay: 0.5,
            // type: "spring",
            // damping: 10,
            // stiffness: 100,
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default ProgressBar;
