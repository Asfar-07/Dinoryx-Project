import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { MapPin, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Community, TrainerQuestionsProps } from "../Onboarding.types";
import type Questions from "../Onboarding.types";
import type { TrainerKey, DaysKey, ExperienceKey } from '../Onboarding.types';

export default function TrainerQuestions({ step, questions, role, addResponse, getSelectedOptionId }:
  TrainerQuestionsProps) {

  const [qExperience, setQExperience] = useState<Questions<ExperienceKey> | undefined>();
  const [sessions, setSession] = useState<Questions<string> | undefined>();
  const [workDay, setWorkDay] = useState<Questions<DaysKey> | undefined>();
  const [qCity, setQCity] = useState<Questions<string> | undefined>();
  const [studentCount, setStudentCount] = useState<Questions<string> | undefined>();
  const [community, setCommunity] = useState<Questions<string> | undefined>();
  const toBoolean = (value?: string): boolean => value === "true";

  const communityTrainerOptions: {
    id: Community;
    title: string;
    description: string;
    value: boolean;
  }[] = [
      {
        id: "yes",
        title: "Yes, Let's go",
        description: "Count me in for updates & feedback",
        value: true
      },
      {
        id: "later",
        title: "Not yet",
        description: "I'll decide another time",
        value: false
      },
    ];

  useEffect(() => {
    questions.forEach((qs) => {
      if ((qs.questionKey as TrainerKey) === "experience") {
        const experienceQuestion: Questions<ExperienceKey> = {
          ...qs,
          options: qs.options.map((opt) => ({
            ...opt,
            optionKey: opt.optionKey as ExperienceKey,
          })),
        };

        setQExperience(experienceQuestion);
      }

      if ((qs.questionKey as TrainerKey) === "work_sessions_week") {
        const sessions: Questions<string> = {
          ...qs
        };

        setSession(sessions);
      }

      if ((qs.questionKey as TrainerKey) === "work_day") {
        const workDaysQuestion: Questions<DaysKey> = {
          ...qs,
          options: qs.options.map((opt) => ({
            ...opt,
            optionKey: opt.optionKey as DaysKey,
          })),
        };

        setWorkDay(workDaysQuestion);
      }

      if ((qs.questionKey as TrainerKey) === "user_location") {
        const cityQuestion: Questions<string> = {
          ...qs,
          options: qs.options.map((opt) => ({
            ...opt,
            optionKey: opt.optionKey as string,
          })),
        };

        setQCity(cityQuestion);
      }
      if (qs.questionKey as TrainerKey === "student_count") {
        const studentCount: Questions<string> = {
          ...qs,
        }
        setStudentCount(studentCount)
      }
      if (qs.questionKey as TrainerKey === "build_community") {
        const community: Questions<string> = {
          ...qs,
          questionText: "Are you ready to build your fitness dashboard?",
        }
        setCommunity(community)
      }
    });
  }, []);
  return (
    <div>
      {/* trainer and gym owner experience step */}
      {step === 3 && (role === "trainer" || role === "gym_owner") && (
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {qExperience?.questionText}
          </h1>
          <p className="mt-2 text-[#bac7cc]">
            Helps us calibrate plans and metrics.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {qExperience?.options.map(({ id, optionText }, index) => {
              const selected = getSelectedOptionId(qExperience.questionKey, "trainer")?.options?.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => { addResponse({ QsKey: qExperience.questionKey, QsId:qExperience.id, type: qExperience.type, step: step, option: [id]}, "trainer") }}
                  className={`flex flex-col items-center gap-2 rounded-2xl py-6 ring-1 transition-all ${selected
                    ? "bg-[#1a2136] shadow-[0_0_30px_-8px_rgba(86,178,187,0.5)] ring-(--symbol-color)"
                    : "bg-[#1a2136]/50 ring-white/10 cursor-pointer"
                    }`}
                >
                  <span className="text-3xl font-extrabold text-(--symbol-color)">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-[#f0f4f8]">
                    {optionText}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl bg-[#1a2136]/50 p-6 ring-1 ring-white/10">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[#f0f4f8]">
                {sessions?.questionText}
              </p>
              <span className="text-xl font-extrabold text-(--symbol-color)">
                {sessions && getSelectedOptionId(sessions.questionKey, "trainer")?.text}
              </span>
            </div>
            {sessions &&
              <Slider
                value={[Number(getSelectedOptionId(sessions.questionKey, "trainer")?.text)]}
                onValueChange={([v]) => { addResponse({ QsKey: sessions.questionKey, QsId:sessions.id, type: sessions.type, step: step, freeText: String(v) }, "trainer") }}
                min={1}
                max={7}
                step={1}
                className="mt-5 [&_[data-slot=slider-track]]:bg-[#0a0f22] [&_[data-slot=slider-range]]:bg-(--symbol-color) [&_[data-slot=slider-thumb]]:border-(--symbol-color) [&_[data-slot=slider-thumb]]:bg-[#7fd7e0]"
              />
            }

          </div>
        </div>
      )}

      {/* trainer and gym owner schedule step */}
      {step === 4 && (role === "trainer" || role === "gym_owner") && (
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {workDay?.questionText}
          </h1>
          <p className="mt-2 text-[#bac7cc]">
            Pick your usual days and where you are.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {workDay?.options.map(({ id, optionText }) => {
              const selected = getSelectedOptionId(workDay.questionKey, "trainer")?.options?.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => { addResponse({ QsKey: workDay.questionKey, QsId:workDay.id, type: workDay.type, step: step, option: [id] }, "trainer") }}
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
                  value={getSelectedOptionId(qCity.questionKey, "trainer")?.text}
                  onChange={(e) => { addResponse({ QsKey: qCity.questionKey, QsId:qCity.id, type: qCity.type, step: step, freeText: e.target.value }, "trainer") }}
                  placeholder="e.g. Bengaluru"
                  className="mt-2 h-12 rounded-xl border-white/10 bg-[#1a2136] text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-(--symbol-color) focus-visible:ring-offset-0"
                />
              }
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-[#f0f4f8]">
                <MapPin className="h-4 w-4 text-(--symbol-color)" />
                {studentCount?.questionText}
              </label>
              {
                studentCount &&
                <Input
                type="number"
                min={0}
                max={100}
                value={getSelectedOptionId(studentCount.questionKey, "trainer")?.text}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value >= 0 && value <= 100) {
                    addResponse({ QsKey: studentCount.questionKey, QsId:studentCount.id, type: studentCount.type, step: step, freeText: String(value) }, "trainer")
                  }
                }}
                placeholder="e.g. 50"
                className="mt-2 h-12 rounded-xl border-white/10 bg-[#1a2136] text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-(--symbol-color) focus-visible:ring-offset-0"
              />
              }

            </div>
          </div>
        </div>
      )}

      {/* trainer and gym owner community step */}
      {step === 5 && (role === "trainer" || role === "gym_owner") && community && (
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {community?.questionText}
          </h1>
          <p className="mt-2 text-[#bac7cc]">
            Join fellow trainers, students and gym owners shaping the
            future of fitness.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {communityTrainerOptions.map(({ id, title, description, value }) => {
              const selected = toBoolean(getSelectedOptionId(community.questionKey, "trainer")?.text) === value;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {addResponse({ QsKey: community.questionKey, QsId:community.id, type: community.type, step: step, freeText: String(value) }, "trainer")}}
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
