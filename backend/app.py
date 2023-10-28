from flask import Flask, jsonify, current_app
from flask_cors import CORS
from flask_caching import Cache
import requests
import json
import os

app = Flask(__name__)
CORS(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})


api_key = os.environ.get('API_KEY')
channel_id = os.environ.get('CHANNEL_ID')
free_chat = os.environ.get('FREE_CHAT_ID')

headers = {
    "X-APIKEY": api_key
}

@app.route('/api/live', methods=['GET'])
@cache.cached(timeout=300)
def live():
    url = f"https://holodex.net/api/v2/live?channel_id={channel_id}&status=live"
    response = requests.get(url, headers=headers)
    channel_live_data = {}
    live_videos = json.loads(response.text)
    if len(live_videos) != 0:
        channel_live_data = response.json()
    else:
        is_free_chat = True
        url = f"https://holodex.net/api/v2/videos?channel_id={channel_id}&status=past"
        response = requests.get(url, headers=headers)
        past_videos = json.loads(response.text)
        index = 0
        while( is_free_chat ):
            if past_videos[index]['id'] != free_chat:
                is_free_chat = False
                recent_past_video_id = past_videos[index]['id']
        url = f"https://holodex.net/api/v2/videos/{recent_past_video_id}"
        response = requests.get(url, headers=headers)
        channel_live_data = response.json()
    return jsonify(channel_live_data)

@app.route('/api/upcoming', methods=['GET'])
def upcoming():
    return jsonify({'status': 'not supported'})

if __name__ == '__main__':
    app.run(debug=True)