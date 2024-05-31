import { NextResponse } from "next/server";
import { HolodexApiClient } from 'holodex.js';

export async function GET() {
  const client = new HolodexApiClient({
    apiKey: process.env.HOLODEX_API_KEY || "",
  });
  let channel_name = "VTuber";
  const channel = await client.getChannel(process.env.CHANNEL_ID || "UCupmjRr7kPgzXKh-cPxxGbg");
  channel_name = channel.englishName || channel.name;
  return NextResponse.json({
    message: `Hello, ${channel_name}!`,
  });
}

