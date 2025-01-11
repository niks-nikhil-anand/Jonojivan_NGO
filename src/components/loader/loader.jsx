import { motion } from 'framer-motion';
import { RotateLoader } from 'react-spinners';

const Loader = () => {
  return (
    <motion.div
      className="flex justify-center items-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <RotateLoader color="#3B82F6" size={15} />
    </motion.div>
  );
};

export default Loader;
