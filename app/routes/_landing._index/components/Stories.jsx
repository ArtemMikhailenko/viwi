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
        <div id="story-widgets" className="pt-[50px] pb-[70px] px-5 md:pl-5 md:pr-0">
            <div className="md:grid md:grid-cols-6">
                <div className="md:col-start-2 md:col-span-5 flex flex-col gap-5">
                    <H2 className="max-w-[670px] text-center md:text-left">Сторис для вашего сайта как в популярных сетях</H2>
                    <div className="md:grid md:grid-cols-10 md:grid-rows-5 md:gap-10">
                        <div className="md:col-span-10 md:row-span-1 flex flex-col md:flex-row gap-5 md:gap-10 mb-8 md:mb-0 items-center md:items-start">
                            <div className="flex flex-col gap-1 items-center md:items-start">
                                <span className="font-semibold text-base">Формат:</span>
                                <span className="flex flex-row items-center justify-center gap-1 text-base">
                                    Сторис
                                    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="6" cy="7" r="6" fill="#2D215A" />
                                        <circle cx="15" cy="7" r="6.5" fill="#2D215A" stroke="#E6E6F4" />
                                    </svg>
                                </span>
                            </div>
                            
                            {/* Story Images - скролл на мобильных */}
                            <div className="w-full overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-5 px-5 md:mx-0 md:px-0 md:w-auto md:overflow-visible pb-4 md:pb-0">
                                <div className="flex flex-row gap-4 items-start min-w-min mx-auto md:mx-0 justify-center md:justify-start">
                                    <div className="flex-shrink-0 snap-start">
                                        <img src={StoryImage1} className="w-[105px] aspect-square" />
                                    </div>
                                    <div className="flex-shrink-0 snap-start">
                                        <img src={StoryImage2} className="w-[105px] aspect-square" />
                                    </div>
                                    <div className="flex-shrink-0 snap-start">
                                        <img src={StoryImage3} className="w-[105px] aspect-square" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Carousel - вертикальная колонка на мобильных, горизонтальный скролл на десктопе */}
                        <div className="md:col-span-10 md:row-span-4 md:overflow-x-auto md:snap-x md:snap-mandatory md:scrollbar-none md:-mx-0 md:px-0 md:pr-5 pb-4">
                            <div className="flex flex-col md:flex-row gap-5 md:w-min md:overflow-y-hidden items-center md:items-start">
                                <div className="w-full md:w-auto md:snap-start md:flex-shrink-0 flex justify-center md:justify-start">
                                    <CarouselItem text="Загружайте в сторис изображения или видео">
                                        <div className="px-4 pt-4">
                                            <img src={CarouselImage1} className="mx-auto" />
                                        </div>
                                    </CarouselItem>
                                </div>
                                <div className="w-full md:w-auto md:snap-start md:flex-shrink-0 flex justify-center md:justify-start">
                                    <CarouselItem
                                        text="Вставляйте кнопку с ссылкой на другую страницу"
                                        className="justify-end"
                                    >
                                        <div className="px-2">
                                            <img src={CarouselImage2} className="mx-auto" />
                                        </div>
                                    </CarouselItem>
                                </div>
                                <div className="w-full md:w-auto md:snap-start md:flex-shrink-0 flex justify-center md:justify-start">
                                    <CarouselItem
                                        text="Добавляйте подзаголовок, фон и эмодзи для оформления сторис"
                                    >
                                        <img src={CarouselImage3} className="mx-auto" />
                                    </CarouselItem>
                                </div>
                                <div className="w-full md:w-auto md:snap-start md:flex-shrink-0 flex justify-center md:justify-start">
                                    <CarouselItem text="Настраивайте условия показа: когда и где показывать виджет">
                                        <img src={CarouselImage4} className="mx-auto" />
                                    </CarouselItem>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}