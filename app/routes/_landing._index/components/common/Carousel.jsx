import { twMerge } from "tailwind-merge";

export function CarouselItem({ children, className, text }) {
    return (
        <div className={twMerge(
            'flex flex-col justify-between w-[320px] h-[430px] rounded-2xl bg-[#E6E6F4]',
            className,
        )}>
            {children}
            <span className="text-sm leading-[120%] font-normal p-3">
                {text}
            </span>
        </div>
    )
}