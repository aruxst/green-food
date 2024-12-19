import React from 'react';

interface MyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {

}

const MyImage: React.FC<MyImageProps> = (props) => {
    return (
        <img src={`${process.env.REACT_APP_API_URL}${props.src}`} alt={props.alt || 'Image'} {...props} />
    );
};

export default MyImage;