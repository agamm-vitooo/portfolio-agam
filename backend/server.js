// Import necessary modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint untuk pengiriman email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Validasi input
    if (!name || !email || !message) {
        return res.status(400).json({ status: 'fail', error: 'Semua field harus diisi' });
    }

    // Setup Nodemailer dengan App Password Gmail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Email pengirim dari .env
            pass: process.env.EMAIL_PASS, // App password Gmail dari .env
        },
    });

    // Konfigurasi email
    let mailOptions = {
        from: `"${name}" <${email}>`, // Nama dan email pengirim
        to: process.env.EMAIL_TO || 'timesquare313131@gmail.com', // Email penerima dari .env atau default
        subject: `New Contact Form Submission from ${name}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
    };

    // Kirim email menggunakan Nodemailer
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error saat mengirim email:', error.message); // Menampilkan error rinci di terminal
            return res.status(500).json({ status: 'fail', error: 'Gagal mengirim email.', details: error.message });
        } else {
            console.log('Email berhasil dikirim:', info.response);
            return res.status(200).json({ status: 'success', info: info.response });
        }
    });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});