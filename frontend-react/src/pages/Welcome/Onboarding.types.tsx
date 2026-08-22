import type { LucideIcon } from "lucide-react";

export type NormalKey = "hear_about" | "user_role"

export type StudentKey = "user_goals" | "work_day" | "user_location" | "workout_reminder" | "build_community"

export type TrainerKey = "experience" | "work_Sessions_week" | "work_day" | "user_location" | "build_community"

export type Role = "trainer" | "student" | "gym_owner";

export type Source =
    | "share_instagram"
    | "share_friends"
    | "other_social"
    | "share_google";

export type QsType =
    | "SINGLE"
    | "MULTIPLE"
    | "TEXT"
    | "SCALE"
    | "BOOLEAN";

export type GoalOptionKey = "strength" | "fat_loss" | "endurance" | "general_health" | "competition_prep" | "consistency"


export type DaysKey = "mon"| "tue"| "wed"| "thu"| "fri"| "sat"| "sun";

export type ExperienceKey = "beginner" | "intermediate" | "advanced" | "elite";

export interface Option<TOptionKey extends string> {
    id: number;
    order: number;
    optionKey: TOptionKey;
    optionText: string;
    active: boolean;
    icon?: LucideIcon;
    description?: string;
}

export default interface Questions<TOptionKey extends string = string> {
    id: number;
    order: number;
    questionKey: string;
    questionText: string;
    type: QsType;
    required: boolean;
    active: boolean;
    options: Option<TOptionKey>[];
}


export interface Roles {
  id: Role;
  icon: React.ElementType;
  title: string;
  description: string;
}

export type GoalOptions = {
  id: string; icon: React.ElementType; label: string
}

export interface SourceOptions {
  id: string;
  icon: React.ElementType;
  title: string;
}

export type Community = "yes" | "later";

export interface CommunityStudentOptions {
  id: Community;
  title: string;
  description: string;
}

export interface CommunityTrainerOptions {
  id: Community;
  title: string;
  description: string;
}

export interface NormalQuestionsProps {
  step: number, questions: Questions[]
  source: Source | null, setSource: (source: Source) => void, role: Role | null, setRole: (role: Role) => void
}

export interface StudentQuestions {
  role: Role | null, questions:Questions[], step: number,
  goals: string[], toggleGoal: (goalId: string) => void,
  selectedDays: string[], toggleDay: (day: string) => void,
  city: string, setCity: (city: string) => void,
  remindersOn: boolean, setRemindersOn: (on: boolean) => void,
  communityStudentOptions: CommunityStudentOptions[],
  community: Community | null, setCommunity: (communityId: string) => void
}

export interface TrainerQuestionsProps {
  step: number, role: Role | null,
  experience: string, questions:Questions[], setExperience: (level: string) => void,
  sessionsPerWeek: number, setSessionsPerWeek: (sessions: number) => void,
  selectedDays: string[], toggleDay: (day: string) => void,
  city: string, setCity: (city: string) => void, studentCount: number,
  setStudentCount: (count: number) => void, communityTrainerOptions: CommunityTrainerOptions[],
  community: Community | null, setCommunity: (id: Community) => void
}

export interface ResponseToBack {
  sessionId: number,
  surveyVersionId: number,
  responses:responsesASW[]
}

interface responsesASW {
  selectedOptionId: number,
  selectedOptionIds: number[],
  freeTextValue: string
}