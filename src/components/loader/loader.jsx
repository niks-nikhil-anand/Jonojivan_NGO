import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      className="flex justify-center items-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default Loader;
