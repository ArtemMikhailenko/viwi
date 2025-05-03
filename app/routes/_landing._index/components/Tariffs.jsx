import { useEffect, useRef, useState } from "react";
import { NavLink } from "@remix-run/react";

import { fetchTariffs } from "../../../api";
import { PrimaryLink } from "../../../components/Buttons";
import IconCheck from "../../../components/icons/tariffs/IconCheck";
import IconFire from "../../../components/icons/tariffs/IconFire";
import IconStar from "../../../components/icons/tariffs/IconStar";
import IconThumbsup from "../../../components/icons/tariffs/IconThumbsup";
import ToggleSwitch from "../../../components/ToggleSwitch";
import Loader from "../../../components/Loader";
import { numberFormatter } from "../../../utils/helpers";
import { H1 } from "../../../components/landing/Heading";
import MascotIcon1 from "./icons/MascotIcon1";

const ICONS_MAP = {
    0: <IconThumbsup />,
    1: <IconStar />,
    2: <IconFire />,
}

function useLoadTariffs() {
    const loaded = useRef(false);
    const [tariffs, setTariffs] = useState(null);

    useEffect(() => {
        if (loaded.current) return;
        loaded.current = true;

        const load = async () => {
            const { tariffs, error } = await fetchTariffs();
            if (error) {
                console.error(error);
            } else {
                setTariffs(tariffs);
            }
        }

        load();
    }, []);

    return tariffs;
}

function Tariff({ tariff, icon, highlighted, priceIsAnual }) {
    return (
        <div
            className="flex flex-col gap-[10px] items-stretch w-[296px] h-[482px] p-5 pb-[34px] rounded-[12px]"
            style={{
                background: (
                    highlighted
                        ? 'radial-gradient(148.79% 100% at 50% 0%, #FAFAFF 0%, #D7D7FF 66.77%, #EAEAFF 100%)'
                        : '#FAFAFF'
                )
            }}
        >
            <div className="flex flex-row gap-3 w-full h-[24px]">
                <div className="flex items-center justify-center w-[24px] h-[24px]">
                    {icon}
                </div>
                <div className="w-full font-semibold text-lg leading-[24px]">
                    {tariff.name}
                </div>
            </div>
            <div className="w-full h-[40px] mb-1 text-3xl font-bold">
                {numberFormatter.format(priceIsAnual ? tariff.price * 0.8 : tariff.price)} ₽<span className="text-sm font-medium text-[#6F6690]">/мес</span>
            </div>
            <PrimaryLink
                to="/registration"
                className="items-center justify-center"
            >
                Подключить
            </PrimaryLink>
            <div className="flex flex-col gap-3 w-full mt-2 flex-grow">
                <div className="w-full text-xs leading-[20px] font-semibold uppercase">
                    Входит в тариф
                </div>
                <div className="flex flex-col gap-2 w-full">
                    {tariff.features.map((feature, i) => (
                        <div
                            key={`feature-${i}`}
                            className="flex flex-row gap-2 items-center"
                        >
                            <IconCheck active={highlighted} />
                            <div className="text-sm font-normal leading-[22px] text-[#6F6690]">
                                {feature}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Tariffs() {
    const [priceIsAnual, setPriceIsAnual] = useState(false);
    const tariffs = useLoadTariffs();

    return (
        <div id="tariffs" className="w-full flex justify-center pt-[50px] pb-[70px] px-5">
            <div className="w-full max-w-[930px] flex flex-col items-center">
            <H1 className="w-full text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Тарифы</H1>
                
                <div className="w-full flex flex-col items-center gap-10">
                    <div className="flex flex-row gap-[10px] w-[300px] h-[24px] mt-5 mb-2 text-sm leading-[22px] text-[#6F6690] font-medium">
                        <div>В месяц</div>
                        <ToggleSwitch
                            name="annual"
                            value={priceIsAnual}
                            setValue={setPriceIsAnual}
                        />
                        <div>В год <span className="text-[#6B6BFF]">(-20%)</span></div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-5">
                        {tariffs ? (
                            tariffs.map((tariff, i) => (
                                <Tariff
                                    key={tariff.id}
                                    tariff={tariff}
                                    icon={ICONS_MAP[i]}
                                    highlighted={tariff.name == 'Оптимальный'}
                                    priceIsAnual={priceIsAnual}
                                />
                            ))
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
                
                <div
                    className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 p-4 md:p-[17px] md:pl-[29px] rounded-[20px] md:rounded-full mt-10"
                    style={{
                        background: 'radial-gradient(121.85% 100% at 50% 0%, #FAFAFF 0%, #D7D7FF 58.09%, #EAEAFF 100%)',
                    }}
                >
                    <MascotIcon1 className="hidden lg:block" />
                    <div className="w-full md:w-max font-semibold text-base leading-6 -tracking-[0.25px] text-center md:text-left">
                        Индивидуальные решения, если ничего не подошло
                    </div>
                    <NavLink
                        end
                        to="mailto:support@videowidget.pro"
                        className="flex flex-row gap-2 items-center primary-button-gradient-background py-2 px-4 rounded-full text-[14px] cursor-pointer whitespace-nowrap"
                    >
                        <div className="text-gray-50">Связаться с менеджером</div>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}