import { H2 } from "../../../components/landing/Heading";
import AnalyticsImage from "../images/analytics.png";

export default function Analytics() {
    return (
        <div id="analytics" className="grid grid-cols-6 gap-12 w-full pt-[80px] bg-[#E6E6F4]">
            <H2 className="col-start-2 col-span-4">
                проверяйте как пользователи взаимодействуют с видео
            </H2>
            <div className="col-start-2 col-span-5 h-[615px] overflow-y-clip overflow-x-hidden">
                <img
                    className="h-full object-cover"
                    src={AnalyticsImage}
                    style={{ objectPosition: 'top 0 left 0' }}
                />
            </div>
        </div>
    )
}
