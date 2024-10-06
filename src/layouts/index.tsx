import { Outlet } from "react-router-dom";
import HeaderLayout from "./components/Header";
import Footer from "./components/Footer";


const AppLayout = () => {
    return (
        <div className="grid grid-cols-one-min bg-back-2 h-screen">

            <main className="grid grid-rows-min-one-min overflow-hidden">
                <header className="h-14 bg-back-surface rounded-b-lg">
                    <HeaderLayout />
                </header>

                <section className="overflow-auto">
                    <Outlet />
                </section>

                <footer className="">
                    <Footer />
                </footer>
            </main>

            <aside className="bg-indigo-300">aside</aside>

        </div>
    )
}


export default AppLayout;
