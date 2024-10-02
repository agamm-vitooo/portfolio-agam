import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import reactIcon from '../../assets/logo/react.png';
import vueIcon from '../../assets/logo/vue.png';
import angularIcon from '../../assets/logo/angular.png';
import tailwindIcon from '../../assets/logo/tailwind.png';
import alpineIcon from '../../assets/logo/nuxt.png';
import microfocus from '../../assets/logo/microfocus.png';
import javascript from '../../assets/logo/javascript.png';
import figma from '../../assets/logo/figma.png';

// Data array for the icons
const toolsData = [
  { id: 1, icon: reactIcon },
  { id: 2, icon: vueIcon },
  { id: 3, icon: angularIcon },
  { id: 4, icon: tailwindIcon },
  { id: 5, icon: alpineIcon },
  { id: 6, icon: microfocus },
  { id: 7, icon: javascript },
  { id: 8, icon: figma }
];

// Animation variants for the icons
const iconVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.5,
      ease: 'easeInOut',
      type: 'spring',
      stiffness: 100, // Bounce effect on entrance
    }
  }),
  hover: {
    scale: 1.3,
    rotate: [0, 10, -10, 0], // Added wobble effect
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  },
  tap: {
    scale: 0.9,
    rotate: -5,
    transition: { duration: 0.2 }
  }
};

const Tools = () => {
  // Parallax effect based on mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]); // Rotate based on Y-axis movement
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]); // Rotate based on X-axis movement

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section className="py-11">
      <div className="container mx-auto text-center">
        {/* Add mouse move event to the container for the parallax effect */}
        <div
          className="flex items-center justify-center flex-wrap gap-10"
          onMouseMove={handleMouseMove}
        >
          {toolsData.map((tool, index) => (
            <motion.div
              key={tool.id}
              className="relative flex flex-col items-center p-0 m-0"
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
              style={{
                rotateX,
                rotateY,
                perspective: 1000, // For the 3D effect
              }}
            >
              {/* Ripple effect on tap */}
              <div className="relative group">
                <img
                  src={tool.icon}
                  alt={`Icon ${tool.id}`}
                  className="w-16 h-16 object-contain filter grayscale transition duration-300 ease-in-out hover:grayscale-0 hover:brightness-125"
                />
                <span className="absolute inset-0 w-0 h-0 bg-blue-500 opacity-20 rounded-full group-active:w-20 group-active:h-20 group-active:opacity-0 transition-all duration-500"></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
