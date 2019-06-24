import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = ({ handleImages }) => {
  const onDrop = useCallback(acceptedFiles => {
    // mutation({
    //   variables: {
    //     file: acceptedFiles[0]
    //   }
    // })
    //   .then(response => {
    //     console.log("From Grap", response);
    //   })
    //   .catch(err => {
    //     console.log("From Grap", err);
    //   });

    handleImages(acceptedFiles);
  }, []);

  const onDropRejected = useCallback(data => {
    console.error("File no acepted", data);
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    multiple: false,
    maxSize: 7000000,
    onDropRejected
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </div>
  );
};
export default DropZone;
