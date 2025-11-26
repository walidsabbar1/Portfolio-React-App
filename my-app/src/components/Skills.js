// Skills.js - Updated with Lottie animation on left side
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaGitAlt, FaGithub, FaTasks, FaFileExcel
} from 'react-icons/fa';
import { 
  SiPhp, SiLaravel, SiMysql, SiMongodb 
} from 'react-icons/si';
import Lottie from 'lottie-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

// Import your Lottie animation (adjust the path as needed)
import skillsAnimation from '../Assets/animations/skills-animation.json';

// Icon mapping
const iconComponents = {
  FaHtml5: FaHtml5,
  FaCss3Alt: FaCss3Alt,
  FaJs: FaJs,
  FaReact: FaReact,
  FaNodeJs: FaNodeJs,
  FaGitAlt: FaGitAlt,
  FaGithub: FaGithub,
  FaTasks: FaTasks,
  FaFileExcel: FaFileExcel,
  SiPhp: SiPhp,
  SiLaravel: SiLaravel,
  SiMysql: SiMysql,
  SiMongodb: SiMongodb
};

function Skills({ supabase, user }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { language } = useLanguage();
  const t = translations[language];
  const lottieRef = useRef();

  useEffect(() => {
    fetchSkills();
  }, [supabase]);

  const fetchSkills = async () => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;

      setSkills(data || []);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data?.map(skill => skill.category) || [])];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching skills:', error.message);
    } finally {
      setLoading(false);
    }
  };

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
    return iconComponents[iconName] || FaJs; // Default icon
  };

  // Lottie animation options
  const lottieOptions = {
    animationData: skillsAnimation,
    loop: true,
    autoplay: true,
  };

  if (loading) {
    return (
      <div className="detail" style={{ marginTop: 0 }}>
        <div className="skeleton skeleton-title" style={{width: '150px', height: '2.5rem', marginBottom: '1rem'}}></div>
        <div className="skeleton skeleton-tagline" style={{width: '250px', height: '1.5rem', marginBottom: '2rem'}}></div>
        
        <div className="skills-layout-container">
          {/* Lottie Animation Skeleton - Left Side */}
          <div className="skills-animation-left">
            <div className="skeleton" style={{
              width: '100%',
              height: '100%',
              borderRadius: '16px',
              minHeight: '500px'
            }}></div>
          </div>

          {/* Skills Content Skeleton - Right Side */}
          <div className="skills-content-right">
            <div className="skills-minimal">
              {[1, 2, 3, 4].map((category, categoryIndex) => (
                <div key={category} className="skill-category" style={{marginBottom: '3rem'}}>
                  <div className="skeleton skeleton-text" style={{
                    width: '40%',
                    height: '1.5rem',
                    marginBottom: '1.5rem'
                  }}></div>
                  
                  <div className="skills-grid">
                    {[1, 2, 3].map((skill, skillIndex) => {
                      const animationDelay = `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s`;
                      
                      return (
                        <div 
                          key={skill}
                          className="skill-card skeleton-pulse"
                          style={{ animationDelay }}
                        >
                          <div className="skill-header">
                            <div className="skeleton skeleton-circle-small" style={{
                              width: '60px',
                              height: '60px',
                              borderRadius: '12px'
                            }}></div>
                            <div className="skill-info" style={{flex: 1}}>
                              <div className="skeleton skeleton-text" style={{
                                width: '60%',
                                height: '1.1rem',
                                marginBottom: '0.25rem'
                              }}></div>
                              <div className="skeleton skeleton-text-sm" style={{
                                width: '40%',
                                height: '0.85rem'
                              }}></div>
                            </div>
                          </div>
                          
                          <div className="skill-progress">
                            <div className="progress-bar">
                              <div className="skeleton skeleton-progress" style={{
                                width: `${Math.random() * 60 + 40}%`,
                                height: '6px',
                                borderRadius: '3px'
                              }}></div>
                            </div>
                            <div className="skeleton skeleton-text-sm" style={{
                              width: '40px',
                              height: '0.8rem'
                            }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail" style={{ marginTop: 0 }}>
      <h1>{t.skillsTitle}</h1>
      <p className="tagline">{t.skillsTagline}</p>
      
      <div className="skills-layout-container">
        {/* Lottie Animation - Left Side (40%) */}
        <div className="skills-animation-left">
          <Lottie
            lottieRef={lottieRef}
            {...lottieOptions}
            className="skills-lottie-animation"
          />
        </div>

        {/* Skills Content - Right Side (60%) */}
        <div className="skills-content-right">
          <div className="skills-minimal">
            {categories.map((category, categoryIndex) => {
              const categorySkills = skills.filter(skill => skill.category === category);
              
              return (
                <div key={category} className="skill-category">
                  <h3 className="category-title">{category}</h3>
                  <div className="skills-grid">
                    {categorySkills.map((skill, skillIndex) => {
                      const IconComponent = getIconComponent(skill.icon_name);
                      const percentage = skill.level * 10; // Convert level (1-10) to percentage
                      
                      return (
                        <div 
                          key={skill.id}
                          className="skill-card"
                          style={{ 
                            animationDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s` 
                          }}
                        >
                          <div className="skill-header">
                            <div 
                              className="skill-icon"
                              style={{ color: skill.color }}
                            >
                              <IconComponent />
                            </div>
                            <div className="skill-info">
                              <span className="skill-name">{skill.name}</span>
                              <span 
                                className="skill-level"
                                style={{ color: getLevelColor(skill.level) }}
                              >
                                {getLevelLabel(skill.level)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="skill-progress">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill"
                                style={{ 
                                  width: `${percentage}%`,
                                  backgroundColor: getLevelColor(skill.level)
                                }}
                              ></div>
                            </div>
                            <span className="progress-text">Lvl {skill.level}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skills;