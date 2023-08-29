"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {signIn, signOut, useSession, getProviders, SessionProvider} from 'next-auth/react'

const Navbar = () => {
  // importing providers
  const {data: session} =useSession();

  const [providers, setProviders] = useState(null);
  const[toggleDropdown, setToggleDropdown]=useState(false);
  
  useEffect(() => { 
     const setUpProviders =async () => {
      const response = await getProviders();

      setProviders(response)
     }

     setUpProviders()
  }, [])

  const [theme, setTheme] = useState();

  // update state on toggle
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
   <nav className="flex-between w-full mb-16 pt-3">
    {/* toggle dark mode start */}
     <div className="navbar bg-base-100 px-4 sm:px-8">
      <div className="flex-1">
        <Link href="/"  className="flex gap-2 flex-center">
          <Image src={require("/public/assets/logon.png")}
           alt="vocious logo" 
           width={70} 
           height={30} /> 
        </Link>
      </div>
      <div className="flex-none">
        {/* Toggle button here */}
        <button className="btn btn-square btn-ghost">
          <label className="swap swap-rotate w-12 h-12">
            <input
              type="checkbox"
              onChange={handleToggle}
              // show toggle image based on localstorage theme
              checked={theme === "light" ? false : true}
            />
            {/* light theme sun image */}
            <Image src={require("/public/assets/moon.png")} alt="light" className="w-8 h-8 swap-on" />
            {/* dark theme moon image */}
            <Image src={require("/public/assets/sun.png")} alt="dark" className="w-8 h-8 swap-off" />
          </label>
        </button>
      </div>
   
{/*toggle dark mode end--- */}

{/*signIn start----*/}

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
           <Link href="/create-prompt" className="black_btn">
           Create Post
           </Link>


           <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
{
            <Link href="/profile">
            <Image 
            src= {session?.user.image}
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
            />
            </Link> }
          </div>
        ): (
          <>
          { providers &&
          Object.values(providers).map((provider) => (
            <button
            type ="button"
            key={provider.name}
            onClick={()=> {signIn(provider.id); 
            }}
            className='black_btn'
            >
            Sign In  
            </button>
          )) }
          </>
         )}
      </div>
      {/* Mobile Nav */}
      <div className="sm:hidden flex relative  ">
        { session?.user? (
          <div className="flex ">
          <Image 
            src= {session?.user.image}
            width={37}
            height={37}
            className="rounded-full"
            alt="profile"
            onClick={() =>setToggleDropdown((prev) =>
              !prev)}
            />
            {toggleDropdown &&(
              <div className="dropdown">
               <Link
               href="/profile"
               className="dropdown_link"
               onClick={()=>setToggleDropdown (false)}
               >
                  My Profile
               </Link>
               <Link
               href="/create-prompt"
               className="dropdown_link"
               onClick={() =>setToggleDropdown (false)}
               
               >
                  Create Prompt
               </Link>
               <button
               type="button"
               onClick={()=>{
                setToggleDropdown(false);
                signOut();
               }}
               className="mt-5 w-full black_btn"
               >
              Sign Out
               </button>
              </div>
            )}
         </div>
          ): (
<>
          { providers &&
          Object.values(providers).map((provider) => (
            <button
            type ="button"
            key={provider.name}
            onClick={()=> {signIn(provider.id); 
            }}
            className='black_btn'
            >
            Sign In  
            </button>
          )) }
          </>
         )}
    
      </div>
</div>
{/*signin end----- */}
    </nav>
  );
};
export default Navbar;