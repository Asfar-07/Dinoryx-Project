import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Trophy,
  Target,
  MapPin,
  Bell,
  CalendarDays,
  Sparkles,
  Search,
  Heart,
} from "lucide-react";
import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

import { handleSurvey } from "@/features/survey/surveyService";
import NormalQuestions from "./SubPage/NormalQuestions";
import StudentQuestions from "./SubPage/StudentQuestions";
import TrainerQuestions from "./SubPage/TrainerQuestions";

import type Questions from "./Onboarding.types";
import type { Role, diffQsRole, ResponseToBack, Collection, QsType, NormalKey, TrainerKey, StudentKey, ResponseEntry } from "./Onboarding.types";
import GeneralLoader from "@/components/Loader/GeneralLoader";
import { demoQuestions } from "./Questions";


const TOTAL_STEPS = 6;

//helper functions

function findCollectionOption(collection: Collection[], QuestionKey: NormalKey | StudentKey | TrainerKey, role: diffQsRole) {
  return collection.find((q) => q.QsKey === QuestionKey && q.role === role)?.option
}

function roleLabel(collection: Collection[]) {
  const questionKey: NormalKey = "user_role";
  return demoQuestions.find((e) => e.questionKey === questionKey)?.options.find((r) => findCollectionOption(collection, questionKey, "normal")?.includes(r.id))?.optionText ?? "Not set";
}

function experienceLabel(collection: Collection[]) {
  const questionKey: TrainerKey = "experience";
  return demoQuestions.find((e) => e.questionKey === questionKey)?.options.find((r) => findCollectionOption(collection, questionKey, "trainer")?.includes(r.id))?.optionText ?? "Not set";
}

function sourceLabel(collection: Collection[]) {
  const questionKey: NormalKey = "hear_about";
  return demoQuestions.find((e) => e.questionKey === questionKey)?.options.find((r) => findCollectionOption(collection, questionKey, "normal")?.includes(r.id))?.optionText ?? "Not set";
}

function communityLabel(collection: Collection[], role: diffQsRole) {
  const questionKey: StudentKey = "build_community";
  return collection.find((q) => q.QsKey === questionKey && q.role === role)?.freeText === "true" ? "Yes" : "No";
}

//last step summary card component

interface SummaryCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function SummaryCard({ icon: Icon, label, value }: SummaryCardProps) {
  return (
    <div className="flex items-center gap-3.5 rounded-2xl bg-[#1a2136] p-4 ring-1 ring-white/5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#56b2bb]/15 text-[#56b2bb]">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-[#bac7cc]">{label}</p>
        <p className="truncate font-bold text-[#f0f4f8]">{value}</p>
      </div>
    </div>
  );
}

//main component
export default function DinoRyxOnboarding() {
  const [step, setStep] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [finished, setFinished] = React.useState<boolean>(false);
  // const [questions, setQuestions] = React.useState<Questions[]>([]);
  const [collectionRes, setCollectionRes] = React.useState<Collection[]>([]);


  const [role, setRole] = React.useState<Role | null>("student");

  // const [finalResponse, setFinalResponse] = React.useState<ResponseToBack>({ sessionId: 414134, surveyVersionId: 324324, responses: [] });

  const percentComplete = finished
    ? 100
    : ((step - 1) / TOTAL_STEPS) * 100;

  const stepMeta = [
    { label: "About us" },
    { label: "Your role" },
    { label: "Your goals" },
    { label: "Experience" },
    { label: "Schedule" },
    { label: "Community" },
    { label: "Finish" },
  ][step - 1];

  React.useEffect(() => {
    const normalKey: NormalKey[] = ["hear_about", "user_role"]
    const studentKey: StudentKey[] = ["user_goals", "user_location", "work_day", "workout_reminder", "build_community"]
    const trainerKey: TrainerKey[] = ["experience", "work_sessions_week", "work_day", "user_location", "student_count", "build_community"]

    const roleKeys = {
      normal: normalKey,
      student: studentKey,
      trainer: trainerKey
    } as const;

    //create a collection from backend data qs for add user response response 
    const questionCollection: Collection[] = Object.entries(roleKeys)
      .flatMap(([role, keys]) =>
        keys.flatMap((key) => {
          const question = demoQuestions.find(
            (q) => q.questionKey === key
          );

          if (!question) return [];

          var randomOption;

          if (question.options) {
            randomOption = question.options[Math.floor(Math.random() * question.options.length)];
          }

          return {
            role: role as "normal" | "student" | "trainer",
            type: question.type,
            QsKey: question.questionKey,
            QsId: question.id,

            freeText:
              question.type === "BOOLEAN" ||
                question.type === "TEXT" ||
                question.type === "SCALE"
                ? ""
                : "",

            option:
              question.type === "SINGLE" || question.type === "MULTIPLE"
                ? randomOption ? [randomOption.id] : []
                : randomOption ? [randomOption.id] : []
          }
        })
      );
    setCollectionRes(questionCollection)

  }, [demoQuestions])

  // collected user response and add to collectionRes list
  function addResponse(collection: Collection, qsRole: diffQsRole) {

    if (collection.type === "SINGLE" as QsType || collection.type === "MULTIPLE" as QsType) {
      setCollectionRes(prev =>
        prev.map(item => {
          if (item.role !== qsRole) return item;
          if (item.QsKey !== collection.QsKey) return item;

          const selectedOption = collection.option?.[0];
          if (selectedOption === undefined) return item;

          const currentOptions = item.option ?? [];
          const exists = currentOptions.includes(selectedOption);

          return {
            ...item,
            option: exists
              ? (collection.type === "SINGLE") ? [selectedOption] : currentOptions.filter(id => id !== selectedOption)
              : (collection.type === "SINGLE") ? [selectedOption] : [...currentOptions, selectedOption],
            type: collection.type,
            step: collection.step
          };
        })
      );

    } if (collection.type === "TEXT" as QsType || collection.type === "BOOLEAN" as QsType || collection.type === "SCALE" as QsType) {
      setCollectionRes(prev =>
        prev.map(item => {
          if (item.role !== qsRole) return item;
          if (item.QsKey !== collection.QsKey) return item;

          return {
            ...item,
            freeText: String(collection.freeText),
            type: collection.type,
            step: collection.step
          }
        })
      )
    }
  }

  // which option user selected
  function getSelectedOptionId(qsId: string, qsRole: diffQsRole): { options?: number[], text?: string } | undefined {
    const qs = collectionRes.find((c) => c.QsKey === qsId && c.role === qsRole);
    const type = qs?.type;
    if (type === "SINGLE" || type === "MULTIPLE") {
      return { options: qs?.option }
    }
    if (type === "TEXT" || type === "BOOLEAN" || type === "SCALE") {
      return { text: qs?.freeText }
    }
  }

  React.useEffect(() => {
    // console.log(collectionRes)
  }, [collectionRes])

  React.useEffect(() => {
    let cancelled = false;

    handleSurvey.getQuestions()
      .then((data: Questions[]) => {
        if (cancelled) return;
        console.log("Survey questions:", data);
        // setFinalResponse((d) => d?.sessionId: 10)
        setLoading(false);
      })
      .catch((error) => {
        if (!cancelled) console.error("Error fetching survey questions:", error);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const findRole = (): diffQsRole => {
    if (role === "student") return "student";
    if (role === "trainer" || role === "gym_owner") return "trainer";
    return "normal"
  }

  const goNext = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const handleFinishSetup = () => {
    const data = createResponse(
      collectionRes,
      323252,
      25453245
    );

    console.log(data);
    setFinished(true);
  };

  function createResponse(
    collection: Collection[],
    sessionId: number,
    surveyVersionId: number
  ): ResponseToBack {
    const responses: Record<number, ResponseEntry> = {};

    collection.forEach((item) => {
      if (!item.type) return;
      if ((item.role !== findRole()) && (item.role !== "normal")) return;

      switch (item.type) {
        case "SINGLE":
          if (item.option?.length) {
            responses[item.QsId] = {
              selectedOptionId: item.option[0],
            };
          }
          break;

        case "MULTIPLE":
          if (item.option?.length) {
            responses[item.QsId] = {
              selectedOptionIds: item.option,
            };
          }
          break;

        case "TEXT":
        case "SCALE":
        case "BOOLEAN":
          if (item.freeText !== undefined) {
            responses[item.QsId] = {
              freeTextValue: item.freeText,
            };
          }
          break;
      }
    });

    return {
      sessionId,
      surveyVersionId,
      responses,
    };
  }

  function FilterRequiredContinueButton() {
    // let currentRole: diffQsRole = findRole();
    // let result;
    // if(step <= 2){
    //   result = collectionRes.filter((cr) => cr.step === step)
    // }else{
    //   collectionRes.filter((cr) => cr.step === step && cr.role === currentRole);
    // }
    // console.log(result);

    return (
      <Button
        type="button"
        onClick={goNext}
        className="relative z-0 cursor-pointer h-11 gap-1.5 rounded-full bg-(--symbol-color) px-6 font-semibold text-[#0a0f22] hover:bg-(--symbol-color)/90"
      >
        Continue
        <ArrowRight className="h-4 w-4" />
      </Button>
    );
  }

  const scheduleSummary = `${findCollectionOption(collectionRes, "work_day", findRole())?.length}x / week ·`

  return (
    <div className="relative min-h-screen w-full  px-6 py-8 text-[#f0f4f8] md:px-10 overflow-hidden">
      {loading && <GeneralLoader />}
      <div className="pointer-events-none z-1 absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-(--symbol-color)/80 blur-[240px]">
      </div>
      <div className="pointer-events-none z-1 absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-(--symbol-color)/80 blur-[240px]">
      </div>
      <StarsBackground
        factor={0.15}
        speed={100}
        starColor='#7be6df'
        transition={{ stiffness: 50, damping: 20 }}
        className="absolute inset-0 z-0 h-full w-full bg-[#0a0f22]"
      />
      <div className="relative z-2 mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img
              src="/images/DinoHome.webp"
              alt="DinoRyx"
              className="h-8 w-auto object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-(--symbol-color)">
              DinoRyx
            </span>
          </a>

          <button
            type="button"
            className="rounded-full cursor-pointer bg-[#1d2233]/70 px-4 py-2 text-xs font-medium text-[#f0f4f8] ring-1 ring-white/10 transition-colors hover:bg-[#1d2233]"
          >
            Skip for now
          </button>
        </div>

        {/* Progress */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#bac7cc]">
              Step {step} of {TOTAL_STEPS} · {stepMeta.label}
            </span>
            <span className="font-semibold text-[#f0f4f8]">
              {Math.round(percentComplete)}% complete
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#1d2233]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#56b2bb] to-[#7fd7e0] transition-all duration-300"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>

        {/* Finished Card */}
        <div className="relative mt-6 overflow-hidden rounded-3xl glass-strong-nav p-8 ring-1 ring-white/5 sm:p-10">
          {finished ? (
            <div className="relative flex min-h-[340px] flex-col items-center justify-center py-10 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#56b2bb]/15 blur-[70px]"
              />

              <span className="relative flex h-16 w-16 items-center justify-center text-(--symbol-color)">
                <Sparkles className="h-9 w-9" />
              </span>

              <h1 className="relative mt-6 text-3xl font-extrabold tracking-tight text-(--symbol-color) sm:text-4xl">
                Welcome to DinoRyx
              </h1>
              <p className="relative mt-3 max-w-md text-[#bac7cc]">
                Your workspace is personalized and ready. Jump in and start
                building your fitness network.
              </p>

              <Button
                type="button"
                className="relative cursor-pointer mt-8 h-12 gap-1.5 rounded-full bg-gradient-to-r from-[#56b2bb] to-[#7fd7e0] px-7 font-semibold text-[#0a0f22] hover:opacity-90"
              >
                Go to dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              {/* ---------------- Step content ---------------- */}
              <div className="min-h-[340px]">
                <NormalQuestions step={step} setRole={setRole} questions={demoQuestions}
                  addResponse={addResponse} getSelectedOptionId={getSelectedOptionId}
                />

                <StudentQuestions role={role} questions={demoQuestions} step={step}
                  addResponse={addResponse} getSelectedOptionId={getSelectedOptionId}
                />

                <TrainerQuestions role={role} questions={demoQuestions} step={step}
                  addResponse={addResponse} getSelectedOptionId={getSelectedOptionId}
                />

                {step === 6 && (
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                      You&apos;re all set
                    </h1>
                    <p className="mt-2 text-[#bac7cc]">
                      Here&apos;s a quick look at your setup.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <SummaryCard
                        icon={Search}
                        label="Heard about us via"
                        value={sourceLabel(collectionRes)}
                      />
                      <SummaryCard icon={Users} label="Role" value={roleLabel(collectionRes)} />
                      {role === "student" && (
                        <SummaryCard
                          icon={Target}
                          label="Goals"
                          value={`${findCollectionOption(collectionRes, "user_goals", "student")?.length} selected`}
                        />
                      )}
                      {role !== "student" && (
                        <SummaryCard
                          icon={Trophy}
                          label="Experience"
                          value={experienceLabel(collectionRes)}
                        />
                      )}

                      <SummaryCard
                        icon={CalendarDays}
                        label="Schedule"
                        value={scheduleSummary}
                      />
                      <SummaryCard
                        icon={MapPin}
                        label="City"
                        value={collectionRes.find((q) => q.QsKey === "user_location" && q.role === findRole())?.freeText || "Not set"}
                      />

                      {role === "student" && (
                        <SummaryCard
                          icon={Bell}
                          label="Reminders"
                          value={collectionRes.find((q) => q.QsKey === "workout_reminder" && q.role === findRole())?.freeText == 'true' ? "On" : "Off"}
                        />
                      )}

                      <SummaryCard
                        icon={Heart}
                        label="Community"
                        value={communityLabel(collectionRes, findRole())}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer for handle buttons */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  disabled={step === 1}
                  className="relative cursor-pointer h-11 gap-1.5 rounded-full border-white/10 bg-transparent px-5 font-semibold text-[#f0f4f8] hover:bg-[#1d2233] hover:text-[#f0f4f8] disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
                    const idx = i + 1;
                    const isCurrent = idx === step;
                    const isDone = idx < step;
                    return (
                      <span
                        key={idx}
                        className={`h-2 rounded-full transition-all ${isCurrent
                          ? "w-7 bg-gradient-to-r from-(--symbol-color) to-[#7fd7e0]"
                          : isDone
                            ? "w-2 bg-(--symbol-color)"
                            : "w-2 bg-white/15"
                          }`}
                      />
                    );
                  })}
                </div>

                {step < TOTAL_STEPS ? (
                  <FilterRequiredContinueButton />
                  // <Button
                  //   type="button"
                  //   onClick={goNext}
                  //   className="relative z-0 cursor-pointer h-11 gap-1.5 rounded-full bg-(--symbol-color) px-6 font-semibold text-[#0a0f22] hover:bg-(--symbol-color)/90"
                  // >
                  //   Continue
                  //   <ArrowRight className="h-4 w-4" />
                  // </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleFinishSetup}
                    className="relative z-0 cursor-pointer h-11 gap-1.5 rounded-full bg-(--symbol-color) px-6 font-semibold text-[#0a0f22] hover:bg-(--symbol-color)/90"
                  >
                    Finish setup
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </>
          )}

          {step < TOTAL_STEPS &&
            <div className="absolute -z-5 bottom-5 right-[12.5%] h-25 w-20 rotate-y-180">
              <img
                src="/images/DinoHome.webp"
                alt="dino logo"
                aria-hidden
                className="size-full"
              />
            </div>
          }

        </div>
      </div>
    </div>
  );
}