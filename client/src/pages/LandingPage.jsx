import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import {
    ArrowRight,
    Check,
    ChevronDown,
    ClipboardList,
    LogIn,
    Menu,
    QrCode,
    Smartphone,
    Sparkles,
    WifiOff,
    X
} from 'lucide-react';

const featureCards = [
    {
        tag: 'Plan Builder',
        icon: ClipboardList,
        title: 'Therapist Plan Creator',
        description: 'Build illustrated exercise plans in minutes. No tech skills needed.',
        tone: 'mint'
    },
    {
        tag: 'Offline First',
        icon: WifiOff,
        title: 'Works Without Internet',
        description: 'Patients follow plans fully offline after the first load. PWA powered.',
        tone: 'amber'
    },
    {
        tag: 'AI Illustrated',
        icon: Sparkles,
        title: 'Gemini-Powered Illustrations',
        description: 'AI generates exercise illustrations automatically from your step descriptions.',
        tone: 'violet'
    }
];

const whyCards = [
    ['🏃', 'Zero Re-injury Risk', 'Illustrated steps prevent wrong form'],
    ['📵', 'Truly Offline', 'Service Worker + IndexedDB — no data needed'],
    ['⚡', '5-Minute Setup', 'Therapist creates and shares a plan in minutes'],
    ['🔒', 'No Login Required', 'Patients just open a link — zero friction']
];

const flowSteps = [
    ['Therapist', ClipboardList],
    ['URL Encoding', QrCode],
    ['Patient First Load', Smartphone],
    ['Forever Offline', WifiOff]
];

const navItems = [
    ['How It Works', 'how'],
    ['For Therapists', 'therapists'],
    ['For Patients', 'patients'],
    ['Features', 'features']
];

const ThreeHeroScene = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return undefined;

        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 8, 30);

        const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 14);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);

        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.05,
            transmission: 1,
            thickness: 1,
            transparent: true,
            opacity: 0.42,
            metalness: 0
        });

        const shapes = [
            new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.28, 24, 80), glassMaterial),
            new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 3.4, 48), glassMaterial),
            new THREE.Mesh(new THREE.SphereGeometry(1.05, 48, 48), glassMaterial)
        ];

        shapes[0].position.set(-5.5, 1.7, -2);
        shapes[1].position.set(4.8, -1.5, -1);
        shapes[1].rotation.z = 0.8;
        shapes[2].position.set(1.5, 2.7, -3);
        shapes.forEach((shape) => scene.add(shape));

        const mintLight = new THREE.PointLight(0x2d6a4f, 35, 22);
        mintLight.position.set(-6, 3, 5);
        const amberLight = new THREE.PointLight(0xf5a623, 30, 22);
        amberLight.position.set(6, -1, 5);
        scene.add(mintLight, amberLight, new THREE.AmbientLight(0xffffff, 1.6));

        const particleGeometry = new THREE.BufferGeometry();
        const positions = [];
        for (let index = 0; index < 80; index += 1) {
            positions.push((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12);
        }
        particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const particles = new THREE.Points(
            particleGeometry,
            new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.85 })
        );
        scene.add(particles);

        let frameId;
        const animate = (time) => {
            const seconds = time * 0.001;
            shapes.forEach((shape, index) => {
                shape.rotation.y += 0.004 + index * 0.001;
                shape.position.y += Math.sin(seconds + index) * 0.0025;
            });
            const particlePositions = particles.geometry.attributes.position.array;
            for (let index = 1; index < particlePositions.length; index += 3) {
                particlePositions[index] += 0.006;
                if (particlePositions[index] > 6) particlePositions[index] = -6;
            }
            particles.geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate(0);

        const handleResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            mount.removeChild(renderer.domElement);
            particleGeometry.dispose();
            glassMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return <div className="landing-three-scene" ref={mountRef} aria-hidden="true" />;
};

const TiltCard = ({ children, className = '', ...props }) => {
    const ref = useRef(null);

    const handleMove = (event) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -16;
        node.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    };

    const handleLeave = () => {
        if (ref.current) ref.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    return (
        <article ref={ref} className={`tilt-card ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave} {...props}>
            {children}
        </article>
    );
};

const LandingPage = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(4);
    const [confetti, setConfetti] = useState(false);
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.18 });

        document.querySelectorAll('.fade-up, .flow-node').forEach((node) => observer.observe(node));
        return () => observer.disconnect();
    }, []);

    const handleDemoSubmit = (event) => {
        event.preventDefault();
        setConfetti(true);
        window.setTimeout(() => setConfetti(false), 900);
    };

    const scrollToSection = (sectionId) => {
        const target = document.getElementById(sectionId);
        if (!target) return;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setNavOpen(false);
    };

    return (
        <div className="landing-page">
            <ThreeHeroScene />

            <nav className="landing-nav">
                <Link to="/" className="landing-logo">
                    <span>💊</span>
                    <strong>PhysioPath</strong>
                </Link>
                <div className={`landing-links ${navOpen ? 'open' : ''}`}>
                    {navItems.map(([label, sectionId]) => (
                        <button key={sectionId} type="button" onClick={() => scrollToSection(sectionId)}>
                            {label}
                        </button>
                    ))}
                </div>
                <button
                    className="landing-menu-btn"
                    type="button"
                    onClick={() => setNavOpen((value) => !value)}
                    aria-label="Toggle navigation"
                    aria-expanded={navOpen}
                >
                    {navOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
                <button className="amber-cta ripple-btn" onClick={() => navigate('/login')}>Get Started</button>
            </nav>

            <header className="landing-hero">
                <section className="hero-copy">
                    <span className="hero-badge">🏥 Physiotherapy Made Simple</span>
                    <h1 aria-label="Recover Smarter. Exercise Right.">
                        {['Recover', 'Smarter.', 'Exercise', 'Right.'].map((word, index) => (
                            <span key={word} style={{ '--delay': `${0.12 + index * 0.12}s` }}>{word}</span>
                        ))}
                    </h1>
                    <p>Your therapist creates the plan. You follow it — anywhere, anytime. No internet needed.</p>
                    <div className="hero-actions">
                        <button className="mint-cta" onClick={() => navigate('/login')}>I'm a Therapist <ArrowRight size={18} /></button>
                        <button className="glass-cta" type="button" onClick={() => scrollToSection('patients')}>I'm a Patient <ArrowRight size={18} /></button>
                    </div>
                </section>

                <section className="device-stage" aria-label="PhysioPath app previews">
                    <div className="device-glow" />
                    <div className="laptop-mockup">
                        <div className="mock-toolbar"><span /><span /><span /></div>
                        <div className="mock-screen-grid">
                            <div className="mock-form">
                                <strong>Create Plan</strong>
                                <label>Exercise Name</label>
                                <div>Glute Bridges</div>
                                <label>Steps</label>
                                <p>⠿ Lie on your back</p>
                                <p>⠿ Lift hips slowly</p>
                                <button>Generate QR</button>
                            </div>
                            <div className="mock-preview">
                                <ClipboardList size={26} />
                                <strong>Patient Preview</strong>
                                <span>3 sets x 12 reps</span>
                            </div>
                        </div>
                    </div>
                    <div className="phone-mockup">
                        <span className="phone-notch" />
                        <img src="/glutebridges.jpeg" alt="" />
                        <strong>Glute Bridges</strong>
                        <p>Follow illustrated steps</p>
                        <div className="rep-dots"><i /><i /><i /></div>
                    </div>
                </section>

                <button className="scroll-indicator" type="button" onClick={() => scrollToSection('features')} aria-label="Scroll to features">
                    <ChevronDown />
                </button>
            </header>

            <main>
                <section id="features" className="landing-section feature-row">
                    {featureCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <article key={card.title} className={`feature-card glass-card hover-lift fade-up ${card.tone}`} style={{ '--delay': `${index * 0.15}s` }}>
                                <div className="feature-icon"><Icon /></div>
                                <span>{card.tag}</span>
                                <h2>{card.title}</h2>
                                <p>{card.description}</p>
                            </article>
                        );
                    })}
                </section>

                <section id="how" className="landing-section">
                    <div className="section-title fade-up">
                        <h2>How PhysioPath Works</h2>
                        <p>Two users. Two experiences. One seamless system.</p>
                    </div>
                    <div className="showcase-grid">
                        <TiltCard className="showcase-card therapist-showcase glass-card fade-up" id="therapists">
                            <div className="mini-builder-ui">
                                <label>Exercise name</label>
                                <strong>Wall Slides</strong>
                                <p>⠿ Press arms gently against wall</p>
                                <p>⠿ Slide upward slowly</p>
                                <button>Generate QR</button>
                            </div>
                            <h3>👨‍⚕️ Therapist — Plan Creator</h3>
                            {['Fill exercise name, reps, steps, mistakes', 'Preview exactly what patient sees', 'Share link or QR code — done'].map((item) => (
                                <p key={item}><Check size={17} /> {item}</p>
                            ))}
                        </TiltCard>

                        <TiltCard className="showcase-card patient-showcase glass-card fade-up" id="patients">
                            <div className="mini-phone-ui">
                                <img src="/anklepumps.jpeg" alt="" />
                                <strong>Ankle Pumps</strong>
                                <span>Step-by-step guide</span>
                                <div className="rep-dots"><i /><i /><i /><i /></div>
                                <div className="timer-ring">30s</div>
                            </div>
                            <h3>🧑‍🦽 Patient — Exercise Viewer</h3>
                            {['Open link once — no login ever', 'Follow illustrated step-by-step guide', 'Track reps, rest timer — works offline'].map((item) => (
                                <p key={item}><Check size={17} /> {item}</p>
                            ))}
                        </TiltCard>
                    </div>
                </section>

                <section className="landing-section why-section">
                    <div className="section-title fade-up">
                        <h2>Why PhysioPath?</h2>
                    </div>
                    <div className="why-grid">
                        {whyCards.map(([icon, title, description], index) => (
                            <article className="why-card glass-card fade-up" style={{ '--delay': `${index * 0.1}s` }} key={title}>
                                <span>{icon}</span>
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="landing-section offline-panel">
                    <div className="section-title fade-up">
                        <h2>How Offline Works</h2>
                    </div>
                    <div className="flow-line" />
                    <div className="flow-grid">
                        {flowSteps.map(([label, Icon], index) => (
                            <article className="flow-node" style={{ '--delay': `${index * 0.2}s` }} key={label}>
                                <Icon size={24} />
                                <strong>Step {index + 1}</strong>
                                <span>{label}</span>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="landing-cta-section">
                    <div className="cta-copy fade-up">
                        <h2>Ready to Try PhysioPath?</h2>
                        <p>Built for hackathon. Designed for real recovery.</p>
                        <div className="hero-actions">
                            <button className="mint-cta" onClick={() => navigate('/login')}>Therapist Demo <ArrowRight size={18} /></button>
                            <button className="glass-cta" type="button" onClick={() => scrollToSection('patients')}>Patient Demo <ArrowRight size={18} /></button>
                        </div>
                    </div>
                    <form className="demo-form glass-card fade-up" onSubmit={handleDemoSubmit}>
                        <div className="landing-field">
                            <input placeholder=" " required />
                            <label>Your Name</label>
                        </div>
                        <div className="landing-field">
                            <input placeholder=" " required />
                            <label>Exercise Plan Name</label>
                        </div>
                        <div className="demo-stepper">
                            <span>Number of Exercises</span>
                            <button type="button" onClick={() => setCount(Math.max(1, count - 1))}>-</button>
                            <strong>{count}</strong>
                            <button type="button" onClick={() => setCount(count + 1)}>+</button>
                        </div>
                        <button className="amber-cta btn-shimmer confetti-origin" type="submit">
                            Generate Demo Link
                            {confetti && Array.from({ length: 12 }).map((_, index) => <i key={index} style={{ '--dot': index }} />)}
                        </button>
                    </form>
                </section>
            </main>

            <footer className="landing-footer">
                <div>
                    <Link to="/" className="landing-logo"><span>💊</span><strong>PhysioPath</strong></Link>
                    <p>Offline-first physiotherapy exercise cards.</p>
                    <small>© 2026 PhysioPath Hackathon</small>
                </div>
                <nav>
                    {navItems.map(([label, sectionId]) => (
                        <button key={sectionId} type="button" onClick={() => scrollToSection(sectionId)}>
                            {label}
                        </button>
                    ))}
                </nav>
                <div className="footer-actions">
                    <Link to="/login"><LogIn size={17} /> Therapist Login</Link>
                    <a href="https://github.com" target="_blank" rel="noreferrer"><span aria-hidden="true">GH</span> GitHub</a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
