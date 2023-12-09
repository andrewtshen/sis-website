import React, { useEffect, useRef, ChangeEvent } from 'react';
import './Editor.css';
import { toBeRequired } from '@testing-library/jest-dom/matchers';

const Editor: React.FC = () => {
  // Add any state or functions you need here
  // For example, to handle the range input value:
  const [brightness, setBrightness] = React.useState(100);
  const [saturation, setSaturation] = React.useState(100);
  const [inversion, setInversion] = React.useState(0);
  const [grayscale, setGrayscale] = React.useState(0);
  const [rotate, setRotate] = React.useState(0);
  const [flipHorizontal, setFlipHorizontal] = React.useState(1);
  const [flipVertical, setFlipVertical] = React.useState(1);
  const [isDisabled, setIsDisabled] = React.useState(true);

  const [imageSrc, setImageSrc] = React.useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleBrightnessChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(event.target.value));
  };

  const handleSaturationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSaturation(Number(event.target.value));
  };

  const handleInversionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInversion(Number(event.target.value));
  };

  const handleGrayscaleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGrayscale(Number(event.target.value));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageSrc('https://ajay-dhangar.github.io/Image-Editor/image-placeholder.svg');
      setIsDisabled(false);
    }
  };

  const saveImage = () => {
    if (imageRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imageRef.current.naturalWidth;
      canvas.height = imageRef.current.naturalHeight;

      if (ctx) {
        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)`;
        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement('a');
        link.download = 'edited-image.png';
        link.href = image;
        link.click();
      }
    }
  };

  const resetGUI = () => {
    setBrightness(100);
    setSaturation(100);
    setGrayscale(0);
    setRotate(0);
    setInversion(0);
    setFlipHorizontal(0);
    setFlipVertical(0);
  }

  // Other event handlers can go here

  return (
    <div className="editor">
      <div className="container"> 
        <h2>Spectral Imaging System Editor</h2>
        <div className="wrapper">
          <div className="editor-panel">
            {/* Filter Section */}
            <div className="filter">
              <label className="title">Filters</label>
              <div className="slider">
                <div className="filter-info">
                  <p className="name">Brightness</p>
                  <p className="value">{brightness}%</p>
                </div>
                <input type="range" value={brightness} min="0" max="200" onChange={handleBrightnessChange} />
              </div>
              <div className="slider">
                <div className="filter-info">
                  <p className="name">Saturation</p>
                  <p className="value">{saturation}%</p>
                </div>
                <input type="range" value={saturation} min="0" max="200" onChange={handleSaturationChange} />
              </div>
              <div className="slider">
                <div className="filter-info">
                  <p className="name">Inversion</p>
                  <p className="value">{inversion}%</p>
                </div>
                <input type="range" value={inversion} min="0" max="100" onChange={handleInversionChange} />
              </div>
              <div className="slider">
                <div className="filter-info">
                  <p className="name">Grayscale</p>
                  <p className="value">{grayscale}%</p>
                </div>
                <input type="range" value={grayscale} min="0" max="100" onChange={handleGrayscaleChange} />
              </div>
            </div>

            {/* Rotate & Flip Section */}
            <div className="rotate">
              <label className="title">Rotate & Flip</label>
              <div className="options">
                {/* Buttons for rotate and flip */}
                <button id="left"><i className="fa-solid fa-rotate-left"></i></button>
                <button id="right"><i className="fa-solid fa-rotate-right"></i></button>
                <button id="horizontal"><i className='bx bx-reflect-vertical'></i></button>
                <button id="vertical"><i className='bx bx-reflect-horizontal'></i></button>
              </div>
            </div>
          </div>

          {/* Image Preview */}
          <div className="preview-img">
            {!fileInputRef.current && <img src="https://ajay-dhangar.github.io/Image-Editor/image-placeholder.svg" alt="preview-img"/>}
            {imageSrc && <img
              ref={imageRef}
              src={imageSrc}
              alt="Uploaded"
              style={{ filter: `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)` }}
            />}
          </div>
        </div>

        {/* Controls */}
        <div className="controls">
          <button className="reset-filter" onClick={resetGUI}>Reset Filters</button>
          <div className="row">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="file-input" accept="image/*" hidden />
            <button className="choose-img" onClick={() => fileInputRef.current?.click()}>Select Image</button>
            <button className="save-img" onClick={saveImage}>Save Image</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
