// Modal.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: '-50px' },
  visible: { opacity: 1, y: '0px' },
};

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  return (
    <>
      {show && (
        <motion.div
          className="fixed bg-black bg-opacity-30 backdrop-blur-[1px] flex items-center justify-center inset-0 z-[50]"
          onClick={onClose}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 1 }}
        >
            <div>{children}</div>
        </motion.div>
      )}
    </>
  );
};

export default Modal;
