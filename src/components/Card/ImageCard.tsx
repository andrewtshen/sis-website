import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
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
            <Card className="card">
                <CardMedia
                    component="img"
                    alt={title}
                    height="140"
                    image={imageUrl}
                    title={title}
                />
            </Card>
        </div>
    );
};

export default ImageCard;