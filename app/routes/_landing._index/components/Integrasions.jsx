import { H2 } from "../../../components/landing/Heading";
import LandingImage2 from "../../../images/landing-2.png"  // TODO: move
import IntegrationsYandexImage from "../images/integrations-yandex.png";
import IntegrationsGAImage from "../images/integrations-ga.png";
import IntegrationsWPImage from "../images/integrations-wp.png";
import IntegrationsB24Image from "../images/integrations-b24.png";
import IntegrationsTildaImage from "../images/integrations-tilda.png";
import { SecondaryLink } from "../../../components/Buttons";

function Arrow({ className }) {
    return (
        <svg className={className} width="54" height="16" viewBox="0 0 54 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M52 2C52 1.44771 52.4477 0.999998 53 0.999998C53.5523 0.999998 54 1.44771 54 2L52 2ZM0.292893 8.70711C-0.0976308 8.31658 -0.0976308 7.68342 0.292893 7.29289L6.65685 0.928932C7.04738 0.538408 7.68054 0.538408 8.07107 0.928932C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711L0.292893 8.70711ZM54 14C54 14.5523 53.5523 15 53 15C52.4477 15 52 14.5523 52 14L54 14ZM54 2L54 8L52 8L52 2L54 2ZM53 9L1 9L1 7L53 7L53 9ZM52 14L52 8L54 8L54 14L52 14Z" fill="url(#paint0_linear_1023_7408)" />
            <defs>
                <linearGradient id="paint0_linear_1023_7408" x1="1" y1="8" x2="65.3271" y2="8" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8A8AFF" />
                    <stop offset="1" stopColor="#B9B9FF" />
                </linearGradient>
            </defs>
        </svg>
    )
}

// Кастомный заголовок с адаптивным размером текста
function AdaptiveH2({ children, className }) {
    return (
        <h2 className={`font-unbounded font-semibold text-[20px] md:text-[34px] leading-tight md:leading-tight uppercase text-center ${className || ''}`}>
            {children}
        </h2>
    );
}

export default function Integrations() {
    return (
        <div id="integrations" className="w-full px-5 pt-[50px] pb-[60px] md:pb-[120px]">
            {/* Десктопная версия */}
            <div className="hidden md:grid grid-cols-6 w-full">
                <div className="col-start-2 col-span-4 flex flex-col gap-[30px]">
                    <AdaptiveH2 className="w-full">
                        Интегрируйте виджет с системами аналитики, CMS и конструкторами
                    </AdaptiveH2>
                    <div className="flex flex-col gap-[30px]">
                        <div className="flex flex-row gap-[30px] items-center justify-center">
                            {/* Yandex metrics */}
                            <div className="flex flex-col gap-2 w-[104px]">
                                <img src={IntegrationsYandexImage} className="w-full" />
                                <div className="text-base text-center font-normal leading-[120%]">
                                    Яндекс Метрика
                                </div>
                            </div>
                            {/* Widget */}
                            <div className="flex flex-col gap-2 items-center justify-center w-[265px] h-[255px]">
                                <div className="flex flex-row gap-2 items-center w-full h-[195px]">
                                    <Arrow />
                                    <div
                                        className="rounded-[19px] p-0.5"
                                        style={{ background: "linear-gradient(180deg, #8A8AFF 0%, #B9B9FF 100%)" }}
                                    >
                                        <div className="flex flex-col gap-2 w-[140px] p-2.5 rounded-2xl bg-[#E6E6F4] border-2 border-[#F2F2F9]">
                                            <img src={LandingImage2} className="w-full rounded-[10px]" />
                                            <span className="text-center text-sm leading-[120%]">
                                                Ваш виджет
                                            </span>
                                        </div>
                                    </div>
                                    <Arrow className="transform-[rotate(180deg)]" />
                                </div>
                                <Arrow className="h-[52px] transform-[rotate(-90deg)]" />
                            </div>
                            {/* Google Analytics */}
                            <div className="flex flex-col gap-2 w-[104px]">
                                <img src={IntegrationsGAImage} className="w-full" />
                                <div className="text-base text-center font-normal leading-[120%]">
                                    Google Analytics
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[50px] items-center justify-center">
                            {/* Wordpress */}
                            <div className="flex flex-col gap-2 w-[104px]">
                                <img src={IntegrationsWPImage} className="w-full" />
                                <div className="text-base text-center font-normal leading-[120%]">
                                    WordPress
                                </div>
                            </div>
                            {/* Bitrix24 */}
                            <div className="flex flex-col gap-2 w-[104px]">
                                <img src={IntegrationsB24Image} className="w-full" />
                                <div className="text-base text-center font-normal leading-[120%]">
                                    Bitrix24
                                </div>
                            </div>
                            {/* Tilda */}
                            <div className="flex flex-col gap-2 w-[104px]">
                                <img src={IntegrationsTildaImage} className="w-full" />
                                <div className="text-base text-center font-normal leading-[120%]">
                                    Tilda Publishing
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center w-full">
                            <SecondaryLink to="#" className="w-max py-4 px-6 !uppercase rounded-full font-semibold">
                                смотреть все интеграции
                            </SecondaryLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Мобильная версия */}
            <div className="md:hidden flex flex-col items-center">
                <AdaptiveH2 className="w-full mb-8">
                    Интегрируйте виджет с конструкторами, CMS и системами аналитики
                </AdaptiveH2>
                
                {/* Виджет */}
                <div className="flex flex-col items-center mb-4">
                    <div 
                        className="rounded-3xl p-0.5 mb-8"
                        style={{ background: "linear-gradient(180deg, #8A8AFF 0%, #B9B9FF 100%)" }}
                    >
                        <div className="flex flex-col gap-2 w-[170px] p-4 rounded-3xl bg-[#E6E6F4] border-2 border-[#F2F2F9]">
                            <img src={LandingImage2} className="w-full rounded-[10px]" />
                            <span className="text-center text-sm leading-[120%]">
                                Ваш виджет
                            </span>
                        </div>
                    </div>
                    
                    {/* Стрелка вниз */}
                    <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 46.0002C15.4477 46.0002 15 45.5525 15 45.0002C15 44.4479 15.4477 44.0002 16 44.0002L16 46.0002ZM16.7071 47.7073C16.3166 48.0978 15.6834 48.0978 15.2929 47.7073L8.92893 41.3433C8.53841 40.9528 8.53841 40.3196 8.92893 39.9291C9.31946 39.5386 9.95262 39.5386 10.3431 39.9291L16 45.586L21.6569 39.9291C22.0474 39.5386 22.6805 39.5386 23.0711 39.9291C23.4616 40.3196 23.4616 40.9528 23.0711 41.3433L16.7071 47.7073ZM14 1.90735e-05L14 1.00002L18 1.00002L18 1.9073e-05L14 1.90735e-05ZM14 2.00002L14 3.00002L18 3.00002L18 2.00002L14 2.00002ZM14 4.00002L14 5.00002L18 5.00002L18 4.00002L14 4.00002ZM14 6.00002L14 7.00002L18 7.00002L18 6.00002L14 6.00002ZM14 8.00002L14 9.00002L18 9.00002L18 8.00002L14 8.00002ZM14 10L14 11L18 11L18 10L14 10ZM14 12L14 13L18 13L18 12L14 12ZM14 14L14 15L18 15L18 14L14 14ZM14 16L14 17L18 17L18 16L14 16ZM14 18L14 19L18 19L18 18L14 18ZM14 20L14 21L18 21L18 20L14 20ZM14 22L14 23L18 23L18 22L14 22ZM14 24L14 25L18 25L18 24L14 24ZM14 26L14 27L18 27L18 26L14 26ZM14 28L14 29L18 29L18 28L14 28ZM14 30L14 31L18 31L18 30L14 30ZM14 32L14 33L18 33L18 32L14 32ZM14 34L14 35L18 35L18 34L14 34ZM14 36L14 37L18 37L18 36L14 36ZM14 38L14 39L18 39L18 38L14 38ZM14 40L14 41L18 41L18 40L14 40ZM14 42L14 43L18 43L18 42L14 42ZM14 44L14 45L18 45L18 44L14 44Z" fill="url(#paint0_linear_mobile_arrow)" />
    <defs>
        <linearGradient id="paint0_linear_mobile_arrow" x1="16" y1="0" x2="16" y2="65.3271" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8A8AFF" />
            <stop offset="1" stopColor="#B9B9FF" />
        </linearGradient>
    </defs>
</svg>
                </div>
                
                {/* Первый ряд интеграций */}
                <div className="flex flex-row justify-center gap-4 w-full mb-6">
                    {/* Яндекс Метрика */}
                    <div className="flex flex-col items-center">
                        <div className="w-[90px] h-[90px] bg-white rounded-full flex items-center justify-center mb-1 shadow-sm">
                            <img src={IntegrationsYandexImage} className="w-[90px]" alt="Яндекс Метрика" />
                        </div>
                        <div className="text-sm text-center">
                            Яндекс<br />Метрика
                        </div>
                    </div>
                    
                    {/* Tilda */}
                    <div className="flex flex-col items-center">
                        <div className="w-[90px] h-[90px] bg-white rounded-full flex items-center justify-center mb-1 shadow-sm">
                            <img src={IntegrationsTildaImage} className="w-[90px]" alt="Tilda Publishing" />
                        </div>
                        <div className="text-sm text-center">
                            Tilda<br />Publishing
                        </div>
                    </div>
                    
                    {/* Google Analytics */}
                    <div className="flex flex-col items-center">
                        <div className="w-[90px] h-[90px] bg-white rounded-full flex items-center justify-center mb-1 shadow-sm">
                            <img src={IntegrationsGAImage} className="w-[90px]" alt="Google Analytics" />
                        </div>
                        <div className="text-sm text-center">
                            Google<br />Analytics
                        </div>
                    </div>
                </div>
                
                {/* Второй ряд интеграций */}
                <div className="flex flex-row justify-center gap-16 w-full mb-8">
                    {/* WordPress */}
                    <div className="flex flex-col items-center">
                        <div className="w-[90px] h-[90px] bg-white rounded-full flex items-center justify-center mb-1 shadow-sm">
                            <img src={IntegrationsWPImage} className="w-[90px]" alt="WordPress" />
                        </div>
                        <div className="text-sm text-center">
                            WordPress
                        </div>
                    </div>
                    
                    {/* Bitrix24 */}
                    <div className="flex flex-col items-center">
                        <div className="w-[90px] h-[90px] bg-white rounded-full flex items-center justify-center mb-1 shadow-sm">
                            <img src={IntegrationsB24Image} className="w-[90px]" alt="Bitrix24" />
                        </div>
                        <div className="text-sm text-center">
                            Bitrix24
                        </div>
                    </div>
                </div>
                
                {/* Кнопка */}
                <div className="w-full">
                    <SecondaryLink to="#" className="w-full py-4 px-6 !uppercase rounded-full font-semibold text-center justify-center">
                        смотреть все интеграции
                    </SecondaryLink>
                </div>
            </div>
        </div>
    )
}