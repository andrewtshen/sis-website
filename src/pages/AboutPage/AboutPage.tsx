import React, { useState, useEffect } from 'react';
import './AboutPage.css';


const AboutPage:React.FC = () => {

    const question = 'How can multispectral imagery be used to enhance tetrachromatic interpretation of the world?'


    return(
        <div className="About">
            <h1 className="title-text">{question}</h1>
        </div>
    );
}
export default AboutPage;