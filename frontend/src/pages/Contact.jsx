import React from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  // Define animation variants for fields
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submit behavior

    // Get form data
    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
    };

    // Send form data to backend
    fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          toast.success('Email berhasil dikirim!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('Gagal mengirim email.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Terjadi kesalahan saat mengirim email.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section: Map */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full md:w-2/3 relative cursor-pointer"
      >
        <iframe
          title="map"
          className="w-full h-64 md:h-full"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.92018113828146!2d106.72152067902135!3d-6.167849117821591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f827b95decdf%3A0x55a8b237043f1f69!2sJl.%20Al-Barokah%20II%20No.136%208%2C%20RT.8%2FRW.1%2C%20Duri%20Kosambi%2C%20Kecamatan%20Cengkareng%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011750!5e0!3m2!1sid!2sid!4v1727881430988!5m2!1sid!2sid"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </motion.div>

      {/* Right Section: Contact Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/3 bg-black text-white flex flex-col justify-center items-center p-4 md:p-10"
      >
        <h1 className="text-3xl md:text-4xl font-semibold mb-2 font-poppins">Get in Touch</h1>
        <p className='mb-6 text-center text-sm md:text-base font-poppins'>
          We'd love to hear from you! Please fill out the form below to reach out regarding any inquiries or collaborations
        </p>

        {/* Form Container with Stagger Effect */}
        <motion.form
          className="w-full space-y-4 md:space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
        >
          {/* Name Input Field */}
          <motion.input
            type="text"
            placeholder="Name"
            className="w-full p-2 md:p-3 text-white rounded-md focus:outline-none"
            variants={formVariants}
            whileFocus={{ scale: 1.05 }}
          />

          {/* Email Input Field */}
          <motion.input
            type="email"
            placeholder="Email"
            className="w-full p-2 md:p-3 text-white rounded-md focus:outline-none"
            variants={formVariants}
            whileFocus={{ scale: 1.05 }}
          />

          {/* Message Text Area */}
          <motion.textarea
            placeholder="Message"
            className="w-full p-2 md:p-3 h-24 md:h-32 text-white rounded-md focus:outline-none"
            variants={formVariants}
            whileFocus={{ scale: 1.05 }}
          />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: '#f5f5f5' }}
            whileTap={{ scale: 0.95, backgroundColor: '#e0e0e0' }}
            type="submit"
            className="w-full bg-white text-black p-2 md:p-3 rounded-md"
          >
            Submit
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default Contact;
