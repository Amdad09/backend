export const ROLES = ['seeker', 'recruiter', 'admin'] as const;
export type Role = (typeof ROLES)[number];

export const DEFAULT_ROLE: Role = 'seeker';

