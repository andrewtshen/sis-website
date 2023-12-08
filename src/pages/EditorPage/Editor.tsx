import React, { useEffect, useRef, ChangeEvent } from 'react';
import './Editor.css';
import { toBeRequired } from '@testing-library/jest-dom/matchers';
import { Dropdown } from 'react-bootstrap';

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

  const [mapping, setMapping] = React.useState(["R", "G", "B"]);
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

  const handleRSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    let newMapping = mapping;
    newMapping[0] = String(event.target.value);
    setMapping(newMapping);
    console.log("Image src:", imageSrc);
    console.log("Mapping:", mapping)
  }

  const handleGSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(String(event.target.value))
    let newMapping = mapping;
    newMapping[1] = String(event.target.value);
    setMapping(newMapping);
    console.log("Image src:", imageSrc);
    console.log("Mapping:", mapping)
    console.log(fetch(`/recolorize?imageSrc=${imageSrc}`).then(res => res.json()))
  }

  const handleBSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(String(event.target.value))
    let newMapping = mapping;
    newMapping[2] = String(event.target.value);
    setMapping(newMapping);
    console.log("Image src:", imageSrc);
    console.log("Mapping:", mapping)
  }

  const rotateLeft = () => {
    setRotate(rotate - 90);
  };

  const rotateRight = () => {
    setRotate(rotate + 90);
  };

  const handleFlipVertical = () => {
    // Toggle the value by negating it
    setFlipVertical(-flipVertical);
  };

  const handleFlipHorizontal = () => {
    // Toggle the value by negating it
    setFlipHorizontal(-flipHorizontal);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      console.log("Location of new file:", URL.createObjectURL(file))
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

  const resetGUI = () => {
    setBrightness(100);
    setSaturation(100);
    setGrayscale(0);
    setRotate(0);
    setInversion(0);
    setFlipHorizontal(1);
    setFlipVertical(1);
  }

  // Other event handlers can go here

  return (
    <div className="editor">
      <div className="container">
        <h2>Spectral Imaging System Editor</h2>
        <div className="wrapper">
          <div className="editor-panel">
            {/* Recolorize Section */}
            <div className="recolorization">
              <label className="title">Recolorization Tools</label>
              <div>
                Remapping for R Channel:
                <select className="form-select" aria-label="Default select example" onChange={handleRSelection}>
                  <option selected>Choose a channel:</option>
                  <option value="R">R</option>
                  <option value="G">G</option>
                  <option value="B">B</option>
                  <option value="IR">IR</option>
                  <option value="UV">UV</option>
                </select>
              </div>

              <div>
                Remapping for G Channel:
                <select className="form-select" aria-label="Default select example" onChange={handleGSelection}>
                  <option selected>Choose a channel:</option>
                  <option value="R">R</option>
                  <option value="G">G</option>
                  <option value="B">B</option>
                  <option value="IR">IR</option>
                  <option value="UV">UV</option>
                </select>
              </div>

              <div>
                Remapping for B Channel:
                <select className="form-select" aria-label="Default select example" onChange={handleBSelection}>
                  <option selected>Choose a channel:</option>
                  <option value="R">R</option>
                  <option value="G">G</option>
                  <option value="B">B</option>
                  <option value="IR">IR</option>
                  <option value="UV">UV</option>
                </select>
              </div>
            </div>
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
              <div className="options">
                {/* Buttons for rotate and flip */}
                <button id="left" onClick={rotateLeft}><i className="fa-solid fa-rotate-left">Rotate Left</i></button>
                <button id="right" onClick={rotateRight}><i className="fa-solid fa-rotate-right">Rotate Right</i></button>
                <button id="horizontal" onClick={handleFlipHorizontal}><i className='bx bx-reflect-horizontal'>Flip Horizontal</i></button>
                <button id="vertical" onClick={handleFlipVertical}><i className='bx bx-reflect-vertical'>Flip Vertical</i></button>
              </div>
            </div>
          </div>

          {/* Image Preview */}
          <div className="preview-img">
            {!fileInputRef.current && <img src="https://ajay-dhangar.github.io/Image-Editor/image-placeholder.svg" alt="preview-img" />}
            {imageSrc && <img
              ref={imageRef}
              src={imageSrc}
              alt="Uploaded"
              style={{ filter: `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversion}%)`, transform: `rotate(${rotate}deg) scaleX(${flipVertical}) scaleY(${flipHorizontal})` }}
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
