import React , {useRef , useEffect , useContext} from "react";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import {BiMenu} from 'react-icons/bi'
import { authContext } from "../../context/AuthContext";
import profile_pic_dummy from "../../assets/images/profile_pic_dummy.svg"

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Doctors",
  },
  {
    path: "/services",
    display: "AI Disease Detector",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const {user, role , token} = useContext(authContext);

  const handleStickyHeader = ()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header') 
      }
    })
  }
  console.log("rendered again")
  console.log("User", user)
  console.log("token", token)
  
  useEffect(()=>{
    handleStickyHeader();
    return ()=>window.removeEventListener('scroll',handleStickyHeader)
  })

  const toggleMenu=()=>menuRef.current.classList.toggle('show__menu')

  console.log(user)

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <img src={logo} alt="Logo" />

          {/* Menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Right */}
          <div className="flex items-center gap-4">

            {
              (token && user) ? <div className=""> 
              {/* {console.log(role)} */}
              <Link to={`${role==='doctor'?'/doctors/profile/me' : '/users/profile/me'}`}>
              <figure className="w-[50px] h-[50px] cursor-pointer">
                <img src={profile_pic_dummy} className="w-full h-full rounded-full" alt="User" />
              </figure>
              </Link>

            </div> : <Link to="/login">
              <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                Login
              </button>
            </Link>

            }


            
            
            <span className="md:hidden">
              <BiMenu className='w-6 h-6 cursor-pointer' onClick={toggleMenu}/>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
