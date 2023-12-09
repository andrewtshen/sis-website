import React, { useState, useEffect } from 'react';
import './AboutPage.css';
import cameraPNG from '../../constants/camera.png';
import Fade from 'react-reveal/Fade';
import coverJPEG from '../../constants/cover.jpeg';


const AboutPage:React.FC = () => {

    const question = 'How can multispectral imagery be used to enhance tetrachromatic interpretation of the world?'


    return(
        <div className="About">
                <div className='title-container'>
                    <div className='background'><Fade>
                        <h1>{question}</h1>
                    </Fade></div>
                </div>
            <div className='text-components'>
                <Fade>
                    <h1 className='section-title'>About</h1>
                    <h2 className="topic-format">How do we see?</h2>
                    <h2 className="topic-format">What is tetrachromacy?</h2>
                    <p className="description"></p>
                </Fade>
                <Fade>
                    <h1 className="section-title">Our Approach</h1>
                    <p className="description">Our multispectral camera project, "Spectral Imaging System", is a novel project as part of the Computational Color (CS294-164) course offered at UC Berkeley and taught by Professor Ren Ng. This project aims to create a novel multispectral camera capable of capturing images beyond the traditional visible spectrum. By leveraging advanced optics and hyperspectral imaging techniques, the camera is designed to explore new frontiers in color perception and imaging. This project is not just an engineering feat; it also intertwines with vision science, offering insights into how the human eye perceives color and how these perceptions can be enhanced or manipulated through technology. Through our project, we gained hands-on experience in camera design, optical engineering, and computational imaging, culminating in a tool that could redefine our understanding and interaction with color.</p>
                    <section>
                        <img className="large-photo" src={cameraPNG} />
                        <div className="topic-format">
                            <h2>1. Capture</h2>
                            <p>Can we capture data outside of the visual spectrum?</p>
                            <h2>2. Validate</h2>
                            <p>Is the data we capture actually outside of the visual spectrum?</p>
                            <h2>3. Reimagine</h2>
                            <p>How might vision outside of our visual system look like?</p>
                        </div>
                    </section>
                </Fade>
                <Fade>
                    <h1 className="section-title">Capture</h1>
                    <h1 className="section-title">Validate</h1>
                    <h1 className="section-title">Reimagine</h1>
                </Fade>
                <Fade>
                    <section>
                        <h1 className="section-title">Related Literature</h1>

                    </section>
                </Fade>
            </div>
        </div>
    );
}
export default AboutPage;