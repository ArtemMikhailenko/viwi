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
        <div className="fixed py-3 bottom-0 left-0 z-50 bg-white flex flex-col h-[538px] w-[256px] rounded-tr-2xl shadow-lg">
            
            {/* Navigation links */}
            <div className="flex-1 px-2 overflow-y-auto">
                <ul className="space-y-2">
                    <MobileMenuLink className='' link="/#mini-video-widgets">О виджете</MobileMenuLink>
                    <MobileMenuLink link="/#integrations">Интеграции</MobileMenuLink>
                    <MobileMenuLink link="/#tariffs">Тарифы</MobileMenuLink>
                    <MobileSubmenu title="Материалы">
                        <MobileMenuSubLink link="#">Инструкции</MobileMenuSubLink>
                        <MobileMenuSubLink link="#">Журнал</MobileMenuSubLink>
                    </MobileSubmenu>
                    <MobileMenuLink link="/#contacts">Контакты</MobileMenuLink>
                </ul>
            </div>
            
            {/* Contact info */}
            <div className="p-1 mt-auto">
                <div className="space-y-2">
                    <a href="#" className="flex items-center rounded-[12px] px-[16px] py-[12px] border border-[#e6e6f4]">
                        <span className="text-[#6f6690] text-sm">Чат Telegram</span>
                        <span className="ml-auto">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9ZM9.32252 6.6442C8.44714 7.0083 6.6976 7.7619 4.07392 8.90499C3.64787 9.07442 3.42469 9.24016 3.40438 9.40223C3.37004 9.67612 3.71303 9.78397 4.1801 9.93084C4.24364 9.95082 4.30947 9.97152 4.37695 9.99346C4.83648 10.1428 5.45462 10.3176 5.77597 10.3245C6.06746 10.3308 6.3928 10.2106 6.75198 9.964C9.20337 8.30925 10.4688 7.47286 10.5482 7.45483C10.6043 7.44211 10.6819 7.42611 10.7346 7.47288C10.7872 7.51966 10.782 7.60824 10.7765 7.632C10.7425 7.77685 9.39609 9.02857 8.69934 9.67633C8.48213 9.87827 8.32806 10.0215 8.29656 10.0542C8.226 10.1275 8.1541 10.1968 8.08499 10.2635C7.65808 10.675 7.33793 10.9836 8.10271 11.4876C8.47023 11.7298 8.76432 11.9301 9.05772 12.1299C9.37813 12.3481 9.69772 12.5657 10.1112 12.8367C10.2166 12.9058 10.3172 12.9775 10.4152 13.0474C10.7881 13.3132 11.1231 13.5521 11.5369 13.514C11.7774 13.4918 12.0258 13.2657 12.152 12.5913C12.4502 10.9974 13.0362 7.54384 13.1717 6.12073C13.1835 5.99605 13.1686 5.83648 13.1566 5.76643C13.1446 5.69638 13.1196 5.59658 13.0285 5.5227C12.9207 5.4352 12.7542 5.41675 12.6798 5.41806C12.3413 5.42403 11.8219 5.60461 9.32252 6.6442Z" fill="#9D9DBC" />
</svg>
                        </span>
                    </a>
                    
                    <a href="mailto:help@videowidget.pro" className="flex items-center rounded-[12px] px-[16px] py-[12px] border border-[#e6e6f4]">
                        
                        <span className="text-[#6f6690] text-sm">help@videowidget.pro</span>
                        <span className="ml-auto">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.7375 0.9375C4.05734 0.9375 3.21726 0.9375 2.57553 1.26448C2.01104 1.5521 1.5521 2.01104 1.26448 2.57553C0.9375 3.21726 0.9375 4.05734 0.9375 5.7375V7.7625C0.9375 9.44266 0.9375 10.2827 1.26448 10.9245C1.5521 11.489 2.01104 11.9479 2.57553 12.2355C3.21726 12.5625 4.05734 12.5625 5.7375 12.5625H7.7625C9.44266 12.5625 10.2827 12.5625 10.9245 12.2355C11.489 11.9479 11.9479 11.489 12.2355 10.9245C12.5625 10.2827 12.5625 9.44266 12.5625 7.7625V5.7375C12.5625 4.05734 12.5625 3.21726 12.2355 2.57553C11.9479 2.01104 11.489 1.5521 10.9245 1.26448C10.2827 0.9375 9.44266 0.9375 7.7625 0.9375H5.7375Z" fill="#9D9DBC" />
  <path d="M13.4999 5.4375V7.1C13.4999 9.34021 13.4999 10.4603 13.0639 11.316C12.6804 12.0686 12.0685 12.6805 11.3159 13.064C10.4602 13.5 9.34012 13.5 7.09991 13.5H5.4375C5.4375 14.0225 5.4375 14.2838 5.46997 14.5027C5.66386 15.8098 6.69019 16.8361 7.99731 17.03C8.21621 17.0625 8.47747 17.0625 9 17.0625H12.2625C13.9427 17.0625 14.7827 17.0625 15.4245 16.7355C15.989 16.4479 16.4479 15.989 16.7355 15.4245C17.0625 14.7827 17.0625 13.9427 17.0625 12.2625V9.00009C17.0625 8.47748 17.0625 8.21617 17.03 7.99724C16.8361 6.69018 15.8098 5.6639 14.5028 5.46998C14.2838 5.4375 14.0225 5.4375 13.4999 5.4375Z" fill="#9D9DBC" />
</svg>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}
function MobileMenuLink({ link, children }) {
    return (
        <li>
            <NavLink
                end
                to={link}
                className='block text-[#212158] text-base rounded-[12px] px-[16px] py-[12px] bg-[#e6e6f4]'
            >
                {children}
            </NavLink>
        </li>
    );
}
function MobileMenuSubLink({ link, children }) {
    return (
        <li>
            <NavLink
                end
                to={link}
                className='block py-[8px] px-[13px] text-[#212158] text-base rounded-[12px] bg-[#fafaff;]'
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
                className='flex items-center justify-between w-full rounded-[12px] px-[16px] py-[12px] bg-[#e6e6f4] text-[#212158] text-base'
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
                <ul className="space-y-1 pt-1">
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