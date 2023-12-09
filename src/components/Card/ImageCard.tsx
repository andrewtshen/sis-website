import React from 'react';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import './ImageCard.css';
import { useNavigate } from 'react-router-dom';

interface ImageCardProps {
    title: string;
    imageUrl: string;
    state: string;
}

// Note: the title is the same as the fileName
const ImageCard: React.FC<ImageCardProps> = ({ title, imageUrl, state }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Editor', {
            state: { fileName : title }
        });
    };

    return (
        <div onClick={handleClick}>
            <img src={imageUrl} title={title} alt={title}/>
        </div>
    );
};

export default ImageCard;