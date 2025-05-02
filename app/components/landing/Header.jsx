import { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "@remix-run/react";
import { twMerge } from "tailwind-merge";
import LogoImage from "../../images/logo.svg";
import { PrimaryLink, SecondaryLink } from "../Buttons";

function NavBar({ className, style, isMobile, setMobileMenuOpen }) {
    if (isMobile) {
        return (
            <button 
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="flex items-center justify-center p-2"
                aria-label="Open menu"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12H21" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 6H21" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 18H21" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        );
    }
    
    return (
        <nav
            className={twMerge(
                "flex rounded-2xl bg-[#F2F2F9]",
                className,
            )}
            style={style}
        >
            <ul className="m-1 flex w-full list-image-none justify-between gap-1">
                <MenuLink link="/#mini-video-widgets">О виджете</MenuLink>
                <MenuLink link="/#integrations">Интеграции</MenuLink>
                <MenuLink link="/#tariffs">Тарифы</MenuLink>
                <MenuLink link="/#">Материалы</MenuLink>
                <MenuLink link="/#contacts">Контакты</MenuLink>
            </ul>
        </nav>
    )
}

function MenuLink({ link, children }) {
    return (
        <li className='rounded-xl hover:bg-[#E6E6F4]'>
            <NavLink
                end
                to={link}
                className='flex flex-row items-center gap-[10px] px-4 py-3'
            >
                <span className='leading-[18px]'>{children}</span>
            </NavLink>
        </li>
    )
}

function ButtonsLoggedIn() {
    return (
        <PrimaryLink
            to="/app"
            className="flex items-center justify-center py-5 !px-[18px] text-sm font-medium"
        >
            Панель управления
        </PrimaryLink>
    )
}

function ButtonsAnonymous() {
    return (
        <>
            <SecondaryLink
                to="/login"
                className="h-[44px] !px-6"
            >
                Вход
            </SecondaryLink>
            <PrimaryLink
                to="/registration"
                className="flex items-center justify-center py-5 !px-[18px] text-sm font-medium"
            >
                Регистрация
            </PrimaryLink>
        </>
    )
}

function UserButton({ user }) {
    return (
        <button 
            className="flex items-center justify-center p-2"
            aria-label={user ? "User profile" : "User login"}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    );
}

function MobileMenu({ isOpen, setIsOpen, user }) {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col h-full">
            {/* Header with close button */}
            <div className="flex justify-end items-center p-4">
                <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-gray-100 rounded-full"
                    aria-label="Close menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 6L18 18" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            
            {/* Navigation links */}
            <div className="flex-1 px-4">
                <ul className="space-y-1">
                    <MobileMenuLink link="/#mini-video-widgets">О виджете</MobileMenuLink>
                    <MobileMenuLink link="/#integrations">Интеграции</MobileMenuLink>
                    <MobileMenuLink link="/#tariffs">Тарифы</MobileMenuLink>
                    <MobileSubmenu title="Материалы">
                        <MobileMenuLink link="#">Инструкции</MobileMenuLink>
                        <MobileMenuLink link="#">Журнал</MobileMenuLink>
                    </MobileSubmenu>
                    <MobileMenuLink link="/#contacts">Контакты</MobileMenuLink>
                </ul>
            </div>
            
            {/* Contact info */}
            <div className="p-4 mt-auto bg-white border-t border-gray-200">
                <div className="space-y-4 pb-4">
                    <a href="#" className="flex items-center gap-3 py-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-[#E6E6F4] rounded-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 12L16 10" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 8V12" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="text-[#212158] text-base">Чат Telegram</span>
                        <span className="ml-auto">
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#6366F1"/>
                                <path d="M9 9L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M15 9L9 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                    </a>
                    
                    <a href="mailto:help@videowidget.pro" className="flex items-center gap-3 py-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-[#E6E6F4] rounded-full">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 6L12 13L2 6" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <span className="text-[#212158] text-base">help@videowidget.pro</span>
                        <span className="ml-auto">
                            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5H20C21.1 5 22 5.9 22 7V17C22 18.1 21.1 19 20 19H8C6.9 19 6 18.1 6 17V7C6 5.9 6.9 5 8 5Z" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 19V3C16 2.46957 15.7893 1.96086 15.4142 1.58579C15.0391 1.21071 14.5304 1 14 1H4C3.46957 1 2.96086 1.21071 2.58579 1.58579C2.21071 1.96086 2 2.46957 2 3V15" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                    </a>
                </div>

                {/* User actions */}
                <div className="flex gap-4 pt-4">
                    {user ? (
                        <PrimaryLink
                            to="/app"
                            className="flex items-center justify-center py-3 px-4 text-sm font-medium w-full rounded-lg"
                        >
                            Панель управления
                        </PrimaryLink>
                    ) : (
                        <>
                            <SecondaryLink
                                to="/login"
                                className="flex-1 flex items-center justify-center py-3 px-4 text-sm font-medium bg-white rounded-lg"
                            >
                                Вход
                            </SecondaryLink>
                            <PrimaryLink
                                to="/registration"
                                className="flex-1 flex items-center justify-center py-3 px-4 text-sm font-medium rounded-lg"
                            >
                                Регистрация
                            </PrimaryLink>
                        </>
                    )}
                </div>
            </div>

            {/* Bottom controls - removed since using the new bottom navigation */}
        </div>
    );
}

function MobileMenuLink({ link, children }) {
    return (
        <li>
            <NavLink
                end
                to={link}
                className='block py-4 px-4 text-[#212158] text-base'
            >
                {children}
            </NavLink>
        </li>
    );
}

function MobileSubmenu({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <li>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center justify-between w-full py-4 px-4 text-[#212158] text-base'
            >
                {title}
                <svg 
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M6 9L12 15L18 9" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            
            {isOpen && (
                <ul className="pl-6 space-y-1">
                    {children}
                </ul>
            )}
        </li>
    );
}

export default function Header() {
    const loaderData = useLoaderData();
    const { user } = loaderData || {};
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Handle scroll for sticky header
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        setIsSticky(position > 10);
    };

    // Check screen size for responsive design
    const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', checkScreenSize);
        
        // Initialize on first render
        checkScreenSize();
        
        // Compensate header height when fixed
        if (isSticky) {
            const header = document.getElementById('header');
            if (header) {
                document.body.style.paddingTop = `${header.offsetHeight}px`;
            }
        } else {
            document.body.style.paddingTop = '0';
        }
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkScreenSize);
            document.body.style.paddingTop = '0';
        };
    }, [isSticky]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <header 
                id="header"
                className={twMerge(
                    "max-w-full w-full px-5 py-2 bg-[#F2F2F9] select-none",
                    "flex flex-row items-center justify-between",
                    isSticky ? "fixed top-0 left-0 z-40" : ""
                )}
                style={{
                    boxShadow: isSticky ? '0px 25px 45px 0px #21215829' : 'none',
                    transition: 'all 0.3s ease',
                }}
            >
                <NavLink
                    to="/"
                    className="flex flex-row justify-start items-center gap-2.5 h-full py-3"
                >
                    <img 
                        src={LogoImage} 
                        alt="Logo" 
                        className="w-[61px] h-full" 
                    />
                    <div className="flex items-center uppercase font-unbounded font-medium text-sm tracking-wide">
                        videowidget.pro
                    </div>
                </NavLink>
                
                {isMobile ? (
                    <></>
                ) : (
                    <>
                        <NavBar className="w-max mr-4" />
                        <div className="flex flex-row gap-[2px]">
                            {user ? <ButtonsLoggedIn /> : <ButtonsAnonymous />}
                        </div>
                    </>
                )}
            </header>
            
            {/* Mobile bottom navigation */}
            {isMobile && (
                <div className="fixed bottom-0 right-0 z-30  flex gap-2 items-center px-4 py-3 rounded-t-2xl">
                    <button 
                        className="flex items-center justify-center p-2 bg-gray-100 rounded-full"
                        aria-label={user ? "User profile" : "User login"}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    
                    <button 
                        onClick={() => setMobileMenuOpen(true)}
                        className="flex items-center justify-center p-2 bg-gray-100 rounded-full"
                        aria-label="Open menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12H21" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 6H21" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 18H21" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            )}
            
            <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} user={user} />
        </>
    )
}