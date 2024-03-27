import '../../components/Carousel/Carousel.css'
import ArrowBackNewIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardNewIosIcon from '@mui/icons-material/ArrowForwardIos';
import CarouselImg from './CarouselImg';


import React, {useEffect, useState} from 'react';

class ImageInfo {
    blobUrl: string;
    fileName: string;

    constructor(blobUrl: string, fileName: string) {
        this.blobUrl = blobUrl;
        this.fileName = fileName;
    }
}

interface CarouselProps {
    updateImg: any;
}


const Carousel: React.FC<CarouselProps> = ({ updateImg }) => {
    const [carouselImageInfos, setCarouselImageInfos] = useState<ImageInfo[]>([]);
    
    const handleRightShift = () => {
        let updatedCarouselImages = [...carouselImageInfos]
        let removedElement = updatedCarouselImages.shift();
        if (removedElement !== undefined) {
            updatedCarouselImages.push(removedElement);
            setCarouselImageInfos(updatedCarouselImages);
        }
    }

    const handleLeftShift = () => {
        console.log('Hiitt')
        let updatedCarouselImages = [...carouselImageInfos]
        let removedElement = updatedCarouselImages.pop();
        console.log(removedElement)
        if (removedElement !== undefined) {
            updatedCarouselImages.unshift(removedElement);
            setCarouselImageInfos(updatedCarouselImages);
        }
    }

    useEffect(() => {
        console.log('ran')
        fetch("/api/get_all_gallery_filenames")
            .then(res => res.json())
            .then(fileNames => {
                const fetchPromises = fileNames.map((fileName: any) => {
                    const fetchImageUrl = `/api/get_gallery_image?fileName=${fileName}`;
                    return fetch(fetchImageUrl)
                        .then(response => response.blob())
                        .then(blob => URL.createObjectURL(blob))
                        .catch(error => {
                            console.error('Error fetching the image:', error);
                            return null;
                        });
                });

                Promise.all(fetchPromises)
                    .then(galleryImageBlobs => {
                        setCarouselImageInfos(galleryImageBlobs.map((imageBlob: string, index) => {
                            return new ImageInfo(imageBlob, fileNames[index])
                        }));
                    })
                    .catch(error => {
                        console.error('Error fetching images:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching image names:', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once (on mount)
    
  return (carouselImageInfos &&
    <div className="carousel-container">
        <div className="row">
            <div className="col-xs-11 col-md-10 col-centered">
                <div className="carousel-inner">
                    <div className="svg_icons item">
                        <ArrowBackNewIosIcon onClick={handleLeftShift}/>
                    </div>
                    {carouselImageInfos.slice(0,3).map((imageInfo, index) => (
                    <div className='item'>
                        <CarouselImg updateImg={updateImg} title={imageInfo.fileName} key={index} imageUrl={imageInfo.blobUrl} state="filename" />
                    </div>
                            ))}
                    <div className="svg_icons item">
                        <ArrowForwardNewIosIcon onClick={handleRightShift}/>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};

export default Carousel;
