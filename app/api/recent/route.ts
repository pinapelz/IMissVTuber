import { NextResponse } from "next/server";
import { HolodexApiClient, ChannelVideosParam } from 'holodex.js';

export async function GET() {
  const client = new HolodexApiClient({
    apiKey: process.env.HOLODEX_API_KEY || "",
  });
  
  const videos = await client.getVideosByChannelId(process.env.CHANNEL_ID || "UCupmjRr7kPgzXKh-cPxxGbg", undefined, { limit: 7 } as ChannelVideosParam);

  // First check to see if there is a video with status live
  for (let i = 0; i < videos.length; i++) {
    if (videos[i].status === "live") {
      return NextResponse.json({
        is_live: true,
        channel_name: `${videos[i].channel.englishName || videos[i].channel.name}`,
        channel_id: `${videos[i].channel.channelId}`,
        affiliation: `${videos[i].channel.organization || ""}`,
        title: `${videos[i].title}`,
        video_id: `${videos[i].videoId}`,
        time_started: `${videos[i].availableAt}`,
      }, {
        headers: {
          'Cache-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });
    }
  }

  // If no live video, return the first past video
  for (let i = 0; i < videos.length; i++) {
    if (videos[i].status === "past") {
      return NextResponse.json({
        is_live: false,
        channel_name: `${videos[i].channel.englishName || videos[i].channel.name}`,
        channel_id: `${videos[i].channel.channelId}`,
        affiliation: `${videos[i].channel.organization || ""}`,
        title: `${videos[i].title}`,
        video_id: `${videos[i].videoId}`,
        time_ended: `${videos[i].availableAt}`,
      }, {
        headers: {
          'Cache-Control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });
    }
  }

  // If no videos found, return an error
  return NextResponse.error();
}
