import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

const UploadImage = ({ maxFiles = 3, handleImagesChange }: A) => {
  const [images, setImages] = useState<File[]>([]);
  const [limit, setLimit] = useState<number>(maxFiles);

  const onDrop = (acceptedFiles: File[]) => {
    const validImages = acceptedFiles.filter((file) => file.type.startsWith('image/'));
    setImages((prevImages) => [...prevImages, ...validImages]);
  };

  const handleDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: limit,
  });

  useEffect(() => {
    setLimit(maxFiles - images.length);
    handleImagesChange(images);
  }, [handleImagesChange, images, maxFiles]);

  const DragZone = (
    <div
      {...getRootProps()}
      className="flex items-center justify-center border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer rounded-xl hover:bg-gray-50 transition-all duration-300 ease-in-out"
    >
      <input {...getInputProps()} />
      <p>Drag & Drop files here, or click to select files</p>
    </div>
  );

  const ImageList = (
    <div className="flex flex-wrap gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img src={URL.createObjectURL(image)} alt="" className="rounded-xl w-24 h-28 shadow-lg object-cover" />
          <div
            onClick={() => handleDelete(index)}
            className="w-6 h-6 flex items-center justify-center absolute top-1 right-1 text-white rounded-full p-1 cursor-pointer hover:bg-gray-500"
          >
            <FontAwesomeIcon icon={faXmark} className="w-3 h-3 text-[12px]" />
          </div>
        </div>
      ))}
      {images.length < maxFiles && (
        <div className="relative">
          <div
            {...getRootProps()}
            className="flex items-center justify-center border-2 w-24 h-28 border-dashed border-gray-300 p-8 text-center cursor-pointer rounded-xl hover:bg-gray-50 transition-all duration-300 ease-in-out"
          >
            <input {...getInputProps()} />
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <label className="mb-1 text-sm font-semibold text-gray-700 dark:text-white flex gap-1" htmlFor="file_input">
        Upload file
      </label>

      {images.length == 0 ? DragZone : ImageList}
    </div>
  );
};

export default UploadImage;
