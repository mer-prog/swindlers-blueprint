export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  [key: string]: Skill[];
}

export const skills: SkillCategory = {
  FRONTEND: [
    { name: "TypeScript", level: 95 },
    { name: "React", level: 93 },
    { name: "Next.js", level: 90 },
    { name: "Tailwind CSS", level: 95 },
  ],
  BACKEND: [
    { name: "Node.js", level: 85 },
    { name: "PostgreSQL", level: 85 },
    { name: "Prisma", level: 80 },
  ],
  TOOLS: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 75 },
    { name: "Figma", level: 70 },
  ],
};
