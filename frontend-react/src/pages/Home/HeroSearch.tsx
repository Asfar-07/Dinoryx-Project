import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "motion/react";

const popularTags: string[] = [
  "CrossFit",
  "Strength Training",
  "Yoga",
  "Personal Trainer",
  "Weight Loss",
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const tagsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function HeroSearch(): React.JSX.Element {
  const [query, setQuery] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    navigate("/nearby-location");
    // handle search logic here
  };

  return (
    <section className="relative w-full flex justify-center items-center overflow-hidden min-h-150 h-screen  px-6 py-24 text-center text-(--primary-text-color) md:px-10">
      {/* ambient glow */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#56b2bb]/10 blur-[120px]"
      /> */}

      <motion.div
        className="relative mx-auto flex max-w-4xl flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h1
          variants={itemVariants}
          className=" text-4xl font-extrabold tracking-tight sm:text-5xl"
        >
          Find Trainers &amp;{" "}
          <span className="text-[#56b2bb]">Nearby Gyms</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-4 max-w-2xl text-(--secondary-text-color)"
        >
          Search by trainer name, gym name, city, or location discover the
          fitness community around you.
        </motion.p>

        <motion.form
          variants={itemVariants}
          onSubmit={handleSearch}
          className="glass-strong glow-primary mx-auto mt-10  max-w-3xl flex flex-col items-stretch gap-2 rounded-[40px] p-3 sm:flex-row sm:items-center lg:min-w-210 max-md:w-full"
        >
          <div className="flex flex-4 items-center gap-2 rounded-3xl bg-white/5 px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-(--secondary-text-color)" />
            <Input
              type="text"
              placeholder="Search trainers, gyms..."
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              className="h-auto border-0 bg-transparent p-0 text-(--primary-text-color) placeholder:text-[#bac7cc]/70 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex flex-2 items-center gap-2 rounded-3xl bg-white/5 px-4 py-3 sm:w-56">
            <MapPin className="h-4 w-4 shrink-0 text-[#56b2bb]" />
            <Input
              type="text"
              placeholder="Any location"
              value={location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
              className="h-auto border-0 bg-transparent p-0 text-(--primary-text-color) placeholder:text-(--primary-text-color)/80 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <Button
            type="submit"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-2xl cursor-pointer  bg-(--symbol-color) px-5 py-5 text-sm font-medium text-[#0a0f22] transition-transform hover:bg-(--symbol-color) hover:text-white hover:scale-[1.02]"
          >
            Search
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>

        <motion.div
          variants={tagsContainerVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-sm"
        >
          <motion.span
            variants={tagVariants}
            className="text-xs text-(--secondary-text-color)"
          >
            Popular:
          </motion.span>
          {popularTags.map((tag: string) => (
            <motion.button
              key={tag}
              variants={tagVariants}
              type="button"
              onClick={() => setQuery(tag)}
              className="glass-li rounded-full cursor-pointer px-3.5 py-1.5 text-xs font-medium text-(--secondary-text-color) hover:text-(--primary-text-color)"
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}