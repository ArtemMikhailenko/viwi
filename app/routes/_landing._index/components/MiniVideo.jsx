import { H2 } from "../../../components/landing/Heading";
import LandingImage2 from "../../../images/landing-2.png"  // TODO: move
import CarouselImage1 from "../images/carousel-mini-video-1.png";
import CarouselImage2 from "../images/carousel-mini-video-2.png";
import CarouselImage3 from "../images/carousel-mini-video-3.png";
import CarouselImage4 from "../images/carousel-mini-video-4.png";
import { CarouselItem } from "./common/Carousel";

export default function MiniVideo() {
    return (
        <div id="mini-video-widgets" className="grid grid-cols-6 pt-[50px] pb-[70px] pl-5">
            <div className="col-start-2 col-span-5 flex flex-col gap-5">
                <H2>мини видео любого размера</H2>
                <div className="grid grid-cols-10 grid-rows-3 gap-10">
                    <div className="col-span-10 row-span-1 flex flex-row gap-10">
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-base">Формат:</span>
                            <span className="flex flex-row items-center justify-center gap-1 text-base">
                                Мини видео
                                <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="12" height="16" rx="2" fill="#2D215A" />
                                </svg>
                            </span>
                        </div>
                        {/* Videos */}
                        <div className="flex flex-row gap-4 items-start">
                            <div className="flex flex-col gap-2 w-[140px] p-2.5 rounded-2xl bg-[#E6E6F4]">
                                <img src={LandingImage2} className="w-full rounded-[10px]" />
                                <span className="text-sm leading-[120%]">
                                    Мини видео с подписью
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 w-[140px] p-2.5 rounded-2xl bg-[#E6E6F4]">
                                <img src={LandingImage2} className="w-full rounded-[10px]" />
                            </div>
                            <div className="flex flex-col gap-2 w-[180px] p-2.5 rounded-2xl bg-[#E6E6F4]">
                                <img
                                    src={LandingImage2}
                                    className="w-full h-[120px] rounded-[10px] object-cover"
                                    style={{ objectPosition: 'top -26px left 0' }}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Carousel */}
                    <div className="col-span-10 row-span-2 pr-5 overflow-x-scroll">
                        <div className="flex flex-row gap-5 w-min overflow-y-hidden">
                            <CarouselItem text="Загружайте в виджет мини видео файлы до 1 гб">
                                <div className="px-4 pt-4">
                                    <img src={CarouselImage1} />
                                </div>
                            </CarouselItem>
                            <CarouselItem
                                text="Вставляйте кнопку с ссылкой на другую страницу"
                                className="justify-end"
                            >
                                <div className="px-2">
                                    <img src={CarouselImage2} />
                                </div>
                            </CarouselItem>
                            <CarouselItem
                                text="Добавляйте подзаголовок, обводку и эмодзи для оформления виджета"
                                // className="justify-end"
                            >
                                <img src={CarouselImage3} />
                            </CarouselItem>
                            <CarouselItem text="Настраивайте условия показа: когда и где показывать виджет">
                                <img src={CarouselImage4} />
                            </CarouselItem>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
