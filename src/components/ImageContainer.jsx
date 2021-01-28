import React from 'react'
import {Image} from 'react-bootstrap'


const ImageContainer = (props) => {
    return (
        <Image src={props.imgSrc} className="" style={{ width:"50px", height:"50px", borderRadius:"50%"}}/>
    )
}

export default ImageContainer