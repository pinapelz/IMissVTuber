import React from "react";

interface ChannelCardProps {
  name: string;
  profilePicture: string;
  organization: string;
  twitterName: string;
  channel_id: string;
}

const ChannelCard: React.FC<ChannelCardProps> = ({
  name,
  profilePicture,
  organization,
  twitterName,
  channel_id,
}) => {
  return (
    <div className="flex justify-center">
      <div className="flex bg-white shadow-lg rounded-lg max-w-xl m-4">
        <div className="flex-none h-48 overflow-hidden rounded-l-lg">
          <img
            className="w-full h-full object-cover"
            src={profilePicture}
            alt={name}
          />
        </div>
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-semibold text-black">
            <a href={`https://youtube.com/channel/${channel_id}`}>{name}</a>
          </div>
          <p className="text-gray-700 text-sm">{organization}</p>
          <div className="mt-4">
            <a
              href={`https://twitter.com/${twitterName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                @{twitterName}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
