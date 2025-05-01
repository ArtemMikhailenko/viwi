import { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "@remix-run/react";
import { twMerge } from "tailwind-merge";
import LogoImage from "../../images/logo.svg";
import { PrimaryLink, SecondaryLink } from "../Buttons";

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

function NavBar({ className, style, isMobile, setMobileMenuOpen }) {
    if (isMobile) {
        return (
            <button 
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="flex items-center justify-center p-2 rounded-full bg-[#E6E6F4]"
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

function MobileMenu({ isOpen, setIsOpen, user }) {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-95 flex flex-col">
            <div className="flex justify-between items-center p-5">
                <NavLink to="/" className="flex items-center gap-2.5">
                    <img src={LogoImage} alt="Logo" className="w-[61px] h-full" />
                    <div className="flex items-center uppercase font-unbounded font-medium text-sm tracking-wide">
                        videowidget.pro
                    </div>
                </NavLink>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2"
                    aria-label="Close menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 6L18 18" stroke="#212158" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            
            <nav className="flex-1 p-5">
                <ul className="flex flex-col gap-4">
                    <MobileMenuLink link="/#mini-video-widgets">О виджете</MobileMenuLink>
                    <MobileMenuLink link="/#integrations">Интеграции</MobileMenuLink>
                    <MobileMenuLink link="/#tariffs">Тарифы</MobileMenuLink>
                    <MobileMenuLink link="/#">Материалы</MobileMenuLink>
                    <MobileMenuLink link="/#contacts">Контакты</MobileMenuLink>
                </ul>
            </nav>
            
            <div className="p-5">
                <div className="flex flex-col gap-3 w-full">
                    {user ? <ButtonsLoggedIn /> : <ButtonsAnonymous />}
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
                className='block px-4 py-3 text-lg font-medium text-[#212158] rounded-xl hover:bg-[#E6E6F4]'
            >
                {children}
            </NavLink>
        </li>
    );
}

function UserButton({ user }) {
    return (
        <button 
            className="flex items-center justify-center p-2 rounded-full bg-[#7B7BF6] text-white"
            aria-label={user ? "User profile" : "User login"}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    );
}

export default function Header() {
    const loaderData = useLoaderData();
    const { user } = loaderData || {};
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Сохраняем оригинальную логику скролла
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        setIsSticky(position > 10);
    };

    // Проверяем размер экрана
    const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', checkScreenSize);
        
        // Инициализация при первом рендере
        checkScreenSize();
        
        // Компенсируем высоту хедера при фиксации
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

    // Запрещаем скролл при открытом мобильном меню
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
                    <div className="flex gap-4 items-center">
                        <UserButton user={user} />
                        <NavBar isMobile={true} setMobileMenuOpen={setMobileMenuOpen} />
                    </div>
                ) : (
                    <>
                        <NavBar className="w-max mr-4" />
                        <div className="flex flex-row gap-[2px]">
                            {user ? <ButtonsLoggedIn /> : <ButtonsAnonymous />}
                        </div>
                    </>
                )}
            </header>
            
            <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} user={user} />
        </>
    )
}