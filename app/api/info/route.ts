import { NextResponse } from "next/server";
import { HolodexApiClient, ChannelVideosParam } from 'holodex.js';



export async function GET() {
  const client = new HolodexApiClient({
    apiKey: process.env.HOLODEX_API_KEY || "",
  });
  
  const channel = await client.getChannel(process.env.CHANNEL_ID || "UCupmjRr7kPgzXKh-cPxxGbg");
  return NextResponse.json({
    name: channel.name,
    english_name: channel.englishName,
    organization: channel.organization,
    pfp_url: channel.avatarUrl,
    twitter_name: channel.twitterName,
    banner_url: channel.bannerUrl
  });

}