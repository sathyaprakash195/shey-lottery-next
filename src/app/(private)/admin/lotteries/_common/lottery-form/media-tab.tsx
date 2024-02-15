import { Upload } from "antd";
import React from "react";

function MediaTab({
  uploadedFiles,
  setUploadedFiles,
  existingMedia = [],
  setExistingMedia = () => {},
}: {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  existingMedia?: string[];
  setExistingMedia?: (media: string[]) => void;
}) {
  return (
    <div className="p-5 bg-white shadow-sm">
      <div className="flex flex-wrap gap-5">
        {existingMedia.map((media, index) => (
          <div className="border border-gray-300 p-3 rounded-sm border-solid flex flex-col gap-5 justify-center">
            <img src={media} alt="media" className="w-20 h-20 object-cover" />
            <span
              className="text-gray-600 underline text-sm cursor-pointer"
              onClick={() => {
                setExistingMedia(existingMedia.filter((_, i) => i !== index));
              }}
            >
              Remove
            </span>
          </div>
        ))}
      </div>
      <Upload
        listType="picture-card"
        beforeUpload={(file, fileList) => {
          setUploadedFiles([...uploadedFiles, ...fileList]);
          return false;
        }}
        multiple={true}
        className="mt-7"
      >
        <span className="text-sm">Click to upload</span>
      </Upload>
    </div>
  );
}

export default MediaTab;
