import React from 'react';

import './image-modal.styles.scss'

const ImageModal = ({active, src, onClose}) => {

    return (
        <div>
            {
                active ?
                <div className='modal-window'>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                    <img src={src} alt="" className='modal-image'/>
                </div> : null
            }
        </div>
    )
}

export default ImageModal