import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import './ImageCard.css'

interface ImageCardProps {
    title: string;
    imageUrl: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ title, imageUrl }) => {
    return (
        <Card className="card">
            <CardMedia
                component="img"
                alt={title}
                height="140"
                image={imageUrl}
                title={title}
            />
        </Card>
    );
};

export default ImageCard;