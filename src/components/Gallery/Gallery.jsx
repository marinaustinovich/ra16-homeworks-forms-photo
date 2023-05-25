import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import './Gallery.css';
import ImageBlock from '../ImageBlock/ImageBlock';

function Gallery() {
    const [images, setImages] = useState([]); 

    const fileToDataUrl = async (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.addEventListener('load', (evt) => {
                resolve(evt.currentTarget.result);
            });
        
            fileReader.addEventListener('error', (evt) => {
                reject(evt.currentTarget.error);
            });
        
            fileReader.readAsDataURL(file);
            });
        };

    const onFileChange = async (e) => {
        const files = [...e.target.files];
        const urls = await Promise.all(files.map((file) => fileToDataUrl(file)));
    
        const newImages = urls.map((url) => ({
            id: nanoid(),
            name: "picture",
            url,
        }));
    
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const onDeleteImage = (id) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    }
    
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
                {images.map((image) => (<ImageBlock key={image.id} image={image} onDeleteImage={onDeleteImage}/>))}
            </div>
        </div>
    );
}

export default Gallery;
