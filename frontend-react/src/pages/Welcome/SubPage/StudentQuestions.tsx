import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { MapPin, Bell, Dumbbell, Flame, Timer, HeartPulse, Trophy, Target } from "lucide-react"
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import type Questions from "../Onboarding.types";
import type { StudentQuestions, GoalOptionKey, StudentKey, DaysKey, Community } from '../Onboarding.types';

export default function StudentQuestions({ role, questions, step, addResponse, getSelectedOptionId }: StudentQuestions) {

  const [userGoal, setUserGoal] = useState<Questions<GoalOptionKey> | undefined>();
  const [workDay, setWorkDay] = useState<Questions<DaysKey> | undefined>();
  const [qCity, setQCity] = useState<Questions<string> | undefined>();
  const [reminder, setReminder] = useState<Questions<string> | undefined>();
  const [community, setCommunity] = useState<Questions<string> | undefined>();
  const toBoolean = (value?: string): boolean => value === "true";

  const communityStudentOptions: {
    id: Community;
    title: string;
    description: string;
    value: boolean
  }[] = [
      {
        id: "yes",
        title: "Yes, I'm in!",
        description: "Count me in for updates & feedback",
        value: true
      },
      {
        id: "later",
        title: "Maybe later",
        description: "I'll decide another time",
        value: false
      },
    ];

  useEffect(() => {
    const getGoalIcons = (key: GoalOptionKey): LucideIcon => {

      if (key === "strength") return Dumbbell
      if (key === "fat_loss") return Flame
      if (key === "endurance") return Timer
      if (key === "general_health") return HeartPulse
      if (key === "competition_prep") return Trophy
      return Target
    };
    questions.forEach((qs) => {
      if (qs.questionKey as StudentKey === "user_goals") {
        const userGoalQuestion: Questions<GoalOptionKey> = {
          ...qs,
          options: qs.options.map((opt) => ({
            ...opt,
            optionKey: opt.optionKey as GoalOptionKey,
            icon: getGoalIcons(opt.optionKey as GoalOptionKey)
          }))
        }

        setUserGoal(userGoalQuestion);
      }

      if (qs.questionKey as StudentKey === "work_day") {
        const workDaysQuestion: Questions<DaysKey> = {
          ...qs,
          options: qs.options.map((opt) => ({
            ...opt,
            optionKey: opt.optionKey as DaysKey,
          }))
        }

        setWorkDay(workDaysQuestion);
      }

      if (qs.questionKey as StudentKey === "user_location") {
        const locationQuestion: Questions<string> = {
          ...qs,
        }
        setQCity(locationQuestion)
      }
      if(qs.questionKey as StudentKey === "workout_reminder"){
        const reminder: Questions<string> = {
          ...qs,
        }
        setReminder(reminder)
      }

      if(qs.questionKey as StudentKey === "build_community"){
        const community: Questions<string> = {
          ...qs,
          questionText: "Do you want to help build a strong fitness community?",
        }
        setCommunity(community)
      }

    })
    
  }, [questions])
  return (
    <div>
      {/* user goal for student */}
      {step === 3 && role === "student" && (
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {userGoal?.questionText}
          </h1>
          <p className="mt-2 text-[#bac7cc]">Pick as many as you like.</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {userGoal?.options.map(({ id, icon: Icon, optionText }) => {
              const selected = getSelectedOptionId(userGoal.questionKey, "student")?.options?.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => { addResponse({ QsKey: userGoal.questionKey, QsId:userGoal.id, type: userGoal.type, step: step, option: [id] }, "student") }}
                  className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ring-1 transition-colors ${selected
                    ? "bg-[#56b2bb]/15 text-(--symbol-color) ring-(--symbol-color)"
                    : "bg-[#1a2136]/50 text-[#f0f4f8] ring-white/10 cursor-pointer"
                    }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {optionText}
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-sm text-[#bac7cc]">
            {userGoal && getSelectedOptionId(userGoal.questionKey, "student")?.options?.length} selected — you can change these anytime in
            settings.
          </p>
        </div>
      )}

      {/* user schedule for student */}
      {step === 4 && role === "student" && (
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {workDay?.questionText}
          </h1>
          <p className="mt-2 text-[#bac7cc]">
            Pick your usual days and where you are.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {workDay?.options.map(({ id, optionText }) => {
              const selected = getSelectedOptionId(workDay.questionKey, "student")?.options?.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => { addResponse({ QsKey: workDay.questionKey, QsId:workDay.id, type: workDay.type, step: step, option: [id] }, "student") }}
                  className={`flex h-16 w-16 items-center justify-center rounded-full text-sm font-bold ring-1 transition-colors ${selected
                    ? "bg-(--symbol-color) text-[#0a0f22] ring-(--symbol-color)"
                    : "bg-[#1a2136]/50 text-[#f0f4f8] ring-white/10 cursor-pointer"
                    }`}
                >
                  {optionText}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-[#f0f4f8]">
                <MapPin className="h-4 w-4 text-(--symbol-color)" />
                {qCity?.questionText}
              </label>
              {
                qCity &&
                <Input
                  value={getSelectedOptionId(qCity.questionKey, "student")?.text}
                  onChange={(e) => {addResponse({ QsKey: qCity.questionKey, QsId:qCity.id, type: qCity.type, step: step, freeText: e.target.value }, "student") }}
                  placeholder="e.g. Bengaluru"
                  className="mt-2 h-12 rounded-xl border-white/10 bg-[#1a2136] text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-(--symbol-color) focus-visible:ring-offset-0"
                />
              }

            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#1a2136] px-5 ring-1 ring-white/10">
              <span className="flex items-center gap-2 text-sm font-semibold text-[#f0f4f8]">
                <Bell className="h-4 w-4 text-(--symbol-color)" />
                {reminder?.questionText}
              </span>
              {
                reminder &&
                <Switch
                checked={toBoolean(getSelectedOptionId(reminder.questionKey, "student")?.text)}
                onCheckedChange={(b) => {addResponse({ QsKey: reminder.questionKey, QsId:reminder.id, type: reminder.type, step: step, freeText: String(b)}, "student")}}
                className="data-[state=checked]:bg-(--symbol-color) cursor-pointer"
              />
              }
            </div>
          </div>
        </div>
      )}

      {/* user community for student */}
      {step === 5 && role === "student" && community && (
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            { community?.questionText }
          </h1>
          <p className="mt-2 text-[#bac7cc]">
            Join fellow trainers, students and gym owners shaping the
            future of fitness.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {communityStudentOptions.map(({ id, title, description, value }) => {
              const selected = toBoolean(getSelectedOptionId(community.questionKey, "student")?.text) === value;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => { addResponse({ QsKey: community.questionKey, QsId:community.id, type: community.type, step: step, freeText: String(value) }, "student")}}
                  className={`relative flex flex-col items-start gap-1 rounded-2xl p-5 text-left ring-1 transition-all ${selected
                    ? "bg-[#1a2136] shadow-[0_0_30px_-8px_rgba(86,178,187,0.5)] ring-(--symbol-color)"
                    : "bg-[#1a2136]/50 ring-white/10 cursor-pointer"
                    }`}
                >
                  {selected && (
                    <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-(--symbol-color) text-[#0a0f22]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                  <p className="font-bold text-[#f0f4f8]">{title}</p>
                  <p className="mt-0.5 text-sm text-[#bac7cc]">
                    {description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  )
}
