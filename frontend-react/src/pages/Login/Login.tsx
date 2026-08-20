import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { FaFacebookF } from "react-icons/fa";

import { authHandle } from "../../features/auth/authService";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateAuth } from "../../features/auth/authSlice";
import { addUser } from "@/features/user/userSlice";
import { useForm } from "react-hook-form";
import FloatingCharacters from "@/components/animate-ui/FloatingCharacters";
import { MagneticButton } from "@/components/magnetic";
import { ShineButton } from "@/components/shine"; 
import { TextHighlight } from "@/components/text-highlight";
import { TextSplitReveal } from "@/components/split-reveal";

export default function Login() {
  interface userForm {
    username: string,
    email: string,
    password: string
  }

  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //for dino animation
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  //useForm
  const loginForm = useForm<userForm>({ defaultValues: { username: "", email: "", password: "" } });
  const { register, handleSubmit, formState, reset } = loginForm;
  const { errors } = formState;

  let navigate = useNavigate();
  const dispatch = useDispatch();

  //form resect from useForm
  const resetDefault = () => {
    reset({
      username: "",
      email: "",
      password: ""
    })
  }

  function authenticationSubmit(userData: userForm) {
    if (isLoading) return;
    setIsLoading(true);
    if (isSignup) {


      authHandle
        .signupService(userData)
        .then((data) => {
          dispatch(addUser(data))
          dispatch(updateAuth(true));
          resetDefault()
          setIsLoading(false);
          navigate("/welcome/home");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });

    } else {
      authHandle
        .loginService(userData)
        .then((data) => {
          dispatch(addUser(data))
          dispatch(updateAuth(true));
          resetDefault()
          setIsLoading(false);
          navigate("/");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }

  const handleGoogleAuth = async (credentialResponse: any) => {
    const googleToken = credentialResponse.credential;
    authHandle.googleService(googleToken).then((data) => {
      dispatch(addUser(data))
      dispatch(updateAuth(true));
      resetDefault()
      navigate("/");
    }).catch((err) => {
      console.log(err);
    });
  };

  function errorValidation() {
    if (errors.email?.message && errors.password?.message) {
      return "Please enter valid email, password";
    } if (errors.email?.message) {
      return errors.email?.message;
    } if (errors.password?.message) {
      if (isSignup) return errors.password?.message;
      return "Please enter valid password";
    } else {
      if (isSignup) return (errors.username?.message);
    }
  }

  //useForm validation set here for more readable code
  const emailField = register("email", {
    required: "Please enter email",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email",
    },
  });

  const passwordField = register("password", {
    required: "Please enter password", pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one symbol"
    }
  });

  return (
    <div className="min-h-screen w-full bg-(--primary-bg-color) text-(--primary-text-color)">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-6 md:px-10">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full ">
            <img src="/android-chrome-192x192.png" alt="logo" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Dino<span className="text-[#56b2bb]">Ryx</span>
          </span>
        </a>

        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-(--primary-text-color) transition-colors hover:bg-[#1d2233]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </a>
      </header>

      {/* Card */}
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 md:px-10">
        <div className="grid overflow-hidden rounded-3xl bg-[#131a2e] text-white ring-1 ring-white/5 md:grid-cols-2">
          {/* Left panel */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-linear-to-b from-[#16243a] to-[#0f1626] p-10
          max-sm:py-10 max-sm:px-6">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#56b2bb]/10 blur-[100px]"
            />

            <div className="relative">
              <h1 className="flex text-3xl font-extrabold tracking-tight sm:text-4xl">
                WELCOME <TextSplitReveal delay={.5} duration={1} className="text-[#56b2bb] ml-3">BACK</TextSplitReveal>
              </h1>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#bac7cc]">
                Welcome back! Please enter your details to continue
                training.
              </p>
            </div>
            
            {/* default dino image (if not focus email or password) */}
            {( !passwordFocused && !emailFocused ) &&
            <div className=" relative z-10 mx-auto h-64 w-auto sm:h-72">
              <img
                src="/images/DinoHome.webp"
                alt="DinoRyx mascot"
                className="size-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </div> 
            }

            {/* dino image for email focus */}
            {( emailFocused ) &&
            <div className=" relative z-10 mx-auto h-64 w-auto sm:h-72">
              <img
                src="/images/DinoEmail.webp"
                alt="DinoRyx mascot"
                className="size-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </div> 
            }

            {/* dino image for password with close eyes because not showing password in input */}
            {passwordFocused && !showPassword &&
            <div className=" relative z-10 mx-auto h-64 w-auto sm:h-72">
              <FloatingCharacters />
              <img
                src="/images/DinoThinkingEyesClose.webp"
                alt="DinoRyx thinking eyes closed"
                className="relative z-2 size-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </div> 
            }

            {/* dino image for password with open eyes because  showing password in input */}
            {passwordFocused && showPassword &&
            <div className=" relative z-10 mx-auto h-64 w-auto sm:h-72">
              <FloatingCharacters />
              <img
                src="/images/DinoThinkingEyesOpen.webp"
                alt="DinoRyx thinking eyes open"
                className="relative z-2 size-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </div> 
            }

            <MagneticButton
              strength={40}
              stiffness={300}
              damping={20}
              className="relative z-10 h-12 w-fit rounded-full bg-[#56b2bb] px-8 font-semibold text-[#0a0f22]
             hover:bg-[#56b2bb]/90 cursor-pointer"
              onClick={() => {
                isSignup ? setIsSignup(false) : setIsSignup(true);
                resetDefault()
              }}>
              {isSignup ? "Log In" : "Sign In"}
            </MagneticButton>
          </div>

          {/* Right panel */}
          <div className="flex flex-col justify-center p-10 max-sm:py-10 max-sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {isSignup ? "Sign In" : "Log In"}
            </h2>
            <p className="mt-3 text-sm text-[#bac7cc]">
              {isSignup ? "Returning to DinoRyx? " : "New to DinoRyx? "}
              {isSignup ?
                <button
                  className="font-semibold text-[#56b2bb]  hover:text-[#56b2bb]/80 cursor-pointer"
                  onClick={() => {
                    isSignup ? setIsSignup(false) : setIsSignup(true);
                    resetDefault()
                  }}
                >
                  <TextHighlight height={2} pb={.5} color="#56b2bb" delay={.5} duration={2}>Log In</TextHighlight>
                </button>
                :
                <button
                  className="font-semibold text-[#56b2bb] hover:text-[#56b2bb]/80 cursor-pointer"
                  onClick={() => {
                    isSignup ? setIsSignup(false) : setIsSignup(true);
                    resetDefault()
                  }}
                >
                  <TextHighlight height={2} pb={.5} color="#56b2bb" delay={.5} duration={2}>Create an account</TextHighlight>
                </button>
              }

            </p>

            <form className="mt-7 flex flex-col gap-5" onSubmit={handleSubmit(authenticationSubmit)}>
              {isSignup && <div className="flex flex-col gap-2">
                <Label htmlFor="text" className="text-sm font-semibold">
                  Name
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bac7cc]" />
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your name"
                    {...register("username", {
                      required: "Please enter username", pattern: {
                        value: /^[A-Za-z ]{3,20}$/,
                        message: "Username must be 3–15 letters (spaces allowed, no numbers)"
                      }
                    })}
                    className="h-12 w-full text-sm rounded-xl border-white/10 bg-[#1a2136] pl-10 text-[#f0f4f8] placeholder:text-[#bac7cc]/60 
                    focus-visible:ring-[#56b2bb] focus-visible:ring-offset-0"
                  />
                </div>
              </div>
              }

              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bac7cc]" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...emailField}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={(e) => {
                      emailField.onBlur(e);
                      setEmailFocused(false);
                    }}
                    className="h-12 w-full text-sm rounded-xl border-white/10 bg-[#1a2136] pl-10 text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-[#56b2bb] focus-visible:ring-offset-0"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#bac7cc]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...passwordField}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={(e) => {
                      passwordField.onBlur(e);
                      setPasswordFocused(false);
                    }}
                    className="h-12 w-full text-sm rounded-xl border-white/10 bg-[#1a2136] pl-10 pr-10 text-[#f0f4f8] placeholder:text-[#bac7cc]/60 focus-visible:ring-[#56b2bb] focus-visible:ring-offset-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#bac7cc] hover:text-[#f0f4f8]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <p className=" text-red-600 my-2">{errorValidation()}</p>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#bac7cc]">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(v) => setRememberMe(v === true)}
                    className="border-white/20 data-[state=checked]:border-[#56b2bb] data-[state=checked]:bg-[#56b2bb] data-[state=checked]:text-[#0a0f22]"
                  />
                  Remember me
                </label>

                <a
                  href={"/login/forgot"}
                  className="text-sm font-medium text-[#56b2bb]  hover:text-[#56b2bb]/80"
                > 
                  <TextHighlight height={2} pb={.5} color="#56b2bb" delay={.6} duration={2}>
                    Forgot password?
                  </TextHighlight>  
                </a>
              </div>

              <ShineButton
                type="submit"
                className="h-12 rounded-xl bg-linear-to-r from-[#56b2bb] to-[#7fd7e0] font-semibold text-[#0a0f22]
                 hover:opacity-90 cursor-pointer"
              >
                {isSignup ? "Sign In" : "Log In"}
              </ShineButton>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-[#bac7cc]">Or continue with</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
              <Button
                type="button"
                variant="outline"
                className="h-12 gap-2 rounded-xl border-white/10 bg-transparent font-medium text-[#f0f4f8] 
                hover:bg-[#1a2136] hover:text-[#f0f4f8] cursor-pointer"
              >
                <GoogleLogin
                  onSuccess={handleGoogleAuth}
                  onError={() => console.log("Login Failed")}
                  width={200}
                />
              </Button>
              <Button
                type="button"
                variant="outline"
                className=" relative overflow-hidden h-12 gap-2 rounded-xl border-white/10 bg-transparent font-medium text-[#f0f4f8] 
                hover:bg-[#1a2136] hover:text-[#f0f4f8] cursor-pointer"
              >
                <FaFacebookF className="text-blue-600 size-5" />
                Facebook
                {/* <div className=" absolute inset-0 bg-[#00000079]"></div> */}
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-[#bac7cc]">
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <Button
                className="font-semibold text-[#56b2bb] bg-transparent underline-offset-2 
                hover:bg-transparent hover:text-[#56b2bb]/80 cursor-pointer"
                onClick={() => {
                  isSignup ? setIsSignup(false) : setIsSignup(true);
                  resetDefault()
                }}
              >
                <TextHighlight height={2} pb={.5} color="#56b2bb" delay={1} duration={2}>
                {isSignup ? "Log In" : "Sign In"}
                </TextHighlight>
              </Button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

// function GoogleIcon({ className }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
//       <path
//         fill="#4285F4"
//         d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.74Z"
//       />
//       <path
//         fill="#34A853"
//         d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11A12 12 0 0 0 12 24Z"
//       />
//       <path
//         fill="#FBBC05"
//         d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.6H1.26a12 12 0 0 0 0 10.8l4.01-3.11Z"
//       />
//       <path
//         fill="#EA4335"
//         d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.26 6.6l4.01 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
//       />
//     </svg>
//   );
// }

