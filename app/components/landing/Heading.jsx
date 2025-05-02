import { twMerge } from "tailwind-merge";

export function H1({ children, className }) {
    return (
        <h1 className={twMerge(
            'text-[40px] font-unbounded font-semibold tracking-[2%] leading-[115%] uppercase',
            className,
        )}>
            {children}
        </h1>
    )
}

export function H2({ children, className }) {
    return (
        <h2 className={twMerge(
            'font-unbounded font-semibold tracking-[2%] leading-[115%] uppercase text-[20px] md:text-[34px]',
            className,
        )}>
            {children}
        </h2>
    );
}
export function RSH2({ children, className }) {
    return (
        <h2 className={twMerge(
            'font-unbounded font-semibold tracking-[2%] leading-[115%] uppercase text-[20px] md:text-[34px]',
            className,
        )}>
            {children}
        </h2>
    );
}

