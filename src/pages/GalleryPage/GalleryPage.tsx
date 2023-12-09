import React from 'react';
import './GalleryPage.css'
import ImageCard from '../../components/Card/ImageCard';
import { images } from '../../constants/imageInfo';

const GalleryPage: React.FC = () => {

    console.log("Available images:", fetch("/getallimages").then(res => res.json()));
    console.log("Images:", images)

    return (
        <div className="gallery">
            {images.map((image, index) => (
                <ImageCard key={index} title={image.title} imageUrl={image.url} />
            ))}
        </div>
    );
};

export default GalleryPage;
