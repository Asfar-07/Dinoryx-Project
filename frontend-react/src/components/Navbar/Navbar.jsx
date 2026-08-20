//@ts-nocheck
import React from "react";
import "./navbar.css";
import NavProfile from "./NavProfile";
import NotifyIcon from "@/components/SmallUI/NotifyIcon";
import ThemeMode from "@/components/SmallUI/ThemeMode";
import { MapPin, Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RippleButton } from "../ripple";

const navLinks = [
  { text:"Home", link: "/"},
  { text:"Trainers", link: "/"},
  { text:"Dashboard", link: "/user/manage/dashboard"},
  { text:"Help", link: "/settings/general"},
  { text:"Map", link: "/nearby-location"},
  { text:"Event", link: "/"},
  { text:"Reviews", link: "#review"},
]

export default function Navbar() {
  const isAuth = useSelector((state)=>state.userauth.isAuthenticated);
  const [openBox, setOpenBox] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300 py-3">
      <main className="flex max-w-7xl mx-auto gap-4 px-4 sm:px-6">
        <nav
          className="flex glass-strong-nav w-full items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 border border-transparent
      shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]"
        >
          <Link to="/" className="flex items-center gap-2.5 ">
            <div className="h-9 w-9 rounded-full ">
              <img src="/android-chrome-192x192.png" alt="logo" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-(--primary-text-color)">
              Dino
              <span className="text-(--symbol-color)">Ryx</span>
            </span>
          </Link>
          <ul className="hidden items-center  gap-8 lg:flex">
            {navLinks.map((nav) => (
              <li className="text-[.9rem] font-medium text-(--secondary-text-color) hover:text-(--primary-text-color)">
                {nav.text=="Dashboard" ? (isAuth ? <Link to={nav.link}>{nav.text}</Link>: <Link to="/login">{nav.text}</Link>) : <Link to={nav.link}>{nav.text}</Link>}
                
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link
              to="/nearby-location"
              className="bg-(--symbol-color) hidden items-center gap-1.5 rounded-full bg-linear-to-r  px-4 py-2 text-sm font-semibold text-[#0a0f22] transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <MapPin className="size-5" /> Nearby
            </Link>
            {isAuth ? (
              <NavProfile />
            ) : (
              <RippleButton
                className="hidden rounded-full border border-white/10 bg-white/5 text-sm font-medium  transition-colors text-(--primary-text-color) hover:bg-white/10 sm:inline-flex"
              >
                {" "}
                <Link to="/login" className="flex px-4 py-2 ">
                Login
                </Link>
              </RippleButton>
            )}

            {isAuth && <NotifyIcon />}
            <ThemeMode />
            <button
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
              onClick={() => {
                openBox ? setOpenBox(false) : setOpenBox(true);
              }}
            >
              {openBox ? (
                <X className="size-5 text-(--primary-text-color)" />
              ) : (
                <Menu className="size-5 text-(--primary-text-color)" />
              )}
            </button>
          </div>
        </nav>
      </main>
      {/* // mobile responsive navbar */}
      {openBox && (
        <div className="mx-auto mt-2 max-w-7xl px-4 lg:hidden sm:px-6">
          <div className="glass-strong-nav space-y-1 rounded-2xl px-3 py-6">
            <ul className=" flex flex-col  gap-2 ">
              {navLinks.map((nav) => (
                <li className="text-[.9rem] font-medium text-(--secondary-text-color) hover:text-(--primary-text-color) block rounded-2xl px-3 py-2 hover:bg-white/5">
                   {nav.text=="Dashboard" ? (isAuth ? <Link to={nav.link}>{nav.text}</Link>: <Link to="/login">{nav.text}</Link>) : <Link to={nav.link}>{nav.text}</Link>}
                </li>
              ))}
              {isAuth ? 
              <Link
                to="/account"
                className="mt-2 block rounded-lg bg-(--symbol-color) px-3 py-2.5 text-center text-sm font-semibold text-[#0a0f22]"
              >
                Login
              </Link>:
              <Link
                to="/login"
                className="mt-2 block rounded-lg bg-(--symbol-color) px-3 py-2.5 text-center text-sm font-semibold text-[#0a0f22]"
              >
                Login
              </Link>
              }
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
