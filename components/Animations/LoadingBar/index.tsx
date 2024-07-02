import { AnimatePresence, motion } from "framer-motion";

const LoadingBar = ({ processdone }: any) => {
  return (
    <div
      className={`h-[6px] w-[100%] overflow-hidden  mt-[22px] md:mt-0  bg-[#0F3D2D]`}
    >
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          className="bg-[#00E794] h-full text-white m-0 p-0"
          initial={{ width: 0 }}
          animate={
            processdone
              ? {
                  width: ["80%", "100%"],
                  transition: {
                    duration: 1,
                  },
                }
              : {
                  width: ["0%", "80%"],
                  transition: {
                    duration: 5,
                  },
                }
          }
        />
      </AnimatePresence>
    </div>
  );
};

export default LoadingBar;
