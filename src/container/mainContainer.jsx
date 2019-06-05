import React from 'react';
import Header from '../components/header/header';
import NavSideBar from '../components/navSideBar/navSidebar';
import Welcome from '../components/popup/welcome';

const Main = () => {
    return (
        <div>
            <h1>Our cool ProtoGraphQL App</h1>
            {/* 
            uncomment the components to test
            <Header />
            <NavSideBar />
            <Welcome /> */}
        </div>
    )
}


export default Main;