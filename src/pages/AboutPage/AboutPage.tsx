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
                    <div className='topic'>
                        <h1 className='section-title'>About</h1>
                        <h2 className="topic-format">How do we see?</h2>
                        <img className='large-img' src='https://s3.amazonaws.com/scribblelive-com-prod/wp-content/uploads/2011/12/image_01.png'></img>
                        <section>
                            <p className='description'>Humans see colors because of special cells in our eyes called cones. There are three types of cones, each sensitive to different wavelengths of light: 
                            <ul>
                                <li>S-cones (short wavelength) detect blue light</li>
                                <li>M-cones (medium wavelength) detect green light</li>
                                <li>L-cones (long wavelength) detect red light</li>
                            </ul>When light enters our eyes, these cones absorb different amounts of red, green, and blue light. Our brain then combines these signals to create the full spectrum of colors we see. This is why devices like TV screens, cameras, and phone screens use RGB colorspace to show various images.</p>
                            <div>
                                <img className='small-img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Cone-fundamentals-with-srgb-spectrum.svg/1200px-Cone-fundamentals-with-srgb-spectrum.svg.png'/>
                            </div>
                        </section>
                        <h2 className="topic-format">What is tetrachromacy?</h2>
                        <p className="description">This term refers to the four unique types of cone cells in the eye, allowing certain animals to see the world in a really amazing, almost unbelievable way. It's hard for us humans to get this concept of supercharged vision because we can't imaging this colorspace with our trichromatic (3 cone) visual experience.</p>
                    </div>
                </Fade>
                <Fade>
                    <div className='topic'>
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
                    </div>
                </Fade>
                {/* <Fade>
                    <div className='topic'>
                        <h2>Capture</h2>
                        <h2>Validate</h2>
                        <h2>Reimagine</h2>
                    </div>
                </Fade>
                <Fade>
                    <section>
                        <h1 className="section-title">Related Literature</h1>

                    </section>
                </Fade> */}
            </div>
        </div>
    );
}
export default AboutPage;