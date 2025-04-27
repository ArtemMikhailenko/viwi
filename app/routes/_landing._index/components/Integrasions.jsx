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

export default function Integrations() {
    return (
        <div id="integrations" className="grid grid-cols-6 w-full px-5 pt-[50px] pb-[120px]">
            <div className="col-start-2 col-span-4 flex flex-col gap-[30px]">
                <H2 className="w-full text-center">
                    Интегрируйте виджет с системами аналитики, CMS и конструкторами
                </H2>
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
    )
}


`
border: 2px solid;

border-image-source: linear-gradient(180deg, #8A8AFF 0%, #B9B9FF 100%);

`