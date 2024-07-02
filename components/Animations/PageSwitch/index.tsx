//Bottom to top fade in
export const pageBottomToTop = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hide: {
    opacity: 0,
    y: -200,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
