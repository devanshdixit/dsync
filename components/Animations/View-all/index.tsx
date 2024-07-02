//Top to bottom fade in-
export const topFadeIn = {
  hidden: {
    opacity: 0,
    y: -200,
    exitBeforeEnter: true,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
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

// card parent staggering effect-
export const cards = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// card children scaling fadein effect-
export const card = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    exitBeforeEnter: true,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  hide: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 0.3,
      //   delay: 0.5,
    },
  },
};

// back button right to left fadein effect-
export const rightToLeft = {
  hidden: {
    opacity: 0,
    x: 50,
    exitBeforeEnter: true,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
  hide: {
    opacity: 0,
    x: -50,
    transition: {
      duration: 0.3,
    },
  },
};
