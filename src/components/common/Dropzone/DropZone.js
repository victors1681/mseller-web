import React, { useCallback, useState } from "react";
import PhotoIcon from "@material-ui/icons/AddAPhoto";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { showError } from "utils/notifications";
import { useDropzone } from "react-dropzone";

const useStyles = makeStyles(() => ({
  bigAvatar: {
    margin: "auto",
    width: 80,
    height: 80
  }
}));

const DropZone = ({ field, form: { setFieldValue, values } }) => {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(
      acceptedFiles.map(file => ({
        ...file,
        preview: URL.createObjectURL(file)
      }))
    );

    setFieldValue(field.name, acceptedFiles);
  }, []);

  const onDropRejected = useCallback(data => {
    showError("File not supported", data);
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    multiple: false,
    maxSize: 7000000,
    onDropRejected
  });

  console.log(field.value, files, files.preview);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <Avatar
          alt="Load image"
          src={
            (files.length && files[0].preview) ||
            (values.presentImages &&
              values.presentImages.length &&
              values.presentImages[0].img)
          }
          className={classes.bigAvatar}
        >
          <PhotoIcon />
        </Avatar>
      )}
    </div>
  );
};
export default DropZone;
