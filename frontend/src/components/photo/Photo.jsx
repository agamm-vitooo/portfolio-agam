import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import photoSection from '../../assets/images/photo-section.png';

const Photo = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // Hanya akan ter-trigger saat 20% elemen terlihat
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="text-center text-white"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h1
          className="text-2xl mb-4 font-thin font-oldstandard"
          variants={textVariants}
        >
          "Practice makes perfect"
        </motion.h1>
        <motion.div
          className="bg-gray-800 rounded-lg overflow-hidden"
          whileHover={{ scale: 1.1 }}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          <motion.img
            src={photoSection}
            alt="Coding Practice"
            className="mx-auto max-w-full"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2, rotate: 2 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Photo;
