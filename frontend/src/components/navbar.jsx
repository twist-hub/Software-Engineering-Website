import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const loggedIn = localStorage.getItem('token');
  const handleNavToggle = () => {
    setToggleNav(!toggleNav);
  };

  const handleLogin = () => {
    // Redirect to login page
    window.location.href = "/login";
  };

  const handleSignOut = () => {
    window.location.href = '/'
    localStorage.removeItem('token')
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setToggleNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex w-full items-center justify-between border-b-white border-b-2 p-4 bg-[#13161d] h-12 text-white">
        <span className="text-3xl font-bold">Logo</span>
        <span onClick={handleNavToggle} className="flex md:hidden text-2xl">
          <GiHamburgerMenu />
        </span>
        <div className="hidden md:flex items-center justify-end space-x-2">
          <ul className="flex items-center justify-end space-x-6 px-4">
            <Link to='/'>Home</Link>
            {loggedIn && <Link to='/clubs'>Clubs</Link>}
          </ul>
          {loggedIn ? (
            <button className="pl-4 py-2 px-4 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <button className="pl-4 py-1 px-4 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors" 
            onClick={handleLogin}>
              Log in
            </button>
          )}
        </div>
      </div>
      {toggleNav ? (
        <div className="bg-[#13161D] text-white shadow-md p-4 ease-out duration-300 transform translate-y-0 opacity-100">
          <ul className="flex flex-col items-start justify-center gap-4">
            <Link to='/'>Home</Link>
            {loggedIn && <Link to='/clubs'>Clubs</Link>}
          </ul>
          <div className="flex items-center justify-start space-x-4 mt-4">
            {loggedIn ? (
              <button className="pl-4 py-2 px-4 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors" 
              onClick={handleSignOut}>
                Sign Out
              </button>
            ) : (
              <button className="pl-4 py-2 px-4 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors" 
              onClick={handleLogin}>
                Log in
              </button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
