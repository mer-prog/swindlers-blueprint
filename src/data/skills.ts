export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  [key: string]: Skill[];
}

export const skills: SkillCategory = {
  FRONTEND: [
    { name: "TypeScript", level: 90 },
    { name: "React", level: 88 },
    { name: "Next.js", level: 85 },
    { name: "Tailwind CSS", level: 88 },
  ],
  BACKEND: [
    { name: "Node.js", level: 78 },
    { name: "PostgreSQL", level: 80 },
    { name: "Prisma", level: 75 },
  ],
  TOOLS: [
    { name: "Git", level: 85 },
    { name: "Docker", level: 55 },
    { name: "Figma", level: 50 },
  ],
};
