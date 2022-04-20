import ImageUploader from 'react-images-upload';

export const Upload = () => {
  // onDrop = (pictureFiles, pictureDataURLs) => {
  //   const newImagesUploaded = pictureDataURLs.slice(
  //     this.props.defaultImages.length
  //   );
  //   console.warn("pictureDataURLs =>", newImagesUploaded);
  //   this.props.handleChange(newImagesUploaded);
  // };

  return (
    <ImageUploader
      withIcon={false}
      withLabel={false}
      withPreview={true}
      buttonText={'Add photos'}
      fileSizeError={'File size is too big!'}
      fileTypeError={'This extension is not supported!'}
      onChange={this.onDrop}
      imgExtension={this.props.imgExtension}
      maxFileSize={this.props.maxFileSize}
      defaultImages={this.props.defaultImages}
    />
  );
};

export default Upload;
