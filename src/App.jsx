import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import './App.css';

// ─── Background GIF layers ──────────────────────────────────────────────────
// Each section maps to a GIF. On scroll, we crossfade between them.
const BG_GIFS = [
  { id: 'hero',       src: '/bg-cover.gif',  section: '#about'      },
  { id: 'experience', src: '/bg-eyes.gif',   section: '#experience' },
  { id: 'projects',   src: '/bg-eyes2.gif',  section: '#projects'   },
  { id: 'skills',     src: '/bg-mouth.gif',  section: '#skills'     },
];

const ScrollBackground = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sectionEls = BG_GIFS.map(({ section }) =>
      document.querySelector(section)
    );

    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let best = 0;
      sectionEls.forEach((el, i) => {
        if (el && el.offsetTop <= scrollY) best = i;
      });
      setActiveIndex(best);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scroll-bg-root" aria-hidden="true">
      {BG_GIFS.map(({ id, src }, i) => (
        <div
          key={id}
          className={`scroll-bg-layer ${i === activeIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
      {/* dark scrim so text always has minimum contrast on top */}
      <div className="scroll-bg-scrim" />
    </div>
  );
};

// ─── Custom Cursor ───────────────────────────────────────────────────────────
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      const target = e.target;
      setIsHovering(
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        !!target.closest('a') ||
        !!target.closest('button')
      );
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

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => (
  <nav className="navbar blend-text">
    <div className="text-xl font-bold tracking-tighter">
      ODON.<span className="font-bold">NKONGOLO</span>
    </div>
    <div className="nav-links">
      <a href="#experience" className="nav-link">Experience</a>
      <a href="#projects"   className="nav-link">Projects</a>
      <a href="#skills"     className="nav-link">Skills</a>
    </div>
  </nav>
);

// ─── Projects data ────────────────────────────────────────────────────────────
const projects = [
  {
    id: 'cloud-market-tracker',
    title: 'Cloud-Native Market Tracker',
    subtitle: 'AWS EKS & DevSecOps Deployment',
    tags: ['Python', 'Docker', 'Terraform', 'Amazon EKS', 'GitHub Actions', 'Prometheus', 'Grafana', 'Trivy'],
    type: 'Personal Project',
    description:
      'A containerised Market Tracker application demonstrating modern Platform Engineering by completely decoupling application logic from infrastructure using Docker, Terraform, Amazon EKS, and GitHub Actions.',
    highlights: [
      { label: 'Automated Security Gates', detail: 'Every push triggers a DAG pipeline — Python code is linted and scanned (Ruff/Bandit), while infrastructure and containers are scanned for CVEs (TFLint/Trivy) before deployment.' },
      { label: 'Private Compute',          detail: 'Kubernetes worker nodes are strictly isolated within private subnets behind a NAT Gateway — inaccessible from the public internet.' },
      { label: 'Full Observability',       detail: 'Enterprise Prometheus & Grafana stack deployed via Helm into an isolated monitoring namespace for real-time cluster and pod utilisation metrics.' },
      { label: 'Modern Auth',              detail: 'EKS cluster uses the API_AND_CONFIG_MAP authentication mode for secure, programmatic IAM access from the GitHub runner.' },
    ],
    github: 'https://github.com/odonnkongolo/cloud-market-tracker',
  },
  {
    id: 'exacq-telemetry-ops',
    title: 'Enterprise CCTV Telemetry & GitOps Platform',
    subtitle: 'Edge Infrastructure & Camera Simulation',
    tags: ['AWS EC2', 'Terraform', 'K3s', 'GitHub Actions', 'Trivy', 'Prometheus', 'Grafana', 'Python', 'MediaMTX'],
    type: 'Personal Project',
    description:
      'An end-to-end GitOps platform to deploy, monitor, and manage a containerised CCTV RTSP stream simulator on edge infrastructure — demonstrating senior-level Platform Engineering: IaC, DevSecOps pipelines, and cost-optimised cloud deployments.',
    highlights: [
      { label: 'DevSecOps Pipeline',      detail: 'Security Gate (Trivy scan) runs on every push before Terraform provisions infrastructure, then EC2 user_data bootstraps K3s and applies Kubernetes manifests.' },
      { label: 'Kill Switch',             detail: 'A workflow_dispatch "Kill Switch" triggers terraform destroy from the GitHub UI, ensuring zero-cost when the environment is idle.' },
      { label: 'S3 State Locking',        detail: 'Terraform state managed remotely in S3 with native lock-file configurations to prevent race conditions across concurrent pipeline runs.' },
      { label: 'Edge Optimisation',       detail: 'Optimised to run within the strict 1 GB RAM limits of an AWS t3.micro — control plane and data plane consolidated into a lightweight K3s footprint.' },
    ],
    github: 'https://github.com/odonnkongolo/exacq-telemetry-ops',
  },
  {
    id: 'never404-platform',
    title: 'never404 Platform',
    subtitle: 'Automated GitOps & Observability Cluster',
    tags: ['Terraform', 'Ansible', 'K3s', 'Traefik', 'Cert-Manager', 'GitHub Actions', 'GHCR', 'Prometheus', 'Grafana', 'Python'],
    type: 'Live Production Platform',
    live: 'https://never404.co.uk',
    grafana: 'https://grafana.never404.co.uk',
    description:
      'A production GitOps platform built on a "Shift-Left" security philosophy — deploying a containerised Python Market Tracker to AWS Kubernetes with fully automated TLS routing and enterprise observability.',
    highlights: [
      { label: '4-Stage CI/CD',     detail: 'App CI (Ruff/Bandit) → Infra CI (Ansible-Lint) → Infra CD (Ansible playbook) → App CD (Docker/GHCR/K3s). Bad code never reaches live infrastructure.' },
      { label: 'Ansible SRE Fixes', detail: 'Ansible resolves AWS MTU packet fragmentation, OOM API crashes (2 GB swapfile), and TLS SAN verification — all automatically on every deploy.' },
      { label: 'Automated TLS',     detail: "Traefik ingress + Cert-Manager handles Let's Encrypt TLS with kubectl wait pre-flight checks to prevent CRD race conditions." },
    ],
    github: 'https://github.com/odonnkongolo/never404-platform',
  },
  {
    id: 'statefull-aws-migration',
    title: 'AWS Application Migration (MGN)',
    subtitle: 'Enterprise Windows Lift & Shift PoC',
    tags: ['AWS MGN', 'Windows Server', 'PostgreSQL', 'Tailscale', 'WireGuard', 'AWS VPC'],
    type: 'Enterprise PoC',
    description:
      'A live 48-hour Proof of Concept migration of a stateful on-premise Windows Server into AWS using AWS Application Migration Service (MGN) — including an Enterprise Video Management System backed by PostgreSQL managing 4 physical NVR appliances.',
    highlights: [
      { label: 'Tailscale over IPsec', detail: 'Bypassed costly AWS Site-to-Site VPN gateways by injecting Tailscale (WireGuard mesh) into the source VM, allowing the cloud instance to regain line-of-sight to local NVR hardware on boot.' },
      { label: 'Block-Level Replication', detail: 'The MGN agent performed continuous block-level sync of the entire C: drive to AWS, with a test instance validation step before final cutover.' },
      { label: 'Zero Data Loss',          detail: 'State replication finalised before the on-premise server was shut down — zero data loss while maintaining connectivity to 4 edge NVR devices via WireGuard tunnels.' },
      { label: 'FinOps Discipline',       detail: 'All AWS resources terminated post-validation, enforcing a strict zero-cost PoC cloud lifecycle.' },
    ],
    github: 'https://github.com/odonnkongolo/statefull-aws-migration',
  },
];

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      {/* Layered GIF backgrounds that crossfade on scroll */}
      <ScrollBackground />

      <div className="grain-overlay" />
      <CustomCursor />
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="hero-section container" id="about">
          <div className="flex-col gap-6" style={{ maxWidth: '800px' }}>
            <h1 className="text-6xl font-light tracking-tight leading-none blend-text">
              SRE &amp; Platform <br /><span className="font-bold">Engineer.</span>
            </h1>
            <p className="text-xl text-secondary mt-6 max-w-2xl blend-text">
              Analytical and energetic infrastructure engineer with over 4 years of experience
              managing complex hybrid and cloud-integrated systems.
              <br /><br />
              Committed to driving system reliability through automation, container orchestration,
              and DevSecOps principles.
            </p>
            <div className="flex gap-4 mt-8 flex-wrap">
              <a href="mailto:odonnkongolo@gmail.com" className="tag flex items-center gap-2 blend-text">
                <Mail size={16} /> odonnkongolo@gmail.com
              </a>
              <a href="tel:+447714290962" className="tag flex items-center gap-2 blend-text">
                <Phone size={16} /> +44 7714290962
              </a>
            </div>
            <div className="flex gap-6 mt-6 flex-wrap">
              <a href="https://linkedin.com/in/odon-nkongolo" target="_blank" rel="noreferrer" className="flex items-center gap-1 blend-text">LinkedIn</a>
              <a href="https://github.com/odonnkongolo"        target="_blank" rel="noreferrer" className="flex items-center gap-1 blend-text">GitHub</a>
              <a href="https://credly.com/users/odon-nkongolo" target="_blank" rel="noreferrer" className="flex items-center gap-1 blend-text">
                <ArrowUpRight size={20} /> Credly
              </a>
            </div>
          </div>
        </section>

        {/* ── Experience ───────────────────────────────────────────────── */}
        <section className="section-padding container" id="experience">
          <h2 className="text-4xl font-light mb-16 blend-text">
            Professional <span className="font-bold">Experience</span>
          </h2>
          <div className="experience-item">
            <div>
              <h3 className="text-2xl font-bold blend-text">Johnson Controls</h3>
              <p className="text-secondary mt-2 blend-text">Level 3 Technical Support Engineer</p>
              <p className="text-sm text-secondary mt-1 blend-text">Belfast, UK • June 2022 – Present</p>
            </div>
            <div className="flex-col gap-4 blend-text" style={{ color: 'var(--text-secondary)' }}>
              <p>• Lead technical point of contact for complex escalations, managing hybrid infrastructure and mission-critical physical security systems for high-end enterprise clients (e.g., Aviva Stadium, ADT).</p>
              <p>• Conduct deep-packet inspection and SQL debugging to resolve high-impact connectivity and data integrity issues, performing rigorous Root Cause Analysis (RCA).</p>
              <p>• Utilise SQL scripting and automated data checks to significantly reduce Mean Time to Resolution (MTTR) for critical data-related incidents.</p>
              <p>• Manage Hyper-V and VirtualBox environments to sandbox firmware diagnostics and execute patch testing prior to live production deployment.</p>
              <p>• Implement IAM and SSO protocols using MS Entra, Google Identity, and IdentityONE to harden system access and zero-trust security perimeters.</p>
              <p>• Execute QA testing on new software releases and log enhancement tickets in Jira to integrate seamlessly with the SDLC.</p>
            </div>
          </div>
        </section>

        {/* ── Projects ─────────────────────────────────────────────────── */}
        <section className="section-padding container" id="projects">
          <h2 className="text-4xl font-light mb-4 blend-text">
            Platform <span className="font-bold">Engineering</span>
          </h2>
          <p className="mb-16 blend-text" style={{ color: 'var(--text-secondary)', maxWidth: '600px' }}>
            A collection of personal and proof-of-concept projects demonstrating end-to-end cloud
            infrastructure, DevSecOps pipelines, and SRE practices.
          </p>

          <div className="flex-col gap-8">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-card-header">
                  <div className="flex-col gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="tag">{project.type}</span>
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="tag live-tag flex items-center gap-1">
                          <span className="live-dot" /> Live
                        </a>
                      )}
                    </div>
                    <h3 className="text-3xl font-bold mt-3">{project.title}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>{project.subtitle}</p>
                  </div>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-link-btn flex items-center gap-2">
                      GitHub <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>

                <div className="flex gap-2 my-6 flex-wrap">
                  {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                </div>

                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem' }}>
                  {project.description}
                </p>

                <div className="project-highlights">
                  {project.highlights.map((h) => (
                    <div key={h.label} className="highlight-item">
                      <h4 className="font-bold mb-1">{h.label}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{h.detail}</p>
                    </div>
                  ))}
                </div>

                {(project.live || project.grafana) && (
                  <div className="flex gap-4 mt-6 flex-wrap">
                    {project.live    && <a href={project.live}    target="_blank" rel="noreferrer" className="tag flex items-center gap-2"><ArrowUpRight size={14} />{project.live.replace('https://', '')}</a>}
                    {project.grafana && <a href={project.grafana} target="_blank" rel="noreferrer" className="tag flex items-center gap-2"><ArrowUpRight size={14} />{project.grafana.replace('https://', '')}</a>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills & Education ───────────────────────────────────────── */}
        <section className="section-padding container" id="skills">
          <div className="flex gap-16 flex-wrap" style={{ flexDirection: 'row' }}>
            <div className="w-full">
              <h2 className="text-4xl font-light mb-12 blend-text">Key <span className="font-bold">Skills</span></h2>
              <div className="flex-col gap-6">
                {[
                  { label: 'Cloud & IaC',                  value: 'AWS (EC2, S3, EKS, IAM, MGN), Terraform' },
                  { label: 'Containers & CI/CD',           value: 'Kubernetes (K3s, EKS), Docker, GitHub Actions, GitOps, Trivy, Ansible' },
                  { label: 'Observability & Networking',   value: 'Prometheus, Grafana, CloudWatch, Splunk, Wireshark, Deep-Packet Inspection, Traefik, Tailscale' },
                  { label: 'Identity & Virtualisation',    value: 'MS Entra, Google Identity, IdentityONE, Hyper-V, VirtualBox' },
                  { label: 'Databases',                    value: 'SQL Scripting, PostgreSQL, DB Administration' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <h4 className="text-lg font-bold mb-2 blend-text">{label}</h4>
                    <p style={{ color: 'var(--text-secondary)' }} className="blend-text">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-4xl font-light mb-12 blend-text">Certifications &amp; <span className="font-bold">Education</span></h2>
              <div className="flex-col gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 blend-text">Certifications</h3>
                  <ul className="flex-col gap-2">
                    {['ITS – Cloud Computing','ITS – Artificial Intelligence','ITS – Data Analytics','MTA – Database Administration','MTA – Software Development'].map(c => (
                      <li key={c} className="blend-text" style={{ color: 'var(--text-secondary)' }}>✓ {c}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4 blend-text">Education</h3>
                  <div className="flex-col gap-4">
                    <div>
                      <p className="font-bold blend-text">BSc Computer Science</p>
                      <p style={{ color: 'var(--text-secondary)' }} className="blend-text">Ulster University, Belfast • 2024</p>
                    </div>
                    <div>
                      <p className="font-bold blend-text">Extended Diploma in IT – Application Data Practitioner</p>
                      <p style={{ color: 'var(--text-secondary)' }} className="blend-text">Belfast Metropolitan College, Belfast • 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer container blend-text">
        <p>© {new Date().getFullYear()} Odon Nkongolo. All rights reserved.</p>
        <a href="#about" className="blend-text">Back to Top</a>
      </footer>
    </>
  );
}

export default App;
