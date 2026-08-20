import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, type Variants } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Dumbbell,
  TrendingUp,
  Wallet,
  Trophy,
  HeartPulse,
  Timer,
  Calendar,
  Check,
  ShieldCheck,
  Cloud,
} from "lucide-react";
import { ShineButton } from "@/components/shine";
import { BorderGradientButton } from "@/components/border-gradient";

interface RootState {
  userauth: {
    isAuthenticated: boolean;
  };
}

interface TrustItem {
  icon: React.ElementType;
  label: string;
}

interface FloatingBadgeProps {
  icon: React.ElementType;
  label: string;
  className: string;
  iconBg?: string;
  rotate?: number;
  duration?: number;
  delay?: number;
}

const badgeEntranceVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "backOut" },
  },
};

function FloatingBadge({
  icon: Icon,
  label,
  className,
  iconBg = "bg-[#56b2bb]/20 text-[#56b2bb]",
  rotate = 0,
  duration = 4,
  delay = 0,
}: FloatingBadgeProps): React.JSX.Element {
  return (
    <motion.div
      className={`absolute ${className}`}
      variants={badgeEntranceVariants}
    >
      <div
        className="animate-float flex items-center gap-2 rounded-full glass-li py-2 pl-2 pr-4 shadow-lg ring-1 ring-(--symbol-color)/10 backdrop-blur-sm hover:z-20"
        style={
          {
            "--badge-rotate": `${rotate}deg`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          } as React.CSSProperties
        }
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${iconBg}`}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="text-sm font-semibold text-(--primary-text-color)">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

const trustItems: TrustItem[] = [
  { icon: Check, label: "Trusted by Trainers" },
  { icon: ShieldCheck, label: "Secure" },
  { icon: Cloud, label: "Cloud Based" },
];

const leftColVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const leftItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const trustRowVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const trustItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const rightColVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const badgesContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

export default function MainHero(): React.JSX.Element {
  const isAuth = useSelector(
    (state: RootState) => state.userauth.isAuthenticated
  );

  return (
    <section className="w-full bg-(--primary-bg-color) px-6 py-20 text-(--primary-text-color) md:px-10 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left column */}
        <motion.div
          className="flex flex-col max-md:mt-10"
          variants={leftColVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={leftItemVariants}
            className="glass-li inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-[#bac7cc] ring-1 ring-white/5"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#56b2bb]" />
            The new operating system for modern gyms
          </motion.span>

          <motion.h1
            variants={leftItemVariants}
            className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Build Your Ultimate
            <br />
            <span className="text-[#56b2bb]">Gym Network.</span>
          </motion.h1>

          <motion.p
            variants={leftItemVariants}
            className="mt-6 max-w-xl text-lg leading-relaxed  text-(--secondary-text-color)"
          >
            Manage students, billing, progress, locations and your complete
            gym ecosystem from one intelligent platform designed around
            the trainer.
          </motion.p>

          <motion.div
            variants={leftItemVariants}
            className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            {isAuth ? (
              <ShineButton className=" overflow-hidden">
                <Link
                  to="/account"
                  className="flex items-center gap-1.5 rounded-full  px-7 py-4 text-sm font-semibold text-[#0a0f22] 
          to-primary-glow shadow-[0_0_40px_-10px_rgba(86,178,187,0.6)] transition-transform hover:scale-[1.03] cursor-pointer"
                >
                  ``
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </ShineButton>
            ) : (
              <ShineButton className=" overflow-hidden rounded-full ">
                <Link
                  to="/Login"
                  className="flex items-center gap-1.5 rounded-full px-7 py-4 text-sm font-semibold text-[#0a0f22] 
          to-primary-glow shadow-[0_0_40px_-10px_rgba(86,178,187,0.6)] transition-transform hover:scale-[1.03] cursor-pointer"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </ShineButton>
            )}

            <BorderGradientButton
            colors={["#10b981", "#06b6d4", "#3b82f6"]}
            duration={10}
            borderWidth={1}
              className="glass flex flex-row items-center gap-1.5 rounded-full border-[#f0f4f8]/15  text-sm font-semibold
             text-(--primary-text-color) hover:bg-[#1d2233] cursor-pointer"
            >
              <Link
              to="/nearby-location"
              className="flex size-full px-7 py-4"
              >
              <MapPin className="h-4 w-4 text-[#56b2bb] mr-2" />
              Explore Nearby Gyms
              </Link>
              
            </BorderGradientButton>
          </motion.div>

          <motion.div
            variants={trustRowVariants}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {trustItems.map(({ icon: Icon, label }: TrustItem) => (
              <motion.div
                key={label}
                variants={trustItemVariants}
                className="flex items-center gap-1.5 text-xs text-(--secondary-text-color)"
              >
                <Icon className="h-4 w-4 text-[#56b2bb]" />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column */}
        <motion.div
          className="relative mx-auto aspect-square w-full max-w-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* ambient glow behind mascot */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#56b2bb]/20 blur-[80px]"
          />

          <motion.img
            src="/images/DinoHome.webp"
            alt="DinoRyx mascot lifting a dumbbell"
            className="relative z-10 mx-auto h-full w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            variants={rightColVariants}
          />

          <motion.div variants={badgesContainerVariants}>
            <FloatingBadge
              icon={Dumbbell}
              label="Workouts"
              className="left-[2%] top-[16%]"
              rotate={-3}
              duration={4.2}
              delay={0}
            />
            <FloatingBadge
              icon={TrendingUp}
              label="+18%"
              className="left-[-4%] top-[35%]"
              rotate={2}
              duration={5}
              delay={0.6}
            />
            <FloatingBadge
              icon={Wallet}
              label="$4,280"
              className="left-[0%] top-[54%]"
              rotate={-2}
              duration={4.6}
              delay={1.1}
            />
            <FloatingBadge
              icon={MapPin}
              label="Nearby"
              className="left-[4%] top-[73%]"
              rotate={3}
              duration={5.4}
              delay={0.3}
            />

            <FloatingBadge
              icon={Trophy}
              label="Milestones"
              className="right-[0%] top-[12%]"
              rotate={3}
              duration={4.8}
              delay={0.4}
            />
            <FloatingBadge
              icon={HeartPulse}
              label="128 bpm"
              className="right-[-6%] top-[38%]"
              rotate={-2}
              duration={4.3}
              delay={0.9}
            />
            <FloatingBadge
              icon={Timer}
              label="45:12"
              className="right-[-8%] top-[63%]"
              rotate={2}
              duration={5.2}
              delay={0.2}
            />
            <FloatingBadge
              icon={Calendar}
              label="Mon 08:00"
              className="right-[-4%] top-[82%]"
              rotate={-3}
              duration={4.7}
              delay={1.3}
            />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(calc(var(--badge-rotate, 0deg) - 2deg));
          }
          50% {
            transform: translateY(-10px) rotate(calc(var(--badge-rotate, 0deg) + 2deg));
          }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-float {
            animation: none;
            transform: rotate(var(--badge-rotate, 0deg));
          }
        }
      `}</style>
    </section>
  );
}