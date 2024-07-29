import clsx from 'clsx';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom'
import Logo from 'src/common/components/Logo';
import { findTitlePage } from 'src/utils/helpers';


const AuthLayout = () => {
    const { pathname } = useLocation();


    useEffect(() => {
        findTitlePage(pathname)
    }, [pathname])

    const pathName =
        location.pathname.replaceAll('/', '-').slice(1).split("-")[0] + '-background.jpg';

    return (
        <div
            className={`h-[100vh] w-full bg-cover bg-center bg-no-repeat relative bg-L-gray-50 dark:bg-D-gray-50 overflow-x-hidden`}
            style={{ backgroundImage: `url(/assets/images/${pathName})` }}
        >
            <div className="flex flex-col max-w-[1900px] mx-auto w-full h-full select-none">
                <div className="flex grow gap-6 items-center md:justify-center xl:justify-start pb-3 mr-0 xl:mr-[8%]">
                    <div className={clsx('pt-3')}>
                        <div
                            className={clsx(
                                'bg-L-basic dark:bg-D-basic min-w-[450px] max-w-[450px] rounded-3xl shadow-md relative',
                            )}
                        >
                            <div
                                className={clsx('px-8 pt-6 pb-4')}
                            >
                                <Logo />
                                <Outlet />
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    )
}


export default AuthLayout

