import { fetchUser } from "../../api"
import Footer from "../../components/landing/Footer"
import Header, { NavBar } from "../../components/landing/Header"
import Hero from "./components/Hero"
import MiniVideo from "./components/MiniVideo"
import Stories from "./components/Stories"
import Integrations from "./components/Integrasions"
import Analytics from "./components/Analytics"
import Trial from "./components/Trial"
import Tariffs from "./components/Tariffs"
import FAQ from "./components/FAQ"

export function shouldRevalidate() {
    return false;
}

export const clientLoader = async () => {
    const { user, error } = await fetchUser()
    return {
        user,
        error,
    }
}

function LandingContent() {
    return (
        <>
            <div className="w-[100vw] h-min">
                <Header />
                {/* <NavBar
                    className="w-max sticky top-0 z-[999]"
                    style={{ margin: '-56px auto' }}
                /> */}
                <div className="flex flex-col flex-1 mt-38 lg:mt-20 overflow-y-auto overflow-x-hidden">
                    <Hero />
                    <MiniVideo />
                    <Stories />
                    <Integrations />
                    <Analytics />
                    <Trial />
                    <Tariffs />
                    {/* <FAQ /> */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export function HydrateFallback() {
    return <LandingContent />
}

export default function Landing() {
    return <LandingContent />
}