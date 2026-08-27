import type { LucideIcon } from "lucide-react";

export type NormalKey = "hear_about" | "user_role"

export type StudentKey = "user_goals" | "work_day" | "user_location" | "workout_reminder" | "build_community"

export type TrainerKey = "experience" | "work_sessions_week" | "work_day" | "user_location" | "student_count" | "build_community"

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

export type diffQsRole = "normal" | "student" | "trainer"

export interface BluePrintQs {
  key: string;
  step: number;
  role: diffQsRole;
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
  step: number, setRole: (role : Role) => void; questions: Questions[], addResponse: (collection: Collection, qsRole : diffQsRole) => void,
  getSelectedOptionId: (qsId:string, qsRole : diffQsRole) => {options?: number[], text?: string} | undefined,

}

export interface StudentQuestions {
  role: Role | null, questions:Questions[], step: number,
  addResponse: (collection: Collection, qsRole : diffQsRole) => void,
  getSelectedOptionId: (qsId:string, qsRole : diffQsRole) => {options?: number[], text?: string} | undefined,
}

export interface TrainerQuestionsProps {
  step: number, role: Role | null, questions:Questions[],
  addResponse: (collection: Collection, qsRole : diffQsRole) => void,
  getSelectedOptionId: (qsId:string, qsRole : diffQsRole) => {options?: number[], text?: string} | undefined,
}

export interface ResponseToBack {
  sessionId: number;
  surveyVersionId: number;
  responses: Record<number, ResponseEntry>;
}

export interface ResponseEntry {
  selectedOptionId?: number;
  selectedOptionIds?: number[];
  freeTextValue?: string;
}

export interface Collection {
  role?: diffQsRole;
  QsId: number;
  QsKey: string;
  type?: QsType;
  step?: number;
  option?: number[];
  freeText?: string;
}