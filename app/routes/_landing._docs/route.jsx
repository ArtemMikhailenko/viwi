import { Outlet } from "@remix-run/react";
import Footer from "../../components/landing/Footer";
import Header, { NavBar } from "../../components/landing/Header";

export default function Docs() {
    return (
        <>
            <div className="w-[100vw] h-min">
                <Header />
                {/* <NavBar
                    // className="w-max sticky top-0 z-[999]"
                    style={{ margin: '-56px auto' }}
                /> */}
                <div className="flex flex-col flex-1 mt-38 lg:mt-20 overflow-y-auto overflow-x-hidden">
                    <div className="flex flex-col justify-center items-center w-full">
                        <div className="w-full lg:w-[800px] p-5">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
