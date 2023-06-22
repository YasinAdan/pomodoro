export const pageAnimation = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const signupAnimation = {
  hidden: {
    opacity: 0,
    x: -900,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.75,
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const loginAnimation = {
  hidden: {
    opacity: 0,
    y: -900,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      when: "beforeChildren",
      staggerChildren: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fade = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

export const titleAnim = {
  hidden: { y: 200 },
  show: {
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

// animation for about page
// left section animation

export const ALAnim = {
  hidden: {
    opacity: 0,
    x: -1000,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
  exit: {
    x: -1000,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// right section animation
export const ARAnim = {
  hidden: {
    opacity: 0,
    x: 1000,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
  exit: {
    x: 1000,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

// animation for session page, bring up the cards from bottom to top
export const cardAnim = {
  hidden: {
    opacity: 0,
    y: 1000,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
  exit: {
    y: 1000,
    transition: { duration: 0.25, ease: "easeOut" },
  },
}

// animation for zone page

// past-sessions section will come from left side
export const pastSessionsAnim = {
  hidden: {
    opacity: 0,
    x: -1000,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
  exit: {
    x: -1000,
    transition: { duration: 0.25, ease: "easeOut" },
  }
}
// todo section
export const todoAnim = {
  hidden: {
    opacity: 0,
    x: 1000,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
  exit: {
    x: 1000,
    transition: { duration: 0.25, ease: "easeOut" },
  }
}

export const timerAnim = {
  hidden: {
    opacity: 0,
    y: -150,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
  exit: {
    y: -150,
    transition: { duration: 0.25, ease: "easeOut" },
  },
}

export const playerAnim = {
  hidden: {
    opacity: 0,
    y: 1000,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
  exit: {
    y: 1000,
    transition: { duration: 0.25, ease: "easeOut" },
  },
}

// export const menuBtnAnim = {
//   hidden: {
//     opacity: 0,
//     y: 100,
//   },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.75, ease: "easeOut" },
//   },
// }