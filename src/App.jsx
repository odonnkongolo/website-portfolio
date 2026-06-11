import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import './App.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('a') || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="text-xl font-bold tracking-tighter">
        ODON.<span className="text-accent-pink">NKONGOLO</span>
      </div>
      <div className="nav-links">
        <a href="#experience" className="nav-link">Experience</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#skills" className="nav-link">Skills</a>
      </div>
    </nav>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <div className="grain-overlay"></div>
      <CustomCursor />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero-section container" id="about">
          <div className="flex-col gap-6" style={{ maxWidth: '800px' }}>
            <h1 className="text-6xl font-light tracking-tight leading-none">
              SRE & Platform <br/><span className="font-bold">Engineer.</span>
            </h1>
            <p className="text-xl text-secondary mt-6 max-w-2xl">
              Analytical and energetic infrastructure engineer with over 4 years of experience managing complex hybrid and cloud-integrated systems. 
              <br/><br/>
              Committed to driving system reliability through automation, container orchestration, and DevSecOps principles.
            </p>
            <div className="flex gap-4 mt-8">
              <a href="mailto:odonnkongolo@gmail.com" className="tag flex items-center gap-2">
                <Mail size={16} /> odonnkongolo@gmail.com
              </a>
              <a href="tel:+447714290962" className="tag flex items-center gap-2">
                <Phone size={16} /> +44 7714290962
              </a>
            </div>
            <div className="flex gap-6 mt-6 text-secondary">
              <a href="https://linkedin.com/in/odon-nkongolo" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
                LinkedIn
              </a>
              <a href="https://github.com/odonnkongolo" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
                GitHub
              </a>
              <a href="https://credly.com/users/odon-nkongolo" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary">
                <ArrowUpRight size={20} /> Credly
              </a>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="section-padding container" id="experience">
          <h2 className="text-4xl font-light mb-16">Professional <span className="font-bold">Experience</span></h2>
          
          <div className="experience-item">
            <div>
              <h3 className="text-2xl font-bold">Johnson Controls</h3>
              <p className="text-secondary mt-2">Level 3 Technical Support Engineer</p>
              <p className="text-sm text-secondary mt-1">Belfast, UK • June 2022 – Present</p>
            </div>
            <div className="flex-col gap-4 text-secondary">
              <p>• Lead technical point of contact for complex escalations, managing hybrid infrastructure and mission-critical physical security systems for high-end enterprise clients (e.g., Aviva Stadium, ADT).</p>
              <p>• Conduct deep-packet inspection and SQL debugging to resolve high-impact connectivity and data integrity issues, performing rigorous Root Cause Analysis (RCA).</p>
              <p>• Utilise SQL scripting and automated data checks to significantly reduce Mean Time to Resolution (MTTR) for critical data-related incidents.</p>
              <p>• Manage Hyper-V and VirtualBox environments to sandbox firmware diagnostics and execute patch testing prior to live production deployment.</p>
              <p>• Implement IAM and SSO protocols using MS Entra, Google Identity, and IdentityONE to harden system access and zero-trust security perimeters.</p>
              <p>• Execute QA testing on new software releases and log enhancement tickets in Jira to integrate seamlessly with the SDLC.</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section-padding container" id="projects">
          <h2 className="text-4xl font-light mb-16">Platform <span className="font-bold">Engineering</span></h2>
          
          <div className="flex-col gap-8">
            <div className="project-card">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold">Enterprise Edge Telemetry & GitOps Platform</h3>
                <span className="tag">Personal Project</span>
              </div>
              <div className="flex gap-2 mb-8 flex-wrap">
                <span className="tag">GitHub Actions</span>
                <span className="tag">Terraform</span>
                <span className="tag">AWS (EC2, S3)</span>
                <span className="tag">K3s</span>
                <span className="tag">Prometheus</span>
                <span className="tag">Trivy</span>
              </div>
              <ul className="flex-col gap-4 text-secondary">
                <li>• <strong>Automated DevSecOps Pipelines:</strong> Engineered an end-to-end GitOps CI/CD pipeline using GitHub Actions to automatically deploy containerised workloads to AWS edge infrastructure.</li>
                <li>• <strong>Infrastructure as Code (IaC):</strong> Provisioned immutable AWS EC2 environments using Terraform, implementing S3 remote state management and native lockfiles.</li>
                <li>• <strong>Container Security:</strong> Integrated Trivy into the deployment pipeline to automate vulnerability scanning prior to cloud deployment.</li>
                <li>• <strong>Kubernetes Orchestration:</strong> Deployed a lightweight K3s cluster to orchestrate a Python-based RTSP camera simulator alongside an observability stack.</li>
                <li>• <strong>Cost Optimisation:</strong> Architected a decoupled pipeline with manual workflow dispatches to optimise AWS resource utilisation.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills & Education */}
        <section className="section-padding container" id="skills">
          <div className="flex gap-16 flex-wrap" style={{ flexDirection: 'row' }}>
            <div className="w-full">
              <h2 className="text-4xl font-light mb-12">Key <span className="font-bold">Skills</span></h2>
              <div className="flex-col gap-6">
                <div>
                  <h4 className="text-lg font-bold mb-2">Cloud & IaC</h4>
                  <p className="text-secondary">AWS (EC2, S3, IAM), Terraform</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Containers & CI/CD</h4>
                  <p className="text-secondary">Kubernetes (K3s), Docker, GitHub Actions, GitOps, Trivy</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Observability & Networking</h4>
                  <p className="text-secondary">Prometheus, Grafana, CloudWatch, Splunk, Wireshark, Deep-Packet Inspection</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Identity & Virtualisation</h4>
                  <p className="text-secondary">MS Entra, Google Identity, IdentityONE, Hyper-V, VirtualBox</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Databases</h4>
                  <p className="text-secondary">SQL Scripting, DB Administration</p>
                </div>
              </div>
            </div>
            
            <div className="w-full">
              <h2 className="text-4xl font-light mb-12">Certifications & <span className="font-bold">Education</span></h2>
              <div className="flex-col gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Certifications</h3>
                  <ul className="flex-col gap-2 text-secondary">
                    <li>✓ ITS – Cloud Computing</li>
                    <li>✓ ITS – Artificial Intelligence</li>
                    <li>✓ ITS – Data Analytics</li>
                    <li>✓ MTA – Database Administration</li>
                    <li>✓ MTA – Software Development</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4">Education</h3>
                  <div className="flex-col gap-4">
                    <div>
                      <p className="font-bold">BSc Computer Science</p>
                      <p className="text-secondary">Ulster University, Belfast • 2024</p>
                    </div>
                    <div>
                      <p className="font-bold">Extended Diploma in IT – Application Data Practitioner</p>
                      <p className="text-secondary">Belfast Metropolitan College, Belfast • 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer container text-accent-pink">
        <div>
          <p>© {new Date().getFullYear()} Odon Nkongolo. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#about" className="hover:text-primary">Back to Top</a>
        </div>
      </footer>
    </>
  );
}

export default App;
