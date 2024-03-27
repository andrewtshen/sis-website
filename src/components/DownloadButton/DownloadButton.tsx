import React from 'react';
import Button from '@mui/material/Button';
import './DownloadButton.css'

interface DatasetInfoProps {
    url: string;
    fileName: string;
    buttonName: string;
}

const downloadZip = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
  
    document.body.appendChild(link);
    link.click();
  
    // Clean up
    setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
  };

const DownloadButton: React.FC<DatasetInfoProps> = ({ url, fileName, buttonName }) => {
    const handleDownload = () => {
      downloadZip(url, fileName);
    };
  
    return (
      <Button variant='contained' onClick={handleDownload}>
        {buttonName}
      </Button>
    );
  };


export default DownloadButton;