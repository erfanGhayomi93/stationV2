import React from 'react';
import { HomePageProvider } from './context';
import HomePageLayout from './Layout';

const Home = () => {
    //
    return (
        <HomePageProvider>
            <HomePageLayout />
        </HomePageProvider>
    );
};

export default Home;
