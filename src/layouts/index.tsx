import { Outlet } from "react-router-dom";
import HeaderLayout from "./components/Header";
import Footer from "./components/Footer";


const AppLayout = () => {
    return (
        <div className="grid grid-cols-one-min bg-back-2">

            <main className="grid grid-rows-min-one-min h-screen">
                <header className="h-14 bg-back-surface rounded-b-lg">
                    <HeaderLayout />
                </header>

                <section>
                    <article>
                        <Outlet />
                    </article>
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
