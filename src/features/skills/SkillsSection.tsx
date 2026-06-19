/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SKILLS } from '@/src/core';
import { motion, AnimatePresence } from 'motion/react';
import { CMSData } from '@/src/app/page';

// High-quality custom tech SVG icons with official brand colors (like favicons)
const TypeScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path d="M19.43 14.8c-.45-.27-.92-.48-1.39-.63-.46-.15-.89-.22-1.28-.22-.68 0-1.2.17-1.55.51-.35.34-.52.8-.52 1.36 0 .4.09.73.28.98.19.26.46.48.83.66.36.19.83.36 1.39.53.81.25 1.48.53 1.99.84.5.31.88.7 1.12 1.17.24.47.36 1.05.36 1.74 0 .91-.25 1.66-.77 2.26-.51.59-1.24.89-2.18.89-.8 0-1.53-.18-2.18-.53a4.2 4.2 0 01-1.54-1.56l2.12-1.29c.27.44.6.77 1 .98.4.21.86.32 1.37.32.62 0 1.09-.14 1.42-.41.32-.27.49-.65.49-1.12 0-.37-.09-.67-.28-.88-.19-.22-.47-.42-.84-.6-.37-.18-.85-.36-1.44-.54-.79-.23-1.42-.51-1.9-.84a2.9 2.9 0 01-1.06-1.19c-.23-.47-.35-1.04-.35-1.73 0-.9.26-1.63.79-2.21.53-.58 1.25-.87 2.18-.87.75 0 1.4.16 1.97.49a4 4 0 011.32 1.38l-1.94 1.27zm-9.35-4.13H3.13v1.96H5.1v8.11h2.1V12.63h1.97V10.67z" fill="#FFFFFF" />
  </svg>
);

const JavaScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect width="24" height="24" rx="4" fill="#F7DF1E" />
    <path d="M12 17.93c0 .5-.2.9-.5 1.2-.3.3-.8.5-1.4.5s-1.1-.2-1.4-.5c-.3-.3-.5-.7-.5-1.2h-2c0 1 .4 1.8 1.1 2.4s1.7.9 2.8.9 2.1-.3 2.8-.9c.7-.6 1.1-1.4 1.1-2.4V9.7H12v8.23zM21 10.75h-5.5v2h1.8v6.8c0 .5-.2.9-.5 1.2-.3.3-.8.5-1.4.5s-1.1-.2-1.4-.5c-.3-.3-.5-.7-.5-1.2h-2c0 1 .4 1.8 1.1 2.4s1.7.9 2.8.9 2.1-.3 2.8-.9c.7-.6 1.1-1.4 1.1-2.4V10.75H21v-2z" fill="#000000" />
  </svg>
);

const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="-11.5 -10.23 23 20.46" fill="none" stroke="#61DAFB" strokeWidth="2" {...props}>
    <ellipse rx="11" ry="4.2" />
    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    <circle r="2" fill="#61DAFB" stroke="none" />
  </svg>
);

const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="text-text-main" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.33 17.5l-5.63-7.23V17.5h-1.36V6.5h1.36l5.63 7.23V6.5h1.36v11h-1.36z" />
  </svg>
);

const NodejsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#339933" {...props}>
    <path d="M12 2L2.5 7.5v9L12 22l9.5-5.5v-9L12 2zm6.5 13.5L12 19.3l-6.5-3.8V8.5L12 4.7l6.5 3.8v7z" />
  </svg>
);

const NestJSIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#E0234E" {...props}>
    <path d="M12 2L2 7.8v8.4l10 5.8 10-5.8V7.8L12 2zm6.6 13.5l-6.6 3.8-6.6-3.8V8.5l6.6-3.8 6.6 3.8v7z" />
  </svg>
);

const TailwindIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#38BDF8" {...props}>
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.625-2.2 4.275-1.8 1.05.255 1.8.84 2.625 1.65 1.35 1.32 2.925 2.85 6.3 2.85 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.625 2.2-4.275 1.8-.945-.225-1.62-.78-2.4-1.53-.945-.93-2.07-2.025-4.325-1.975zM4.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.625-2.2 4.275-1.8 1.05.255 1.8.84 2.625 1.65 1.35 1.32 2.925 2.85 6.3 2.85 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.625 2.2-4.275 1.8-.945-.225-1.62-.78-2.4-1.53-.945-.93-2.07-2.025-4.325-1.975z" />
  </svg>
);

const GraphQLIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="#E10098" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M50 5 L90 28 L90 72 L50 95 L10 72 L10 28 Z" />
    <path d="M50 5 L50 95 M10 28 L90 72 M10 72 L90 28" />
    <circle cx="50" cy="5" r="7" fill="#E10098" />
    <circle cx="90" cy="28" r="7" fill="#E10098" />
    <circle cx="90" cy="72" r="7" fill="#E10098" />
    <circle cx="50" cy="95" r="7" fill="#E10098" />
    <circle cx="10" cy="72" r="7" fill="#E10098" />
    <circle cx="10" cy="28" r="7" fill="#E10098" />
    <circle cx="50" cy="50" r="10" fill="#E10098" />
  </svg>
);

const DatabaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#4169E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);

const DockerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#2496ED" {...props}>
    <path d="M13.983 8.871h-2.22v2.22h2.22V8.871zm-2.94 0h-2.22v2.22h2.22V8.871zm2.94-2.94h-2.22v2.22h2.22V5.931zm-2.94 0h-2.22v2.22h2.22V5.931zm-2.94 2.94h-2.22v2.22h2.22V8.871zm-2.94 0h-2.22v2.22h2.22V8.871zm5.88-5.88h-2.22v2.22h2.22V2.991zm-2.94 0h-2.22v2.22h2.22V2.991zm10.22 8.1c-.09-.27-.36-.45-.63-.45h-2.22v2.22h2.22c.27 0 .54-.18.63-.45.09-.27-.09-.54-.09-.72l.09-.6zm-4.34-2.22h-2.22v2.22h2.22V8.871zM1.113 14.151C3.393 17.301 7.203 19.341 11.403 19.341c5.85 0 10.74-3.99 11.97-9.54-.42.09-.84.18-1.29.18H1.833c-.36 0-.69.09-.99.24.15.54.42 1.05.69 1.47l-.42.48z" />
  </svg>
);

const JestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#C21325" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

const CypressIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#17B890" {...props}>
    <path d="M19.5 12c0-4.14-3.36-7.5-7.5-7.5S4.5 7.86 4.5 12s3.36 7.5 7.5 7.5c2.4 0 4.54-1.13 5.92-2.88l-2.03-1.42C14.9 16.32 13.54 17 12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.9 0 3.55 1.06 4.41 2.62l2.09-1.34C17.22 6.09 14.81 4.5 12 4.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5c3.02 0 5.61-1.79 6.8-4.38l-1.92-1.12C15.93 15.65 14.09 16.5 12 16.5c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5c1.47 0 2.78.71 3.59 1.8l2.03-1.3A6.97 6.97 0 0 0 12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c1.69 0 3.2-.7 4.28-1.84l1.98 1.29A8.96 8.96 0 0 0 19.5 12z" />
  </svg>
);

const ReduxIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#764ABC" {...props}>
    <path d="M12.037 1.238c-.37 0-.74.152-.996.408L7.697 5.03c-.256.257-.408.627-.408.997 0 .37.152.74.408.996l3.344 3.384c.512.512 1.48.512 1.992 0l3.344-3.384c.256-.256.408-.626.408-.996 0-.37-.152-.74-.408-.997l-3.344-3.384a1.411 1.411 0 0 0-.996-.408zm-6.014 6.46a1.41 1.41 0 0 0-.996.407L1.683 11.49c-.512.512-.512 1.48 0 1.992l3.344 3.384c.256.256.626.408.996.408.37 0 .74-.152.996-.408l3.344-3.384c.512-.512.512-1.48 0-1.992L6.96 8.087a1.411 1.411 0 0 0-.937-.39zm12.028 0c-.37 0-.74.152-.996.408l-3.344 3.384c-.512.512-.512 1.48 0 1.992l3.344 3.384c.256.256.626.408.996.408.37 0 .74-.152.996-.408l3.344-3.384c.512-.512.512-1.48 0-1.992l-3.344-3.384c-.256-.256-.408-.626-.408-.996s.152-.74.408-.997l3.344-3.384c.256-.256.408-.626.408-.996s-.152-.74-.408-.997z" />
  </svg>
);

const StorybookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#FF4785" {...props}>
    <path d="M18.8 2.2C17.4.8 15.6 0 13.5 0c-2.4 0-4.5 1-6.1 2.8C6 4.4 5 6.5 5 9v11c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V9c0-2.4-1-4.5-2.8-6.1a1.2 1.2 0 0 0-.8-.3c-.3 0-.6.1-.8.3-.5.5-.5 1.3 0 1.8 1.3 1.3 2 3 2 5v11c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V9c0-1.7.7-3.3 1.9-4.5C10 3.3 11.7 2.7 13.5 2.7c1.7 0 3.3.7 4.5 1.9.5.5 1.3.5 1.8 0 .5-.5.5-1.3 0-1.8l-1-1z" />
  </svg>
);

const AccessibilityIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#005A9C" {...props}>
    <circle cx="12" cy="4" r="2" />
    <path d="M19 13v-2c-1.54 0-3.09-.49-4.38-1.46L13.2 8.4c-.4-.3-.8-.4-1.2-.4s-.8.1-1.2.4L9.38 9.54C8.09 10.51 6.54 11 5 11v2c1.86 0 3.7-.6 5-1.7v5.7L7 22l1.5 1.5L12 20l3.5 3.5 1.5-1.5-3-5v-5.7c1.3 1.1 3.14 1.7 5 1.7z" />
  </svg>
);

const JavaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#E76F00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <path d="M6 1v3" />
    <path d="M10 1v3" />
    <path d="M14 1v3" />
  </svg>
);

const PythonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M11.93 1.01c-1.32 0-2.58.11-3.66.3-2.42.44-2.88 1.4-2.88 3.65v2.24h6.7v.93H5.2c-2.42 0-3.65.46-4.09 2.88-.47 2.6-.47 4.67 0 7.27.38 2.24 1.34 2.8 3.58 2.8h2.09V18.8c0-2.42.93-3.65 3.35-3.65h6.63c2.24 0 2.8-.93 2.8-3.35V5.1c0-2.42-.56-3.35-2.8-3.79-1.34-.26-2.9-.3-4.84-.3zm-3.2 2.24c.52 0 .93.41.93.93s-.41.93-.93.93a.93.93 0 1 1 0-1.86zm7.23 13.91c.52 0 .93.41.93.93s-.41.93-.93.93a.93.93 0 1 1 0-1.86z" fill="#3776AB" />
    <path d="M12.07 22.99c1.32 0 2.58-.11 3.66-.3 2.42-.44 2.88-1.4 2.88-3.65v-2.24h-6.7v-.93h7.03c2.42 0 3.65-.46 4.09-2.88.47-2.6.47-4.67 0-7.27-.38-2.24-1.34-2.8-3.58-2.8h-2.09v2.02c0 2.42-.93 3.65-3.35 3.65H7.38c-2.24 0-2.8.93-2.8 3.35v6.63c0 2.42.56 3.35 2.8 3.79 1.34.26 2.9.3 4.84.3zm3.2-2.24c-.52 0-.93-.41-.93-.93s.41-.93.93-.93a.93.93 0 1 1 0 1.86z" fill="#FFE873" />
  </svg>
);

// Map tech keys to SVG icons, hex brand colors, and stylized labels
const SKILL_CONFIGS: Record<string, { icon: (props: any) => React.ReactNode; color: string; label: string }> = {
  typescript: { icon: TypeScriptIcon, color: '#3178C6', label: 'TypeScript' },
  javascript: { icon: JavaScriptIcon, color: '#F5D03A', label: 'JavaScript' },
  react: { icon: ReactIcon, color: '#61DAFB', label: 'React' },
  nextjs: { icon: NextjsIcon, color: '#888888', label: 'Next.js' },
  node: { icon: NodejsIcon, color: '#339933', label: 'Node.js' },
  nest: { icon: NestJSIcon, color: '#E0234E', label: 'NestJS' },
  tailwind: { icon: TailwindIcon, color: '#06B6D4', label: 'Tailwind CSS' },
  graphql: { icon: GraphQLIcon, color: '#E10098', label: 'GraphQL' },
  sql: { icon: DatabaseIcon, color: '#4169E1', label: 'SQL / Databases' },
  docker: { icon: DockerIcon, color: '#2496ED', label: 'Docker' },
  jest: { icon: JestIcon, color: '#C21325', label: 'Jest' },
  cypress: { icon: CypressIcon, color: '#17B890', label: 'Cypress' },
  redux: { icon: ReduxIcon, color: '#764ABC', label: 'Redux' },
  storybook: { icon: StorybookIcon, color: '#FF4785', label: 'Storybook' },
  accessibility: { icon: AccessibilityIcon, color: '#005A9C', label: 'Web Accessibility' },
  java: { icon: JavaIcon, color: '#E76F00', label: 'Java' },
  python: { icon: PythonIcon, color: '#3776AB', label: 'Python' },
};

const getSkillConfig = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('typescript') || lower.includes('ts')) return SKILL_CONFIGS.typescript;
  if (lower.includes('javascript') || lower.includes('js')) return SKILL_CONFIGS.javascript;
  if (lower.includes('react')) return SKILL_CONFIGS.react;
  if (lower.includes('next')) return SKILL_CONFIGS.nextjs;
  if (lower.includes('node')) return SKILL_CONFIGS.node;
  if (lower.includes('nest')) return SKILL_CONFIGS.nest;
  if (lower.includes('tailwind')) return SKILL_CONFIGS.tailwind;
  if (lower.includes('graphql')) return SKILL_CONFIGS.graphql;
  if (lower.includes('sql') || lower.includes('database') || lower.includes('postgres') || lower.includes('mongo')) return SKILL_CONFIGS.sql;
  if (lower.includes('docker')) return SKILL_CONFIGS.docker;
  if (lower.includes('jest')) return SKILL_CONFIGS.jest;
  if (lower.includes('cypress')) return SKILL_CONFIGS.cypress;
  if (lower.includes('redux') || lower.includes('saga')) return SKILL_CONFIGS.redux;
  if (lower.includes('storybook')) return SKILL_CONFIGS.storybook;
  if (lower.includes('accessibility') || lower.includes('wcag') || lower.includes('a11y')) return SKILL_CONFIGS.accessibility;
  if (lower.includes('java')) return SKILL_CONFIGS.java;
  if (lower.includes('python')) return SKILL_CONFIGS.python;

  return {
    icon: (props: any) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    color: '#00F0FF',
    label: name,
  };
};

const CATEGORIES = [
  { id: 'all', label: 'All Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Tools & DevOps' },
];

export const SkillsSection = ({ cmsData, settingsSkills }: { cmsData?: CMSData['skills'], settingsSkills?: string[] }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillsSource = settingsSkills?.length ? settingsSkills : cmsData?.content?.skills;

  const displaySkills = skillsSource?.map((s: any) => {
    if (typeof s === 'string') {
      const lower = s.toLowerCase();
      let category = 'skill';
      let icon = 'Terminal';

      if (lower.includes('react') || lower.includes('next') || lower.includes('typescript') || lower.includes('javascript') || lower.includes('tailwind') || lower.includes('redux') || lower.includes('css') || lower.includes('html') || lower.includes('frontend')) {
        category = 'frontend';
      } else if (lower.includes('node') || lower.includes('nest') || lower.includes('express') || lower.includes('graphql') || lower.includes('sql') || lower.includes('mongo') || lower.includes('python') || lower.includes('backend') || lower.includes('api')) {
        category = 'backend';
      } else if (lower.includes('docker') || lower.includes('ci/cd') || lower.includes('git') || lower.includes('aws') || lower.includes('jest') || lower.includes('cypress') || lower.includes('storybook') || lower.includes('webpack') || lower.includes('accessibility') || lower.includes('tools')) {
        category = 'tools';
      }

      const matchedDefault = SKILLS.find(defSkill => defSkill.name.toLowerCase().includes(lower) || lower.includes(defSkill.name.toLowerCase()));
      if (matchedDefault) {
        icon = matchedDefault.icon;
        category = matchedDefault.category;
      }

      return { name: s, category, icon };
    }
    return {
      name: s.name || 'Unknown',
      category: s.category || 'skill',
      icon: s.icon || 'Terminal'
    };
  }) || SKILLS;

  // Filter skills based on chosen category tab
  const filteredSkills = displaySkills.filter(
    (skill: any) => activeCategory === 'all' || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-32 px-6 md:px-12 bg-text-main/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-text-main uppercase">
              {cmsData?.title || 'Expertise'}
            </h2>
            <p className="text-text-main/40 mt-4 font-light max-w-md">
              A comprehensive toolkit honed through years of professional development and continuous learning.
            </p>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="flex items-center gap-2 bg-text-main/5 p-1.5 rounded-full border border-border-main self-start md:self-auto overflow-x-auto max-w-full no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="relative px-5 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 z-10 text-text-main/50 hover:text-text-main data-[active=true]:text-text-main"
                data-active={activeCategory === cat.id}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-text-main/10 rounded-full border border-text-main/10 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Animated Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill: any) => {
              const config = getSkillConfig(skill.name);
              const Icon = config.icon;

              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 20px 40px -15px var(--brand-glow), 0 0 15px -3px var(--brand-glow)',
                  }}
                  transition={{
                    duration: 0.3,
                    layout: { type: 'spring', stiffness: 350, damping: 28 }
                  }}
                  style={{
                    '--brand-glow': `${config.color}20`, // 12% alpha brand glow color
                    '--brand-color': config.color,
                  } as React.CSSProperties}
                  className="relative p-6 glass-card rounded-2xl border border-border-main hover:border-[var(--brand-color)]/30 transition-colors duration-500 group overflow-hidden"
                >
                  {/* Subtle brand color glow element inside card */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--brand-glow)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-text-main/5 group-hover:bg-[var(--brand-color)]/10 flex items-center justify-center transition-all duration-300">
                      <Icon className="w-6 h-6 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-text-main tracking-tight group-hover:text-text-main transition-colors duration-300">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] uppercase tracking-widest text-text-main/30 font-medium group-hover:text-text-main/50 transition-colors duration-300">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
