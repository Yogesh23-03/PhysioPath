const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not authorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = String(email || '').trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (user.isVerified === false) {
            return res.status(403).json({ message: 'Your account could not be verified with the National Medical Commission. Please contact support.' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, rating: user.rating, ratingCount: user.ratingCount } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// For hackathon purposes, a quick register route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, licenseNumber, stateMedicalCouncil, photoUrl } = req.body;
        const normalizedEmail = String(email || '').trim().toLowerCase();
        const normalizedLicenseNumber = String(licenseNumber || '').trim();

        if (!/^[a-z0-9]+$/i.test(normalizedLicenseNumber) || normalizedLicenseNumber.length < 5) {
            return res.status(400).json({ message: 'Medical License Number must be alphanumeric and at least 5 characters.' });
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        const existingLicense = await User.findOne({ licenseNumber: normalizedLicenseNumber });
        if (existingLicense) {
            return res.status(409).json({ message: 'Medical license number already registered' });
        }

        const user = new User({
            name,
            email: normalizedEmail,
            password,
            licenseNumber: normalizedLicenseNumber,
            stateMedicalCouncil,
            photoUrl,
            isVerified: true
        });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/me', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Doctor not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/me', protect, async (req, res) => {
    try {
        const allowedFields = [
            'name',
            'email',
            'specialization',
            'yearsOfExperience',
            'address',
            'workingAt',
            'photoUrl',
            'documentName',
            'stateMedicalCouncil'
        ];

        const updates = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        });

        if (updates.email) {
            updates.email = String(updates.email).trim().toLowerCase();
            const existingEmail = await User.findOne({ email: updates.email, _id: { $ne: req.user.id } });
            if (existingEmail) {
                return res.status(409).json({ message: 'Email already registered' });
            }
        }

        if (updates.yearsOfExperience !== undefined) {
            updates.yearsOfExperience = Number(updates.yearsOfExperience);
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) return res.status(404).json({ message: 'Doctor not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
