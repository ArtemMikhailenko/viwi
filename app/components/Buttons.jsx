import { NavLink } from "@remix-run/react"
import { twMerge } from "tailwind-merge"


export function PrimaryLink({ to, children, className }) {
    return (
        <NavLink
            end
            to={to}
            className={twMerge(
                'primary-button',
                'flex items-center uppercase px-8 rounded-[14px] text-white',
                className,
            )}
        >
            {children}
        </NavLink>
    )
}


export function PrimaryButton({ children, className, disabled, ...props }) {
    return (
        <button
            className={twMerge(
                'primary-button',
                disabled && 'disabled',
                className,
            )}
            type="button"
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}

export function SecondaryLink({ to, className, children }) {
    return (
        <NavLink
            end
            to={to}
            className={twMerge(
                "flex items-center uppercase px-8 rounded-[30px] text-sm bg-landing-button-default dark:bg-gray-400 dark:border-gray-400 dark:hover:bg-gray-300 hover:bg-landing-button-hover hover:dark:border-gray-300 hover:border-button-border-hover focus:bg-landing-button-focus border-[3px] focus:border-button-border-focus text-violet-950 dark:text-violet-950 font-medium border-transparent",
                className,
            )}
        >
            {children}
        </NavLink>
    )
}

export function SecondaryButton({ children, onClick, disabled, type, className, ...props }) {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={twMerge(
                "flex items-center rounded-[30px] text-sm bg-landing-button-default dark:bg-gray-400 dark:border-gray-400 dark:hover:bg-gray-300 hover:bg-landing-button-hover hover:dark:border-gray-300 hover:border-button-border-hover focus:bg-landing-button-focus border-[3px] focus:border-button-border-focus text-violet-950 dark:text-violet-950 font-medium border-transparent",
                className,
            )}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
}
