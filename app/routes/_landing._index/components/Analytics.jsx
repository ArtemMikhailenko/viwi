import { twMerge } from "tailwind-merge";
import AnalyticsImage from "../images/analytics.png";

// Custom responsive H2 component
function ResponsiveH2({ children, className }) {
    return (
        <h2 className={twMerge(
            'font-unbounded font-semibold tracking-[2%] leading-[115%] uppercase text-[20px] md:text-[34px]',
            className,
        )}>
            {children}
        </h2>
    );
}

export default function Analytics() {
    return (
        <div id="analytics" className="w-full pt-[50px] md:pt-[80px] bg-[#E6E6F4] overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-5">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-12">
                    <ResponsiveH2 className="col-span-1 md:col-start-2 md:col-span-4 mb-6 md:mb-12  md:text-left">
                        проверяйте как пользователи взаимодействуют с видео
                    </ResponsiveH2>
                </div>
            </div>
            
            {/* Image container with right alignment on all screen sizes */}
            <div className="w-full relative right-0">
                <div className="max-w-[1440px] mx-auto">
                    <div className="md:grid md:grid-cols-6">
                        <div className="pl-5 pr-0 w-full md:col-start-2 md:col-span-5 relative">
                            <div className="w-[calc(100%+max(0px,(100vw-1440px)))] h-[300px] sm:h-[400px] md:h-[615px] overflow-hidden">
                                <img 
                                    className="h-full w-full object-cover" 
                                    src={AnalyticsImage} 
                                    style={{ objectPosition: 'top 0 left 0' }} 
                                    alt="Analytics dashboard"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}