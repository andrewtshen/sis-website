import React, { useState, useEffect } from 'react';
import './GalleryPage.css';
import ImageCard from '../../components/Card/ImageCard';
import Fade from 'react-reveal/Fade';
import {Grid} from '@mui/material';

class ImageInfo {
    blobUrl: string;
    fileName: string;

    constructor(blobUrl: string, fileName: string) {
        this.blobUrl = blobUrl;
        this.fileName = fileName;
    }
}


const GalleryPage: React.FC = () => {
    const [galleryImageInfos, setGalleryImageInfos] = useState<ImageInfo[]>([]);

    useEffect(() => {
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
                        setGalleryImageInfos(galleryImageBlobs.map((imageBlob: string, index) => {
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

    return (
        
            <div className="gallery">
                <Grid container spacing={4}>
                    {galleryImageInfos.map((imageInfo, index) => (
                        <Fade>
                            <Grid item xs={10} sm={2} md={100}>
                                <ImageCard state={"fileName"} key={index} title={imageInfo.fileName} imageUrl={imageInfo.blobUrl} />
                            </Grid>
                        </Fade>
                    ))}
                </Grid>
            </div>
    );
};

export default GalleryPage;