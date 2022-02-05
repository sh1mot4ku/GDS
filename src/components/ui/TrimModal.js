import React, { useState } from "react";
import Modal from "./Modal";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../readImage/cropImage";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import "./ui.scss";

const TrimModal = (props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [error, setError] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const saveCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        props.originPhotoSrc,
        croppedAreaPixels
      );
      props.setPhotoBlob(croppedImage); // Send blob of image to parent component
      props.onClose(); // Close modal
      setError(null);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <Modal onClose={props.onClose} imgCrop>
        <div className="crop-container">
          <Cropper
            image={props.originPhotoSrc}
            crop={crop}
            onCropChange={setCrop}
            zoom={zoom}
            cropShape={props.cropShape || "rect"}
            aspect={props.aspect}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="controls">
          <span id="minus">&#8722;</span>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => onZoomChange(zoom)}
          />
          <span id="plus">&#43;</span>
        </div>
        {error && (
          <div className="error-text">
            <span>{error}</span>
          </div>
        )}
        <div className="buttons">
          <Button onClick={props.onClose} variant="contained" id="close">
            Close
          </Button>
          <Button
            onClick={saveCroppedImage}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default TrimModal;
