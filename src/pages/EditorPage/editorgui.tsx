// import React, { Component } from 'react';
import './Button.css'; // Tell webpack that Button.js uses these styles

class Editor {
  public fileInput: HTMLInputElement | null = document.querySelector(".file-input");
  public filterOptions: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(".filter button");
  public filterName: HTMLInputElement | null = document.querySelector(".filter-info .name");
  public filterValue: HTMLInputElement | null = document.querySelector(".filter-info .value");
  public filterSlider: HTMLInputElement | null = document.querySelector(".slider input");
  public rotateOptions: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll(".rotate button");
  public previewImg: HTMLImageElement | null = document.querySelector(".preview-img img");
  public resetFilterBtn: HTMLInputElement | null = document.querySelector(".reset-filter");
  public chooseImgBtn = document.querySelector(".choose-img");
  public saveImgBtn = document.querySelector(".save-img");
  private brightness: string;
  private saturation: string;
  private inversion: string;
  private grayscale: string;
  private rotate: number;
  private flipHorizontal: number;
  private flipVertical: number;

  public constructor() {
    this.brightness = "100";
    this.saturation = "100";
    this.inversion = "0";
    this.grayscale = "0";
    this.rotate = 0;
    this.flipHorizontal = 1;
    this.flipVertical = 1;
  }

  public main() {
    const loadImage = () => {
      if (this.fileInput == null || this.fileInput.hasOwnProperty("files") || this.fileInput.files == null) {
        return;
      }
      let file = this.fileInput.files[0];
      if (!file) return;  
      if (this.previewImg == null || this.previewImg.src == null) {
        return;
      }
      this.previewImg.src = URL.createObjectURL(file);
      this.previewImg.addEventListener("load", () => {
        if (this.resetFilterBtn == null) {
          return;
        }
        this.resetFilterBtn.click();
        document.querySelector(".container")?.classList.remove("disable");
      });
    };
  
    const applyFilter = () => {
      if (this.previewImg == null) {
        return;
      }
      this.previewImg.style.transform = `rotate(${this.rotate}deg) scale(${this.flipHorizontal}, ${this.flipVertical})`;
      this.previewImg.style.filter = `brightness(${this.brightness}%) saturate(${this.saturation}%) invert(${this.inversion}%) grayscale(${this.grayscale}%)`;
    };
  
    if (this.filterOptions == null) {
      return;
    }
    this.filterOptions.forEach((option : any) => {
      option.addEventListener("click", () => {
        document.querySelector(".active")?.classList.remove("active");
        option.classList.add("active");
        if (this.filterName == null) {
          return;  
        }
        this.filterName.innerText = option.innerText;

        if (option.id === "brightness") {
          if (this.filterSlider == null) {
            return;
          }
          this.filterSlider.max = "200";
          this.filterSlider.value = this.brightness;
          if (this.filterValue == null) {
            return;
          }
          this.filterValue.innerText = `${this.brightness}%`;
        } else if (option.id === "saturation") {
          if (this.filterSlider == null) {
            return;
          }
          this.filterSlider.max = "200";
          this.filterSlider.value = this.saturation;
          if (this.filterValue == null) {
            return;
          }
          this.filterValue.innerText = `${this.saturation}%`;
        } else if (option.id === "inversion") {
          if (this.filterSlider == null) {
            return;
          }
          this.filterSlider.max = "100";
          this.filterSlider.value = this.inversion;
          if (this.filterValue == null) {
            return;
          }
          this.filterValue.innerText = `${this.inversion}%`;
        } else {
          if (this.filterSlider == null) {
            return;
          }
          this.filterSlider.max = "100";
          this.filterSlider.value = this.grayscale;
          if (this.filterValue == null) {
            return;
          }
          this.filterValue.innerText = `${this.grayscale}%`;
        }
      });
    });
  
    const updateFilter = () => {
      if (this.filterValue == null || this.filterSlider == null) {
        return;
      }
      this.filterValue.innerText = `${this.filterSlider.value}%`;
      const selectedFilter = document.querySelector(".filter .active");
      
      if (selectedFilter == null || this.filterSlider == null) {
        return null;
      }
      if (selectedFilter.id === "brightness") {
        this.brightness = this.filterSlider.value;
      } else if (selectedFilter.id === "saturation") {
        this.saturation = this.filterSlider.value;
      } else if (selectedFilter.id === "inversion") {
        this.inversion = this.filterSlider.value;
      } else {
        this.grayscale = this.filterSlider.value;
      }
      applyFilter();
    };
    
    if (this.rotateOptions == null) {
      return;
    }
    this.rotateOptions.forEach((option) => {
      option.addEventListener("click", () => {
        if (option.id === "left") {
          this.rotate -= 90;
        } else if (option.id === "right") {
          this.rotate += 90;
        } else if (option.id === "horizontal") {
          this.flipHorizontal = this.flipHorizontal === 1 ? -1 : 1;
        } else {
          this.flipVertical = this.flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
      });
    });
  
    const resetFilter = () => {
      this.brightness = "100";
      this.saturation = "100";
      this.inversion = "0";
      this.grayscale = "0";
      this.rotate = 0;
      this.flipHorizontal = 1;
      this.flipVertical = 1;
      if (this.filterOptions == null) {
        return;
      }
      this.filterOptions[0].click();
      applyFilter();
    };
  
    const saveImage = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx == null) {
        return
      }
      if (this.previewImg == null) {
        return;
      }
      canvas.width = this.previewImg.naturalWidth;
      canvas.height = this.previewImg.naturalHeight;
  
      ctx.filter = `brightness(${this.brightness}%) saturate(${this.saturation}%) invert(${this.inversion}%) grayscale(${this.grayscale}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (this.rotate !== 0) {
        ctx.rotate((this.rotate * Math.PI) / 180);
      }
      ctx.scale(this.flipHorizontal, this.flipVertical);
      ctx.drawImage(
        this.previewImg,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
  
      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = canvas.toDataURL();
      link.click();
    };
  
    if (this.filterSlider == null || this.filterSlider == null || this.resetFilterBtn == null || this.saveImgBtn == null || this.fileInput == null || this.fileInput == null || this.chooseImgBtn == null) {
      return;
    }
    this.filterSlider.addEventListener("input", updateFilter);
    this.resetFilterBtn.addEventListener("click", resetFilter);
    this.saveImgBtn.addEventListener("click", saveImage);
    this.fileInput.addEventListener("change", loadImage);
    if (this.fileInput == null) {
      return;
    }
    this.chooseImgBtn.addEventListener("click", () => this.fileInput?.click());
  }
}

export default Editor;