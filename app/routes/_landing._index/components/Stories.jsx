import { H2 } from "../../../components/landing/Heading";
import CarouselImage1 from "../images/carousel-story-1.png";
import CarouselImage2 from "../images/carousel-story-2.png";
import CarouselImage3 from "../images/carousel-story-3.png";
import CarouselImage4 from "../images/carousel-story-4.png";
import StoryImage1 from "../images/story-1.png";
import StoryImage2 from "../images/story-2.png";
import StoryImage3 from "../images/story-3.png";
import { CarouselItem } from "./common/Carousel";

export default function Stories() {
    return (
        <div id="story-widgets" className="grid grid-cols-6 pl-5 mt-[50px]">
            <div className="col-start-2 col-span-5 flex flex-col gap-5">
                <H2 className="max-w-[670px]">Сторис для вашего сайта как в популярных сетях</H2>
                <div className="grid grid-cols-10 grid-rows-5 gap-10">
                    <div className="col-span-10 row-span-1 flex flex-row gap-10">
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-base">Формат:</span>
                            <span className="flex flex-row items-center justify-center gap-1 text-base">
                                Сторис
                                <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="6" cy="7" r="6" fill="#2D215A" />
                                    <circle cx="15" cy="7" r="6.5" fill="#2D215A" stroke="#E6E6F4" />
                                </svg>
                            </span>
                        </div>
                        {/* Videos */}
                        <div className="flex flex-row gap-4 items-start">
                            <img src={StoryImage1} className="w-[105px] aspect-square" />
                            <img src={StoryImage2} className="w-[105px] aspect-square" />
                            <img src={StoryImage3} className="w-[105px] aspect-square" />
                        </div>
                    </div>
                    {/* Carousel */}
                    <div className="col-span-10 row-span-4 pr-5 overflow-x-scroll">
                        <div className="flex flex-row gap-5 w-min overflow-y-hidden">
                            <CarouselItem text="Загружайте в сторис изображения или видео">
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
                                text="Добавляйте подзаголовок, фон и эмодзи для оформления сторис"
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