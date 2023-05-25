import React from 'react';
import PropTypes from 'prop-types';
import './ImageBlock.css';

function ImageBlock(props) {
    const {image, onDeleteImage} = props;
    console.log(image);

    const deleteImage = () => {
        return onDeleteImage(image.id);
    };

    return (
        <div className="image-block">
            <img className="image" src={image.url} alt={image.name} data-id={image.id} />
            <button type="button" className="btn-close" onClick={deleteImage}>
            <span className="sr-only">Close</span>
            <span className="span-close" aria-hidden="true">×</span>
            </button>

        </div>
    );
}

ImageBlock.propTypes = {
    image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string
    }).isRequired
}

export default ImageBlock
