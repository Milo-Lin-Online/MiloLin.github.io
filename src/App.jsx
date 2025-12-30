import { useState } from 'react';
import { Play, X, Mail, Youtube, Linkedin, ChevronRight, Home, Maximize } from 'lucide-react';

const portfolioData = {
  '3d': {
    title: '3D WORK',
    subtitle: 'Environment Art & Animation',
    demoReelId: 'dQw4w9WgXcQ',
    projects: [
      { id: 1, title: 'TimeLapse in Judgement', subtitle: 'Short Film', tools: 'Blender, Substance Painter', thumb: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop', bullets: ['Environment modeling and set design', 'Lighting and composition', 'Material development in Substance Painter', 'Final rendering and post-processing'] },
      { id: 2, title: 'RenderMan Pixar Challenge', subtitle: 'Competition Entry', tools: 'Maya, RenderMan', thumb: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=400&fit=crop', bullets: ['Stylized environment creation', 'Advanced RenderMan shading', 'Lighting design and mood setting', 'Competition submission and presentation'] },
      { id: 3, title: '24 Hour Animation Challenge', subtitle: 'Placed 49th/700', tools: 'Blender', thumb: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop', bullets: ['Rapid prototyping and iteration', 'Efficient workflow optimization', 'Strong composition under time pressure', 'Complete scene from concept to render'] },
      { id: 4, title: 'Kinetic Rush', subtitle: 'Pwnisher Challenge', tools: 'Blender, After Effects', thumb: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&h=400&fit=crop', bullets: ['Dynamic environment design', 'Motion and energy emphasis', 'Camera animation and movement', 'Compositing in After Effects'] },
      { id: 5, title: 'Blizzard Art Challenge', subtitle: 'Environment Art', tools: 'Blender, Substance Painter', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', bullets: ['Custom painted textures', 'Procedural foliage with geonodes', 'Stylized art direction', 'Full environment composition'] },
      { id: 6, title: 'Unstable Animation Jam', subtitle: 'Short Film', tools: 'Blender, Cloth Sim', thumb: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&h=400&fit=crop', bullets: ['Collaborative animation project', 'Cloth simulation setup', 'Environment based on Taiwan memories', 'Character integration and lighting'] },
    ]
  },
  techart: {
    title: 'TECH ART',
    subtitle: 'Shaders, Tools & Technical Solutions',
    demoReelId: 'dQw4w9WgXcQ',
    projects: [
      { id: 1, title: 'XGen Hair System', subtitle: 'Maya Pipeline', tools: 'Maya XGen, MEL', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', bullets: ['Custom grooming pipeline', 'Dynamic simulation setup', 'MEL scripting for automation', 'Production-ready hair assets'] },
      { id: 2, title: 'Procedural Foliage', subtitle: 'Geometry Nodes', tools: 'Blender, Geometry Nodes', thumb: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&h=400&fit=crop', bullets: ['Procedural vine distribution', 'Optimized viewport performance', 'Customizable parameters', 'Reusable node group library'] },
      { id: 3, title: 'Cloth Simulation', subtitle: 'Physics Setup', tools: 'Blender, Marvelous Designer', thumb: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop', bullets: ['Wind-reactive cloth system', 'Alpha texturing support', 'Collision optimization', 'Animation-ready setups'] },
      { id: 4, title: 'Custom Shaders', subtitle: 'Material Development', tools: 'Blender Shader Nodes', thumb: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=400&fit=crop', bullets: ['Toon shading systems', 'Holographic effects', 'Procedural patterns', 'Stylized material library'] },
      { id: 5, title: 'Particle Systems', subtitle: 'VFX Tools', tools: 'Houdini, Blender', thumb: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=600&h=400&fit=crop', bullets: ['Reusable VFX presets', 'Environmental effects', 'Optimized for real-time', 'Cross-software compatibility'] },
      { id: 6, title: 'Auto-Rig Tool', subtitle: 'Python Script', tools: 'Maya, Python', thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop', bullets: ['Automated bipedal rigging', 'FK/IK switching system', 'Custom control shapes', 'Artist-friendly interface'] },
    ]
  },
  video: {
    title: 'VIDEO & MARKETING',
    subtitle: 'Motion Design & Brand Content',
    demoReelId: 'dQw4w9WgXcQ',
    workExperience: [
      { company: 'LOH Studio', role: 'Motion Graphics Artist', period: '2024', projects: ['Brand Identity Package', 'Product Launch Series', 'Social Media Campaign'] },
      { company: 'Northeastern University', role: 'Video Production Assistant', period: '2023-2024', projects: ['Event Coverage', 'Promotional Videos', 'Documentary Work'] },
      { company: 'Freelance', role: 'Video Editor & Designer', period: '2022-Present', projects: ['Client Reels', 'YouTube Content', 'Marketing Materials'] },
    ],
    projects: [
      { id: 1, title: 'Brand Identity Package', subtitle: 'Motion Graphics', tools: 'After Effects, Illustrator', thumb: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop', bullets: ['Logo animation system', 'Lower thirds and titles', 'Transition elements', 'Brand guideline compliance'] },
      { id: 2, title: 'Product Launch Video', subtitle: 'Commercial', tools: 'Premiere Pro, After Effects', thumb: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop', bullets: ['High-energy reveal sequence', 'Dynamic camera work', 'Kinetic typography', 'Sound design integration'] },
      { id: 3, title: 'Event Promo Series', subtitle: 'Social Media', tools: 'After Effects, Photoshop', thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop', bullets: ['Platform-optimized formats', 'Fast-paced editing', 'Bold graphic design', 'Consistent brand voice'] },
      { id: 4, title: 'Documentary Edit', subtitle: 'Long-Form', tools: 'DaVinci Resolve, After Effects', thumb: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop', bullets: ['Full documentary edit', 'Color grading', 'Sound design and mix', 'Graphics package creation'] },
      { id: 5, title: 'YouTube Channel Package', subtitle: 'Content Creator', tools: 'After Effects, Premiere', thumb: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=400&fit=crop', bullets: ['Channel branding system', 'Intro and outro animations', 'Stream overlays', 'Thumbnail templates'] },
      { id: 6, title: 'Corporate Training', subtitle: 'Educational', tools: 'After Effects, Camtasia', thumb: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop', bullets: ['Instructional video series', 'Motion graphics explanations', 'Screen recording integration', 'Accessible design approach'] },
    ]
  }
};

const recommendations = {
  '3d': { section: 'techart', project: portfolioData.techart.projects[0] },
  techart: { section: '3d', project: portfolioData['3d'].projects[0] },
  video: { section: '3d', project: portfolioData['3d'].projects[1] }
};

function Nav({ current, setCurrent, setSelected }) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: 'rgba(0,0,0,0.95)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <button 
          onClick={() => { setCurrent('home'); setSelected(null); }} 
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            fontWeight: 300,
            letterSpacing: '0.2em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={e => e.target.style.color = '#22d3ee'}
          onMouseLeave={e => e.target.style.color = 'white'}
        >
          <Home size={16} />
          MILO LIN
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {['3d', 'techart', 'video'].map(s => (
            <button 
              key={s} 
              onClick={() => { setCurrent(s); setSelected(null); }}
              style={{
                background: current === s ? 'rgba(34,211,238,0.1)' : 'none',
                border: current === s ? '1px solid rgba(34,211,238,0.5)' : '1px solid transparent',
                color: current === s ? '#22d3ee' : 'rgba(255,255,255,0.6)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                padding: '6px 12px',
                cursor: 'pointer'
              }}
              onMouseEnter={e => { e.target.style.color = 'white'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onMouseLeave={e => { e.target.style.color = current === s ? '#22d3ee' : 'rgba(255,255,255,0.6)'; e.target.style.borderColor = current === s ? 'rgba(34,211,238,0.5)' : 'transparent'; }}
            >
              {s === '3d' ? '3D' : s === 'techart' ? 'TECH ART' : 'VIDEO'}
            </button>
          ))}
          <a href="mailto:m.jiexi.lin@gmail.com" style={{ color: 'rgba(255,255,255,0.6)', marginLeft: '8px' }}>
            <Mail size={16} />
          </a>
        </div>
      </div>
    </nav>
  );
}

function VideoPlayer({ videoId, onFullscreen }) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      paddingBottom: '56.25%',
      backgroundColor: '#111',
      border: '1px solid rgba(255,255,255,0.2)'
    }}>
      {isPlaying ? (
        <>
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            allow="autoplay; fullscreen" 
            allowFullScreen 
          />
          <button 
            onClick={onFullscreen}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              padding: '8px',
              backgroundColor: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <Maximize size={14} />
          </button>
        </>
      ) : (
        <button 
          onClick={() => setIsPlaying(true)} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Play style={{ color: 'rgba(255,255,255,0.6)', marginLeft: '4px' }} size={24} />
          </div>
        </button>
      )}
    </div>
  );
}

function FullscreenVideo({ videoId, onClose }) {
  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          zIndex: 101
        }}
      >
        <X size={32} />
      </button>
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
        style={{ width: '90vw', height: '90vh', border: 'none' }}
        allow="autoplay; fullscreen" 
        allowFullScreen 
      />
    </div>
  );
}

function ProjectCard({ project, onClick }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        textAlign: 'left',
        backgroundColor: hovered ? 'rgba(34,211,238,0.1)' : 'rgba(255,255,255,0.05)',
        border: hovered ? '1px solid rgba(34,211,238,0.4)' : '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ width: '100%', paddingBottom: '56.25%', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={project.thumb} 
          alt={project.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: hovered ? 1 : 0.7,
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.5s ease'
          }}
        />
      </div>
      <div style={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ 
          color: hovered ? '#22d3ee' : 'white', 
          fontSize: '14px', 
          fontWeight: 500, 
          margin: 0,
          transition: 'color 0.3s ease'
        }}>
          {project.title}
        </h3>
        <p style={{ color: 'rgba(34,211,238,0.7)', fontSize: '12px', margin: '4px 0 12px 0' }}>
          {project.subtitle}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flexGrow: 1 }}>
          {project.bullets.map((b, i) => (
            <li key={i} style={{ 
              color: 'rgba(255,255,255,0.5)', 
              fontSize: '12px', 
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <span style={{ color: 'rgba(34,211,238,0.5)' }}>•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p style={{ 
          color: 'rgba(255,255,255,0.3)', 
          fontSize: '11px', 
          margin: 0,
          paddingTop: '12px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          {project.tools}
        </p>
      </div>
    </button>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div 
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: '#111',
          border: '1px solid rgba(255,255,255,0.1)',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ width: '100%', paddingBottom: '56.25%', position: 'relative' }}>
          <img 
            src={project.thumb} 
            alt={project.title}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 300, margin: 0 }}>{project.title}</h2>
              <p style={{ color: '#22d3ee', fontSize: '14px', margin: '4px 0 0 0' }}>{project.subtitle}</p>
            </div>
            <button 
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0' }}>
            {project.bullets.map((b, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '8px', display: 'flex', gap: '8px' }}>
                <span style={{ color: '#22d3ee' }}>•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '12px' }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Tools: </span>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{project.tools}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePage({ setCurrent }) {
  const [fullscreen, setFullscreen] = useState(false);
  
  const jobs = [
    { place: 'LOH Studio', role: 'Motion Graphics & 3D Artist', period: '2024' },
    { place: 'Northeastern University', role: 'Video Production Assistant', period: '2023-2024' },
    { place: 'Freelance', role: 'Video Editor & Designer', period: '2022-Present' },
  ];

  const portfolioItems = [
    { key: '3d', label: '3D WORK', sub: 'Environments' },
    { key: 'techart', label: 'TECH ART', sub: 'Tools & Shaders' },
    { key: 'video', label: 'VIDEO', sub: 'Motion & Marketing' }
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '64px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        
        <header style={{ textAlign: 'center', padding: '48px 0' }}>
          <h1 style={{ 
            color: 'white', 
            fontSize: 'clamp(32px, 8vw, 56px)', 
            fontWeight: 200, 
            letterSpacing: '0.2em', 
            margin: '0 0 12px 0' 
          }}>
            MILO LIN
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.2em', margin: 0 }}>
            ENVIRONMENT ART • TECH ART • VIDEO PRODUCTION
          </p>
        </header>

        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '16px' }}>
            DEMO REEL
          </h2>
          <VideoPlayer videoId="dQw4w9WgXcQ" onFullscreen={() => setFullscreen(true)} />
        </section>

        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '16px' }}>
            ABOUT ME
          </h2>
          <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              Hi! I'm a Game Art and Animation major at Northeastern University, minoring in Computer Science and Philosophy. 
              I specialize in environment art, technical art pipelines, and video production.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.7, margin: '16px 0 0 0' }}>
              When I'm not creating, you'll find me rock climbing, reading (currently loving VE Schwab, Brandon Sanderson, 
              and Ted Chiang), or running D&D campaigns.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '16px' }}>
            EXPERIENCE
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {jobs.map((job, i) => (
              <div 
                key={i} 
                style={{ 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div>
                  <span style={{ color: 'white' }}>{job.place}</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginLeft: '12px' }}>{job.role}</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>{job.period}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '24px' }}>
            PORTFOLIO
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px' 
          }}>
            {portfolioItems.map(item => (
              <button 
                key={item.key} 
                onClick={() => setCurrent(item.key)}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '20px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.borderColor = 'rgba(34,211,238,0.5)'; 
                  e.currentTarget.style.backgroundColor = 'rgba(34,211,238,0.05)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; 
                  e.currentTarget.style.backgroundColor = 'transparent'; 
                }}
              >
                <h3 style={{ color: 'white', fontSize: '14px', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>{item.label}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '0 0 12px 0' }}>{item.sub}</p>
                <ChevronRight style={{ color: 'rgba(255,255,255,0.2)' }} size={16} />
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '16px' }}>
            CONNECT
          </h2>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { icon: Youtube, href: 'https://youtube.com/@MiloLin' },
              { icon: Linkedin, href: 'https://linkedin.com/in/milo-lin-99b5b526a/' },
              { icon: Mail, href: 'mailto:m.jiexi.lin@gmail.com' }
            ].map((item, i) => (
              <a 
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '12px',
                  color: 'rgba(255,255,255,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <item.icon size={16} />
              </a>
            ))}
          </div>
        </section>
      </div>
      
      {fullscreen && <FullscreenVideo videoId="dQw4w9WgXcQ" onClose={() => setFullscreen(false)} />}
    </div>
  );
}

function SectionPage({ sectionKey, data, selected, setSelected, setCurrent }) {
  const [fullscreen, setFullscreen] = useState(false);
  const rec = recommendations[sectionKey];
  const others = ['3d', 'techart', 'video'].filter(s => s !== sectionKey);
  const isVideo = sectionKey === 'video';

  return (
    <div style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ color: 'white', fontSize: '28px', fontWeight: 300, letterSpacing: '0.2em', margin: '0 0 8px 0' }}>
            {data.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>{data.subtitle}</p>
        </header>
        
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '16px' }}>
            DEMO REEL
          </h2>
          <VideoPlayer videoId={data.demoReelId} onFullscreen={() => setFullscreen(true)} />
        </section>

        {isVideo && data.workExperience && (
          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '16px' }}>
              WORK EXPERIENCE
            </h2>
            <div style={{ border: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 100px 1fr', 
                fontSize: '12px', 
                color: 'rgba(255,255,255,0.4)', 
                borderBottom: '1px solid rgba(255,255,255,0.1)', 
                padding: '12px 16px',
                minWidth: '500px'
              }}>
                <span>COMPANY</span>
                <span>ROLE</span>
                <span>PERIOD</span>
                <span>PROJECTS</span>
              </div>
              {data.workExperience.map((job, i) => (
                <div 
                  key={i} 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 100px 1fr', 
                    fontSize: '14px', 
                    padding: '16px', 
                    borderBottom: i < data.workExperience.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    minWidth: '500px'
                  }}
                >
                  <span style={{ color: 'white' }}>{job.company}</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>{job.role}</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>{job.period}</span>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
                    {job.projects.map((p, j) => <div key={j}>• {p}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '24px' }}>
            PROJECTS
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '20px'
          }}>
            {data.projects.map(p => (
              <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
            ))}
          </div>
        </section>

        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '32px', marginTop: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '0 0 12px 0' }}>NAVIGATE</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setCurrent('home')}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '12px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Home size={12} /> HOME
                </button>
                {others.map(s => (
                  <button 
                    key={s}
                    onClick={() => { setCurrent(s); setSelected(null); }}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      fontSize: '12px',
                      padding: '8px 12px',
                      cursor: 'pointer'
                    }}
                  >
                    {s === '3d' ? '3D WORK' : s === 'techart' ? 'TECH ART' : 'VIDEO'}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: '0 0 12px 0' }}>RECOMMENDED</p>
              <button 
                onClick={() => { setCurrent(rec.section); setSelected(rec.project); }}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '12px',
                  padding: '8px 12px',
                  cursor: 'pointer'
                }}
              >
                {rec.project.title} →
              </button>
            </div>
          </div>
        </footer>
      </div>
      
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      {fullscreen && <FullscreenVideo videoId={data.demoReelId} onClose={() => setFullscreen(false)} />}
    </div>
  );
}

export default function Portfolio() {
  const [current, setCurrent] = useState('home');
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ 
      backgroundColor: 'black', 
      color: 'white', 
      minHeight: '100vh', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontWeight: 300
    }}>
      <Nav current={current} setCurrent={setCurrent} setSelected={setSelected} />
      
      {current === 'home' ? (
        <HomePage setCurrent={setCurrent} />
      ) : (
        <SectionPage 
          sectionKey={current}
          data={portfolioData[current]} 
          selected={selected} 
          setSelected={setSelected} 
          setCurrent={setCurrent} 
        />
      )}
      
      <footer style={{ 
        borderTop: '1px solid rgba(255,255,255,0.1)', 
        padding: '24px',
        backgroundColor: 'black'
      }}>
        <div style={{ 
          maxWidth: '1100px', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.3)'
        }}>
          <span>© 2025 Milo Lin</span>
          <a href="mailto:m.jiexi.lin@gmail.com" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>
            m.jiexi.lin@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
