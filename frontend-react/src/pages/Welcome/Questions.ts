import type Questions from "./Onboarding.types";
export const demoQuestions: Questions[] = [
  {
    id: 1,
    order: 1,
    questionKey: "hear_about",
    questionText: "Where did you hear about DinoRyx?",
    type: "SINGLE",
    required: true,
    active: true,
    options: [
      {
        id: 4,
        optionKey: "share_instagram",
        optionText: "Instagram",
        order: 3,
        active: true
      },
      {
        id: 3,
        optionKey: "share_friends",
        optionText: "Friends",
        order: 2,
        active: true
      },
      {
        id: 2,
        optionKey: "other_social",
        optionText: "Another Social Media",
        order: 4,
        active: true
      },
      {
        id: 1,
        optionKey: "share_google",
        optionText: "Google",
        order: 1,
        active: true
      }
    ]
  },
  {
    id: 2,
    order: 2,
    questionKey: "user_role",
    questionText: "Who are you training as?",
    type: "SINGLE",
    required: true,
    active: true,
    options: [
      {
        id: 5,
        optionKey: "trainer",
        optionText: "Trainer",
        order: 1,
        active: true
      },
      {
        id: 6,
        optionKey: "student",
        optionText: "Student",
        order: 2,
        active: true
      },
      {
        id: 7,
        optionKey: "gym_owner",
        optionText: "Gym Owner",
        order: 2,
        active: true
      }
    ]
  },
  {
    id: 3,
    order: 3,
    questionKey: "user_goals",
    questionText: "What are your main goals?",
    type: "MULTIPLE",
    required: true,
    active: true,
    options: [
      {
        id: 8,
        optionKey: "strength",
        optionText: "Build Strength",
        order: 1,
        active: true
      },
      {
        id: 9,
        optionKey: "fat_loss",
        optionText: "Fat Loss",
        order: 2,
        active: true
      },
      {
        id: 10,
        optionKey: "endurance",
        optionText: "Endurance",
        order: 3,
        active: true
      },
      {
        id: 11,
        optionKey: "general_health",
        optionText: "General Health",
        order: 4,
        active: true
      },
      {
        id: 12,
        optionKey: "competition_prep",
        optionText: "Competition Prep",
        order: 5,
        active: true
      },
      {
        id: 13,
        optionKey: "consistency",
        optionText: "Consistency",
        order: 6,
        active: true
      }
    ]
  },
  {
    id: 4,
    order: 4,
    questionKey: "work_day",
    questionText: "When do you train?",
    type: "MULTIPLE",
    required: true,
    active: true,
    options: [
      {
        id: 14,
        optionKey: "mon",
        optionText: "Mon",
        order: 1,
        active: true
      },
      {
        id: 15,
        optionKey: "tue",
        optionText: "Tue",
        order: 2,
        active: true
      },
      {
        id: 16,
        optionKey: "wed",
        optionText: "Wed",
        order: 3,
        active: true
      },
      {
        id: 17,
        optionKey: "thu",
        optionText: "Thu",
        order: 4,
        active: true
      },
      {
        id: 18,
        optionKey: "fri",
        optionText: "Fri",
        order: 5,
        active: true
      },
      {
        id: 19,
        optionKey: "sat",
        optionText: "Sat",
        order: 6,
        active: true
      },
      {
        id: 20,
        optionKey: "sun",
        optionText: "Sun",
        order: 7,
        active: true
      }
    ]
  },
  {
    id: 5,
    order: 5,
    questionKey: "user_location",
    questionText: "Your city",
    type: "TEXT",
    required: true,
    active: true,
    options: []
  },
  {
    id: 6,
    order: 6,
    questionKey: "workout_reminder",
    questionText: "Workout reminders",
    type: "BOOLEAN",
    required: true,
    active: true,
    options: []
  },
  {
    id: 7,
    order: 7,
    questionKey: "build_community",
    questionText: "Do you want to help build a strong fitness community?",
    type: "BOOLEAN",
    required: true,
    active: true,
    options: []
  },
  {
    id: 8,
    order: 8,
    questionKey: "experience",
    questionText: "How experienced are you?",
    type: "SINGLE",
    required: true,
    active: true,
    options: [
      {
        id: 21,
        optionKey: "beginner",
        optionText: "Beginner",
        order: 1,
        active: true
      },
      {
        id: 22,
        optionKey: "intermediate",
        optionText: "Intermediate",
        order: 2,
        active: true
      },
      {
        id: 23,
        optionKey: "advanced",
        optionText: "Advanced",
        order: 3,
        active: true
      },
      {
        id: 24,
        optionKey: "elite",
        optionText: "Elite",
        order: 4,
        active: true
      }
    ]
  },
  {
    id: 9,
    order: 9,
    questionKey: "work_sessions_week",
    questionText: "Sessions per week",
    type: "SCALE",
    required: true,
    active: true,
    options: []
  },
   {
    id: 10,
    order: 10,
    questionKey: "student_count",
    questionText: "Student count",
    type: "SCALE",
    required: true,
    active: true,
    options: []
  }
];