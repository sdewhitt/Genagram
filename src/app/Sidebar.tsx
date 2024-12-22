import React from 'react';
import './Sidebar.css'; // Import the CSS file

interface SidebarProps {
  images: { url: string }[];
  onImageClick: (url: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ images, onImageClick }) => {
  return (
    <div className="w-64 bg-indigo-900 text-white p-4 flex flex-col h-screen">
      <h2 className="text-l font-semibold mb-4 center">Image Library</h2>
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        {images.map((image, index) => (
          <div key={index} className="mb-4">
            <img
              src={image.url}
              alt={`Generated Image ${index + 1}`}
              className="w-full h-auto rounded-lg"
              onClick={() => onImageClick(image.url)}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;