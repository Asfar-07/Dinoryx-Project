import { useEffect, useState } from "react";
import { Check, Search, Dumbbell, Building2, Users } from "lucide-react";
import type Questions from "../Onboarding.types";
import type { LucideIcon } from "lucide-react";
import type { NormalQuestionsProps, Role, Source, NormalKey } from '../Onboarding.types';

export default function NormalQuestions({ setRole ,step, questions, addResponse, getSelectedOptionId}:
    NormalQuestionsProps
) {
    const [hearAbout, setHearAbout] = useState<Questions<Source> | undefined>();
    const [userRole, setUserRole] = useState<Questions<Role> | undefined>();

    useEffect(() => {
        const getRoleIcon = (role: Role): LucideIcon => {
            if (role === "trainer") return Dumbbell;
            if (role === "student") return Users;
            return Building2;
        };
         const getDescriptionIcon = (role: Role): string => {
            if (role === "trainer") return "Manage students, plans & billing";
            if (role === "student") return "Track progress & find gyms";
            return "Run your gym & team at scale";
        };

        questions.forEach((qs) => {
            if (qs.questionKey as NormalKey === "hear_about") {
                const hearAboutQuestion: Questions<Source> = {
                    ...qs,
                    options: qs.options.map((opt) => ({
                        ...opt,
                        optionKey: opt.optionKey as Source,
                        icon: Search,
                    })),
                };

                setHearAbout(hearAboutQuestion);
            }

            if (qs.questionKey as NormalKey === "user_role") {
                const userRoleQuestion: Questions<Role> = {
                    ...qs,
                    options: qs.options.map((opt) => ({
                        ...opt,
                        optionKey: opt.optionKey as Role,
                        icon: getRoleIcon(opt.optionKey as Role),
                        description: getDescriptionIcon(opt.optionKey as Role)
                        
                    })),
                };

                setUserRole(userRoleQuestion);
            }
            return qs;
        })
    }, [questions])

    return (
        <div>
            {step === 1 && (
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        {hearAbout?.questionText}
                    </h1>
                    <p className="mt-2 text-[#bac7cc]">
                        This helps us understand what brought you here.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {hearAbout?.options.map(({ id, icon: Icon, optionText }) => {
                            const selected = getSelectedOptionId(hearAbout.questionKey, "normal")?.options?.includes(id);
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => {addResponse({QsKey: hearAbout.questionKey, QsId:hearAbout.id, type: hearAbout.type, step: step, option:[id]}, "normal")}}
                                    className={`relative flex items-center gap-4 rounded-4xl px-5 py-6 text-left ring-1 transition-all ${selected
                                        ? "bg-[#1a2136] shadow-[0_0_30px_-8px_rgba(86,178,187)] ring-(--symbol-color)"
                                        : "bg-[#1a2136]/50 ring-white/10 cursor-pointer"
                                        }`}
                                >
                                    {selected && (
                                        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-(--symbol-color) text-[#0a0f22]">
                                            <Check className="h-3.5 w-3.5" />
                                        </span>
                                    )}
                                    <span
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${selected
                                            ? "bg-(--symbol-color) text-[#0a0f22]"
                                            : "glass-strong-nav text-[#bac7cc]"
                                            }`}
                                    >
                                        {Icon &&<Icon className="h-4.5 w-4.5" />}

                                    </span>
                                    <p className="font-bold text-[#f0f4f8]">{optionText}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
            {step === 2 && (
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        {userRole?.questionText}
                    </h1>
                    <p className="mt-2 text-[#bac7cc]">
                        We&apos;ll tailor your dashboard around this.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {userRole?.options.map(({ id, icon: Icon, optionText, optionKey, description }) => {
                            const selected = getSelectedOptionId(userRole.questionKey, "normal")?.options?.includes(id);
                            return (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => {setRole(optionKey); addResponse({QsKey: userRole.questionKey, QsId:userRole.id, type: userRole.type, step: step, option:[id]}, "normal")}}
                                    className={`relative flex flex-col items-start gap-3 rounded-2xl p-5 text-left ring-1 transition-all ${selected
                                        ? "bg-[#1a2136] shadow-[0_0_30px_-8px_rgba(86,178,187,0.5)] ring-(--symbol-color)"
                                        : "bg-[#1a2136]/50 ring-white/10 cursor-pointer"
                                        }`}
                                >
                                    {selected && (
                                        <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-(--symbol-color) text-[#0a0f22]">
                                            <Check className="h-3.5 w-3.5" />
                                        </span>
                                    )}
                                    {Icon && <Icon
                                        className={`h-6 w-6 ${selected ? "text-[#56b2bb]" : "text-[#bac7cc]"
                                            }`}
                                    />}
                                    <div>
                                        <p className="font-bold text-[#f0f4f8]">{optionText}</p>
                                        <p className="mt-0.5 text-sm text-[#bac7cc]">
                                            {description}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
