import React, { useState, useEffect } from 'react';
import './AboutPage.css';
import cameraPNG from '../../constants/camera.png';
import Fade from 'react-reveal/Fade';


const AboutPage:React.FC = () => {

    const question = 'How can multispectral imagery be used to enhance tetrachromatic interpretation of the world?'


    return(
        <div className="About">
            <Fade>
                <h1 className="title-text">{question}</h1>
            </Fade>
            <div className='description'>
                <Fade>
                    <section>
                        <h1 className='section-title'>About</h1>
                        <p>Hi</p>
                    </section>
                </Fade>
                <Fade>
                    <section>
                        <img className="large-photo" src={cameraPNG} />
                        <h1 className="section-title">Our Approach</h1>

                    </section>
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