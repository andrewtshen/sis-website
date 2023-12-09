interface ImageProps {
    title: string;
    imageUrl: string;
    state: string;
    updateImg: any;
}

const CarouselImg: React.FC<ImageProps> = ({title, imageUrl, state, updateImg}) => {

    const handleClick = () => {
        updateImg(imageUrl, title);
    };
    
    return (
        <img onClick={handleClick} src={imageUrl} alt={title} />
    )
}
export default CarouselImg;