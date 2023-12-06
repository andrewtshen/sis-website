import React, { useState, useRef, ChangeEvent } from 'react';

const ImageEditor: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [brightness, setBrightness] = useState<number>(100);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  const handleBrightnessChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBrightness(parseInt(event.target.value, 10));
  };

  const saveImage = () => {
    if (imageRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imageRef.current.naturalWidth;
      canvas.height = imageRef.current.naturalHeight;

      if (ctx) {
        ctx.filter = `brightness(${brightness}%)`;
        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = image;
        link.click();
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current?.click()}>Choose Image</button>
      {imageSrc && (
        <>
          <div>
            <label>Brightness: </label>
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={handleBrightnessChange}
            />
          </div>
          <img
            ref={imageRef}
            src={imageSrc}
            alt="Uploaded"
            style={{ filter: `brightness(${brightness}%)` }}
          />
          <button onClick={saveImage}>Save Image</button>
        </>
      )}
    </div>
  );
};

export default ImageEditor;
