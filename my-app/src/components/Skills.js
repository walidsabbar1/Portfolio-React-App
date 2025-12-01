// Skills.js - Redesigned with filtering and premium UI
import React, { useState, useEffect, useMemo } from 'react';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaGitAlt, FaGithub, FaTasks, FaFileExcel, FaCode, FaServer, FaTools, FaDatabase
} from 'react-icons/fa';
import { 
  SiPhp, SiLaravel, SiMysql, SiMongodb, SiTypescript, SiTailwindcss, SiFigma
} from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import InteractiveBackground from './InteractiveBackground';

// Icon mapping
const iconComponents = {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaGitAlt, FaGithub, FaTasks, FaFileExcel,
  SiPhp, SiLaravel, SiMysql, SiMongodb,
  SiTypescript, SiTailwindcss, SiFigma
};

const categoryDescriptions = {
  'All': {
    title: "Full Stack Journey",
    description: "My technical journey spans across the entire web development stack. From crafting pixel-perfect user interfaces to architecting robust backend systems, I thrive on solving complex problems with modern technologies. I am constantly learning and adapting to the latest industry trends to build scalable and efficient applications."
  },
  'Frontend': {
    title: "Crafting Experiences",
    description: "I specialize in building responsive, accessible, and performant user interfaces. My passion lies in creating seamless user experiences using modern frameworks like React and styling solutions like Tailwind CSS. I pay close attention to detail, animations, and interactivity to bring designs to life."
  },
  'Backend': {
    title: "Server-Side Logic",
    description: "On the backend, I focus on building secure and scalable APIs. Whether it's designing database schemas, optimizing queries, or implementing authentication flows, I ensure that the server-side logic is robust and efficient. I have experience with Node.js, PHP, and various database technologies."
  },
  'Tools': {
    title: "Workflow & DevOps",
    description: "I utilize a suite of powerful tools to streamline my development workflow. From version control with Git to design collaboration in Figma, these tools help me maintain code quality, collaborate effectively, and deliver projects on time."
  },
  'Database': {
    title: "Data Management",
    description: "Data is the core of any application. I have experience designing normalized relational schemas with MySQL and working with flexible document stores like MongoDB. I understand the importance of data integrity, indexing, and efficient retrieval strategies."
  }
};

function Skills({ supabase, user }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setSkills(data || []);
      } catch (error) {
        console.error('Error fetching skills:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [supabase]);

  // Extract unique categories and add 'All'
  const categories = useMemo(() => {
    const unique = [...new Set(skills.map(skill => skill.category))];
    return ['All', ...unique];
  }, [skills]);

  // Filter skills based on active category
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skills;
    return skills.filter(skill => skill.category === activeCategory);
  }, [skills, activeCategory]);

  const getLevelColor = (level) => {
    if (level >= 8) return "var(--color-adv)";
    if (level >= 6) return "var(--color-inter)";
    return "var(--color-basic)";
  };

  const getLevelLabel = (level) => {
    if (level >= 8) return t.level.advanced;
    if (level >= 6) return t.level.intermediate;
    return t.level.basic;
  };

  const getIconComponent = (iconName) => {
    return iconComponents[iconName] || FaCode;
  };

  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'frontend': return <FaCode />;
      case 'backend': return <FaServer />;
      case 'tools': return <FaTools />;
      case 'database': return <FaDatabase />;
      default: return <FaTasks />;
    }
  };

  const currentDescription = categoryDescriptions[activeCategory] || categoryDescriptions['All'];

  if (loading) {
    return (
      <div className="detail" style={{ marginTop: 0 }}>
        <InteractiveBackground />
        <div className="skeleton skeleton-title" style={{width: '200px', height: '3rem', marginBottom: '1rem'}}></div>
        <div className="skeleton skeleton-tagline" style={{width: '300px', height: '1.5rem', marginBottom: '2rem'}}></div>
        
        <div className="skills-layout-container">
          <div className="skills-info-left">
            <div className="skeleton" style={{ width: '100%', height: '200px', borderRadius: '24px' }}></div>
          </div>
          <div className="skills-content-right">
             <div className="skeleton" style={{ width: '100%', height: '3rem', borderRadius: '12px', marginBottom: '2rem' }}></div>
             <div className="skills-grid">
               {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="skeleton" style={{ height: '120px', borderRadius: '16px' }}></div>
               ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail skills-page" style={{ marginTop: 0 }}>
      <InteractiveBackground />
      <h1 className="animate-slide-up">{t.skillsTitle}</h1>
      <p className="tagline animate-slide-up">{t.skillsTagline}</p>
      <div className="skills-layout-container">
        {/* Left Side - Text Content */}
        <div className="skills-info-left animate-fade-in">
          <div className="info-card glass-panel">
            <h2 className="info-title">{currentDescription.title}</h2>
            <p className="info-description">{currentDescription.description}</p>
            
            <div className="tech-badges">
               {activeCategory === 'All' ? (
                 <>
                   <span className="tech-badge">Frontend</span>
                   <span className="tech-badge">Backend</span>
                   <span className="tech-badge">DevOps</span>
                 </>
               ) : (
                 <span className="tech-badge">{activeCategory}</span>
               )}
            </div>
          </div>
        </div>

        {/* Right Side - Skills Grid */}
        <div className="skills-content-right">
          {/* Category Filter */}
          <div className="skills-filter-bar animate-slide-left">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category !== 'All' && <span className="btn-icon">{getCategoryIcon(category)}</span>}
                {category}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="skills-grid-premium">
            {filteredSkills.map((skill, index) => {
              const IconComponent = getIconComponent(skill.icon_name);
              const percentage = skill.level * 10;
              
              return (
                <div 
                  key={skill.id}
                  className="skill-card-premium"
                  style={{ 
                    animationDelay: `${index * 0.05}s` 
                  }}
                >
                  <div className="card-bg-glow" style={{ background: skill.color || 'var(--color-primary)' }}></div>
                  
                  <div className="skill-icon-wrapper">
                    <div className="skill-icon-floating" style={{ color: skill.color || 'var(--black)' }}>
                      <IconComponent />
                    </div>
                  </div>
                  
                  <div className="skill-details">
                    <div className="skill-header-premium">
                      <h3 className="skill-name">{skill.name}</h3>
                      <span className="skill-badge" style={{ 
                        borderColor: getLevelColor(skill.level),
                        color: getLevelColor(skill.level)
                      }}>
                        {getLevelLabel(skill.level)}
                      </span>
                    </div>
                    
                    <div className="skill-progress-container">
                      <div className="progress-bar-premium">
                        <div 
                          className="progress-fill-premium"
                          style={{ 
                            width: `${percentage}%`,
                            background: skill.color || 'var(--color-primary)'
                          }}
                        >
                          <div className="progress-glow" style={{ background: skill.color || 'var(--color-primary)' }}></div>
                        </div>
                      </div>
                      <span className="percentage-text">{percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredSkills.length === 0 && (
            <div className="no-skills-found">
              <p>No skills found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Skills;