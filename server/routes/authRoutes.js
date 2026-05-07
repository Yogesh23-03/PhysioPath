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

const smcIdMap = {
    'Andhra Pradesh': 1,
    'Arunachal Pradesh': 2,
    Assam: 3,
    Bihar: 4,
    Chhattisgarh: 5,
    Goa: 6,
    Gujarat: 7,
    Haryana: 8,
    'Himachal Pradesh': 9,
    Jharkhand: 10,
    Karnataka: 11,
    Kerala: 12,
    'Madhya Pradesh': 13,
    Maharashtra: 14,
    Manipur: 15,
    Meghalaya: 16,
    Mizoram: 17,
    Nagaland: 18,
    Odisha: 19,
    Punjab: 20,
    Rajasthan: 21,
    Sikkim: 22,
    'Tamil Nadu': 23,
    Telangana: 24,
    Tripura: 25,
    'Uttar Pradesh': 26,
    Uttarakhand: 27,
    'West Bengal': 28,
    Delhi: 29
};

const collectRecords = (payload) => {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.result)) return payload.result;
    if (Array.isArray(payload.records)) return payload.records;
    if (Array.isArray(payload.doctors)) return payload.doctors;
    if (typeof payload === 'object') {
        return Object.values(payload).flatMap((value) => collectRecords(value));
    }
    return [];
};

const normalizeRegistrationNumber = (value) => String(value || '').replace(/[\s-]/g, '').toLowerCase();

const demoVerifiedDoctors = [
    { licenseNumber: 'DEMO12345', stateMedicalCouncil: 'Karnataka' }
];

const verifyWithNMC = async (licenseNumber, stateMedicalCouncil) => {
    // Hackathon/demo path: never depend on the public NMC service for demo accounts.
    if (normalizeRegistrationNumber(licenseNumber).startsWith('demo')) {
        return true;
    }

    const isDemoVerified = demoVerifiedDoctors.some((doctor) => (
        normalizeRegistrationNumber(doctor.licenseNumber) === normalizeRegistrationNumber(licenseNumber) &&
        doctor.stateMedicalCouncil === stateMedicalCouncil
    ));
    if (isDemoVerified) return true;

    const smcId = smcIdMap[stateMedicalCouncil];
    if (!smcId) return false;

    const url = new URL('https://www.nmc.org.in/MCIRest/open/getDataFromService');
    url.searchParams.set('service', 'searchDoctor');
    url.searchParams.set('registrationNo', licenseNumber);
    url.searchParams.set('smcId', String(smcId));

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
            throw new Error(`NMC request failed with status ${response.status}`);
        }
        const payload = await response.json();
        const expected = normalizeRegistrationNumber(licenseNumber);
        return collectRecords(payload).some((record) => (
            normalizeRegistrationNumber(record.registrationNo || record.registration_no || record.regNo || record.regnNo) === expected
        ));
    } finally {
        clearTimeout(timeout);
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

        let isVerified = false;
        try {
            isVerified = await verifyWithNMC(normalizedLicenseNumber, stateMedicalCouncil);
        } catch (verificationError) {
            console.error('NMC verification error:', verificationError);
            return res.status(503).json({ message: 'Verification service is temporarily unavailable. Please try again later.' });
        }

        if (!isVerified) {
            return res.status(400).json({
                message: 'We could not verify your license number with the National Medical Commission. Please check your registration number and selected state council.'
            });
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
