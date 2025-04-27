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

export function NavBar({ className, style }) {
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={twMerge(
                "flex rounded-2xl bg-[#F2F2F9]",
                className,
            )}
            style={{
                boxShadow: scrollPosition > 10 ? '0px 25px 45px 0px #21215829' : 'none',
                transition: 'box-shadow 0.2s ease',
                ...style
            }}
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

export default function Header() {
    const loaderData = useLoaderData();

    const { user } = loaderData || {};

    return (
        <header className="hidden max-w-full w-full px-5 lg:flex flex-row py-2 justify-between bg-[#F2F2F9] select-none">
            <NavLink
                to="/"
                className="flex flex-row justify-start items-center gap-2.5 w-min h-full py-3"
            >
                <img src={LogoImage} alt="Logo" className="w-[61px] h-full" />
                <div className="flex items-center uppercase font-unbounded font-medium text-sm tracking-wide">
                    videowidget.pro
                </div>
            </NavLink>
            <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-[2px]">
                    {user ? <ButtonsLoggedIn /> : <ButtonsAnonymous />}
                </div>
            </div>
        </header>
    )
}