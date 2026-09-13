import { motion, HTMLMotionProps } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { type: "spring", stiffness: 500, damping: 30 },
};

const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 },
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export const variants = {
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInRight,
  staggerContainer,
  staggerItem,
  pageTransition,
};

export function MotionDiv(props: HTMLMotionProps<"div">) {
  return <motion.div {...props} />;
}

export function MotionSpan(props: HTMLMotionProps<"span">) {
  return <motion.span {...props} />;
}

export function MotionButton(props: HTMLMotionProps<"button">) {
  return <motion.button {...props} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />;
}

export function MotionLink(props: HTMLMotionProps<"a">) {
  return <motion.a {...props} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />;
}