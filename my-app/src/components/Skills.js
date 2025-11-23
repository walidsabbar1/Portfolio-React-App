// Skills.js
import React from 'react';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaGitAlt, FaGithub, FaTasks, FaFileExcel
} from 'react-icons/fa';
import { 
  SiPhp, SiLaravel, SiMysql, SiMongodb 
} from 'react-icons/si';

function Skills() {
  const skillCategories = [
    {
      title: "Foundation",
      skills: [
        { name: "HTML", level: 5, icon: <FaHtml5 />, color: "#E34F26" },
        { name: "CSS", level: 5, icon: <FaCss3Alt />, color: "#1572B6" },
        { name: "JavaScript", level: 5, icon: <FaJs />, color: "#F7DF1E" }
      ]
    },
    {
      title: "Frontend",
      skills: [
        { name: "React.js", level: 8, icon: <FaReact />, color: "#61DAFB" }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 6, icon: <FaNodeJs />, color: "#339933" },
        { name: "PHP", level: 6, icon: <SiPhp />, color: "#777BB4" },
        { name: "Laravel", level: 7, icon: <SiLaravel />, color: "#FF2D20" }
      ]
    },
    {
      title: "Database",
      skills: [
        { name: "SQL", level: 6, icon: <SiMysql />, color: "#4479A1" },
        { name: "MongoDB", level: 4, icon: <SiMongodb />, color: "#47A248" }
      ]
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", level: 7, icon: <FaGitAlt />, color: "#F05032" },
        { name: "GitHub", level: 7, icon: <FaGithub />, color: "#181717" },
        { name: "Agile", level: 6, icon: <FaTasks />, color: "#6366f1" },
        { name: "Office", level: 5, icon: <FaFileExcel />, color: "#217346" }
      ]
    }
  ];

  const getLevelColor = (level) => {
    if (level >= 8) return "var(--color-adv)";
    if (level >= 6) return "var(--color-inter)";
    return "var(--color-basic)";
  };

  const getLevelLabel = (level) => {
    if (level >= 8) return "Advanced";
    if (level >= 6) return "Intermediate";
    return "Basic";
  };

  return (
    <div className="detail" style={{ marginTop: 0 }}>
      <h1>Skills</h1>
      <p className="tagline">Technologies I work with</p>
      
      <div className="skills-minimal">
        {skillCategories.map((category, categoryIndex) => (
          <div key={category.title} className="skill-category">
            <h3 className="category-title">{category.title}</h3>
            <div className="skills-grid">
              {category.skills.map((skill, skillIndex) => (
                <div 
                  key={skill.name}
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
                      {skill.icon}
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
                          width: `${(skill.level / 10) * 100}%`,
                          backgroundColor: getLevelColor(skill.level)
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">Lvl {skill.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;