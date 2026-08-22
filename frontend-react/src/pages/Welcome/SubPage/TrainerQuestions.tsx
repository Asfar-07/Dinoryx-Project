import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { MapPin, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { TrainerQuestionsProps } from "../Onboarding.types";
import type Questions from "../Onboarding.types";
import type { TrainerKey, DaysKey, ExperienceKey } from '../Onboarding.types';

export default function TrainerQuestions({ step, questions, role, experience, setExperience, sessionsPerWeek, setSessionsPerWeek,
  selectedDays, toggleDay, city, setCity, studentCount, setStudentCount, communityTrainerOptions, community, setCommunity }:
  TrainerQuestionsProps) {

  const [workDay, setWorkDay] = useState<Questions<DaysKey> | undefined>();
  const [qExperience, setQExperience] = useState<Questions<ExperienceKey> | undefined>();
  const [qCity,setQCity] = useState<Questions<string> | undefined>();

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
            {qExperience?.options.map(({ optionText, optionKey }, index) => {
              const selected = experience === optionKey;
              return (
                <button
                  key={optionKey}
                  type="button"
                  onClick={() => setExperience(optionKey)}
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
                Sessions per week
              </p>
              <span className="text-xl font-extrabold text-(--symbol-color)">
                {sessionsPerWeek}
              </span>
            </div>
            <Slider
              value={[sessionsPerWeek]}
              onValueChange={([v]) => setSessionsPerWeek(v)}
              min={1}
              max={7}
              step={1}
              className="mt-5 [&_[data-slot=slider-track]]:bg-[#0a0f22] [&_[data-slot=slider-range]]:bg-(--symbol-color) [&_[data-slot=slider-thumb]]:border-(--symbol-color) [&_[data-slot=slider-thumb]]:bg-[#7fd7e0]"
            />
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
            {workDay?.options.map(({id, optionKey, optionText}) => {
              const selected = selectedDays.includes(optionKey);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleDay(optionKey)}
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
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Bengaluru"
                className="mt-2 h-12 rounded-xl border-white/10 bg-[#1a2136] text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-(--symbol-color) focus-visible:ring-offset-0"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-[#f0f4f8]">
                <MapPin className="h-4 w-4 text-(--symbol-color)" />
                Student count
              </label>
              <Input
                type="number"
                min={0}
                max={100}
                value={studentCount}
                onChange={(e) => {
                  const value = Number(e.target.value);

                  if (value >= 0 && value <= 100) {
                    setStudentCount(value);
                  }
                }}
                placeholder="e.g. 50"
                className="mt-2 h-12 rounded-xl border-white/10 bg-[#1a2136] text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-(--symbol-color) focus-visible:ring-offset-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* trainer and gym owner community step */}
      {step === 5 && (role === "trainer" || role === "gym_owner") && (
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Are you ready to build your fitness dashboard?
          </h1>
          <p className="mt-2 text-[#bac7cc]">
            Join fellow trainers, students and gym owners shaping the
            future of fitness.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {communityTrainerOptions.map(({ id, title, description }) => {
              const selected = community === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCommunity(id)}
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
