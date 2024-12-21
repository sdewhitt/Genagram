import React from 'react';

interface SidebarProps {
  images: { url: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ images }) => {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 flex flex-col h-screen">
      <h2 className="text-lg font-semibold mb-4">Your Images</h2>
      <div className="overflow-y-auto flex-1">
        {images.map((image, index) => (
          <div key={index} className="mb-4">
            <img src={image.url} alt={`Generated Image ${index + 1}`} className="w-full h-auto rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;