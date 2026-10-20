import React from 'react';
import { UserCircle, GraduationCap } from 'lucide-react';
import '/src/style.css';

const About = () => {
  const teamMembers = [
    { name: 'Rama Alarifi', id: '222410330', role: 'Lead Developer' },
    { name: 'Shahd Alnasban', id: '222411040', role: 'UI/UX Designer' },
    { name: 'Najla Albawardi', id: '222410629', role: 'QA Engineer' },
    { name: 'Orjwan Albuluwi', id: '222410249', role: 'Frontend Developer' }
  ];

  return (
    <div className="about-container">
      <h2 className="page-title">About Our Team</h2>
      
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="card-header">
              <UserCircle className="avatar-icon" size={56} strokeWidth={1.5} />
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
            </div>
            <div className="card-body">
              <div className="info-row">
                <GraduationCap className="info-icon" size={20} />
                <span>Student ID: <strong>{member.id}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;