import { NextResponse } from "next/server";
import { HolodexApiClient, ChannelVideosParam } from 'holodex.js';

export const fetchCache = 'force-no-store';
export const revalidate = 0

export async function GET() {
  const client = new HolodexApiClient({
    apiKey: process.env.HOLODEX_API_KEY || "",
  });
  const videos = await client.getVideosByChannelId(process.env.CHANNEL_ID || "UCupmjRr7kPgzXKh-cPxxGbg", undefined, { limit: 10 } as ChannelVideosParam);
  let past_videos = [];
  for (let i = 0; i < videos.length; i++) {
    if (videos[i].status == "past") {
      past_videos.push({
        title: videos[i].title,
        type: videos[i].videoType,
        scheduled_time: videos[i].availableAt,
        channel_name: videos[i].channel.englishName || videos[i].channel.name,
        video_id: videos[i].videoId,
      },
      );
    }
  }
  past_videos.reverse();
  return NextResponse.json({
    past_videos: past_videos,
  },
    {
      headers: {
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
}

