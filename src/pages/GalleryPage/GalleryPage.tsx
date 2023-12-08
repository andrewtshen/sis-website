import React from 'react';
import './GalleryPage.css'
import ImageCard from '../../components/Card/ImageCard';
import {images} from '../../constants/imageInfo';
import Fade from 'react-reveal/Fade';

const GalleryPage: React.FC = () => {

    return (
        <div className="gallery">
            {images.map((image, index) => (
                <Fade>
                    <ImageCard key={index} title={image.title} imageUrl={image.url} />
                </Fade>
            ))}
        </div>
    );
};

export default GalleryPage;
