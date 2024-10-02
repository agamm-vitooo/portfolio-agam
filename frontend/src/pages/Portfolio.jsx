import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Website HRIS ( Ongoing )',
    description: 'Pembuatan Website HRIS ( Human Resource Information System ) menggunakan MERN ( MongoDB Express React Node ) ( Ongoing ).',
    githubLink: '#',
    demoLink: '#',
    image: 'https://via.placeholder.com/400x200?text=Project+1+Image',
  },
  {
    id: 2,
    title: 'Website Media Pembelajaran',
    description: 'Lomba pembuatan website untuk media pembelajaran Kabupaten Wonogiri.',
    githubLink: '#',
    demoLink: '#',
    image: 'https://via.placeholder.com/400x200?text=Project+2+Image',
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.8,
      type: 'spring',
      stiffness: 50,
      staggerChildren: 0.3,
    },
  },
};

const projectVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
    transition: {
      duration: 0.3,
    },
  }
};

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.3 },
    backgroundColor: "#f0f0f0",
  },
  tap: {
    scale: 0.95,
    backgroundColor: "#e0e0e0",
  },
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.3 },
    rotate: [0, 5, -5, 0], // Goyang kanan kiri
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
  },
};

const Portfolio = () => {
  return (
    <motion.section
      className="min-h-screen text-white flex flex-col items-center justify-center p-4 md:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8"
        variants={projectVariants}
        whileHover={{ scale: 1.05, color: '#f0f0f0' }}
        transition={{ duration: 0.3 }}
      >
        Portfolio
      </motion.h1>
      
      <div className="space-y-8 md:space-y-10">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6"
            initial="hidden"
            whileInView="visible"
            variants={projectVariants}
            whileHover="hover"
          >
            {/* Text Section */}
            <motion.div
              className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg w-full max-w-lg"
              variants={projectVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)" }}
            >
              <h2 className="text-xl md:text-2xl text-black font-bold mb-4">{project.title}</h2>
              <p className="text-black mb-4">{project.description}</p>
              <div className="flex space-x-4">
                <motion.a
                  href={project.githubLink}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                  whileHover={buttonVariants.hover}
                  whileTap={buttonVariants.tap}
                  transition={{ duration: 0.3 }}
                >
                  Github
                </motion.a>
                <motion.a
                  href={project.demoLink}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
                  whileHover={buttonVariants.hover}
                  whileTap={buttonVariants.tap}
                  transition={{ duration: 0.3 }}
                >
                  Demo
                </motion.a>
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              className="w-full max-w-lg"
              variants={imageVariants}
              whileHover="hover"
            >
              <img src={project.image} alt={project.title} className="rounded-lg shadow-lg" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div className="mt-8 md:mt-12" variants={projectVariants}>
        <h1 className="mb-2 font-bold text-lg md:text-xl">See Other Projects?</h1>
        <a href="https://github.com/agamm-vitooo" target="_blank" rel="noopener noreferrer">
          <motion.button
            className="px-4 py-2 md:px-6 md:py-3 bg-white text-black rounded hover:bg-gray-200"
            whileHover={buttonVariants.hover}
            whileTap={buttonVariants.tap}
            variants={buttonVariants}
          >
            Learn More
          </motion.button>
        </a>
      </motion.div>
    </motion.section>
  );
};

export default Portfolio;
