import React from 'react'
import {Image} from 'react-bootstrap'


const ImageContainer = (props) => {
    return (
        <Image src={props.imgSrc} className="img-fluid rounded-circle" style={{objectFit: "contain"}}/>
    )
}

export default ImageContainer