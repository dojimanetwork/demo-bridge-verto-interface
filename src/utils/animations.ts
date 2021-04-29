/**
 * Animation standard for card lists
 *
 * @param i List item key
 *
 * @returns Animation bindings for framer-motion
 */
export const cardListAnimation = (i: number) => ({
  initial: { opacity: 0, scale: 0.83 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.83 },
  transition: {
    duration: 0.23,
    ease: "easeInOut",
    delay: i * 0.023,
  },
});