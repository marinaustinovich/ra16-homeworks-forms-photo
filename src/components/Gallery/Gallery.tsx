import React, { useState } from "react";
import { nanoid } from "nanoid";
import { ImageDataType, ImageBlock } from "../ImageBlock";
import "./Gallery.css";

export const Gallery = () => {
  const [images, setImages] = useState<ImageDataType[]>([]);

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.readAsDataURL(file);
    });
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = await Promise.all(
        Array.from(e.target.files).map(async (file) => {
          const url = await fileToDataUrl(file);
          return { id: nanoid(), name: "picture", url };
        })
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const onDeleteImage = (id: string) => {
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };

  return (
    <div className="gallery-field-wrapper">
      <div className="gallery-field">
        <input
          data-id="file"
          className="overlapped"
          type="file"
          multiple
          accept="image/*"
          onChange={onFileChange}
        />
        <span data-id="overlap" className="title overlap">
          Click to select
        </span>
      </div>
      <div className="images-wrapper">
        {images.map((image) => (
          <ImageBlock
            key={image.id}
            image={image}
            onDeleteImage={onDeleteImage}
          />
        ))}
      </div>
    </div>
  );
};
