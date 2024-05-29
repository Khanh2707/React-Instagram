import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';

function ImageCropper({ image, onCropDone, selectedRatio, isConfirmCrop }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const [croppedArea, setCroppedArea] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(1 / 1);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels)
    }

    const onAspectRatioChange = () => {
        setAspectRatio(selectedRatio)
    }

    useEffect(() => {
        onAspectRatioChange()
    }, [selectedRatio])

    useEffect(() => {
        if (isConfirmCrop)
            onCropDone(croppedArea)
    }, [isConfirmCrop])

    return (
        <>
            <Cropper
                image={image}
                aspect={aspectRatio}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
            />
        </>
    );
}

export default ImageCropper;