import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import heroImage from '../../assets/images/hero-pic.png';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const fullText = "What is meant to happen, will happen";

  useEffect(() => {
    let index = 0;

    const typingEffect = () => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    };

    const typeInterval = setInterval(typingEffect, 120); // Adjust the speed of typing

    return () => clearInterval(typeInterval);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 500); // Cursor blinks every 500ms

    return () => clearInterval(cursorBlink);
  }, []);

  // Framer Motion animation variants for image
  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
    hover: { scale: 1.05, color: "#F1F1F1" }, // Slight zoom and color change on hover
  };

  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <section
      className="flex items-center justify-center relative overflow-hidden h-screen"
    >
      <div ref={ref} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
        {/* Image Section */}
        <motion.div
          className="flex justify-center lg:justify-start h-full order-1 lg:order-1"
          initial="hidden"
          animate={controls}
          variants={imageVariants}
        >
          <motion.img
            src={heroImage}
            alt="Agam Vito Asyhari"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="flex flex-col justify-between text-left order-2 lg:order-2 p-4 lg:p-8 h-full"
          initial="hidden"
          animate={controls}
          variants={textVariants}
          whileHover="hover"
        >
          {/* Spacer for the quote text to be centered */}
          <div className="flex-grow flex items-center justify-center lg:justify-start">
            {/* Typing Effect with Cursor */}
            <motion.blockquote
              className="text-4xl lg:text-6xl text-white font-oldstandard font-thin text-center lg:text-left"
              variants={textVariants}
            >
              {typedText}
              <span className={`inline-block text-white ml-1 ${isCursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                |
              </span> {/* Blinking Cursor */}
            </motion.blockquote>
          </div>

          {/* Name and Department Text */}
          <motion.div
            className="text-sm text-white font-thin font-poppins mt-8 lg:mt-auto mb-20 ml-8"
            variants={textVariants}
          >
            <motion.p
              className='font-normal'
              whileHover={{ color: "#FFD700", scale: 1.05 }}
            >
              Agam Vito Asyhari
            </motion.p>
            <motion.p whileHover={{ color: "#F1F1F1", scale: 1.05 }}>
              Informatics Engineering
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
