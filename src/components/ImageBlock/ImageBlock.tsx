import React from "react";
import "./ImageBlock.css";

export type ImageDataType = {
  url: string;
  id: string;
  name?: string;
};

type Props = {
  image: ImageDataType;
  onDeleteImage: (value: string) => void;
};

export const ImageBlock = ({ image, onDeleteImage }: Props) => (
  <div className="image-block">
    <img
      className="image"
      src={image.url}
      alt={image.name}
      data-id={image.id}
    />
    <button
      type="button"
      className="btn-close"
      onClick={() => onDeleteImage(image.id)}
    >
      <span className="sr-only">Close</span>
      <span className="span-close" aria-hidden="true">
        ×
      </span>
    </button>
  </div>
);
