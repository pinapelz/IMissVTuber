import React from 'react';

interface PastVideo {
  title: string;
  type: string;
  scheduled_time: string;
  channel_name: string;
  video_id: string;
}

interface VideoRowProps {
  past_videos: PastVideo[];
}

const VideoRow: React.FC<VideoRowProps> = ({ past_videos }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto my-8">
      <div className="px-6 py-4 bg-white font-semibold">
        <h2 className="text-lg font-semibold text-accent">Past Videos</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                Title
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                Type
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                Channel
              </th>
              <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                Link
              </th>
            </tr>
          </thead>
          <tbody>
            {past_videos.map((video) => (
              <tr key={video.video_id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {video.title}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {video.type}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {new Date(video.scheduled_time).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-gray-700">
                  {video.channel_name}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-sm text-blue-500">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.video_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Watch
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VideoRow;
export type { PastVideo, VideoRowProps };