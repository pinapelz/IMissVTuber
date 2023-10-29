from flask import Flask, jsonify, request
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


@app.route('/api/live', methods=['GET'])
@cache.cached(timeout=300)
def live():
    """
    Get the current live status of the channel
    If the channel is live, return video data of the current live stream

    If the channel is not live, return the video data of the most recent past stream
    """
    url = f"https://holodex.net/api/v2/live?channel_id={channel_id}&status=live"
    headers = {"X-APIKEY": api_key}
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

@app.route("/api/counter/sync", methods=['POST'])
def sync_counter():
    """
    Syncs the "I miss" button counter with the database
    POST request to the endpoint with the current counter value
    Return the value of the counter after the sync
    Syncing is done in chunks, client should only sync every 10 seconds
    """
    data = request.get_json()
    try:
        client_click_count = int(data['counter'])
    except KeyError:
        return jsonify({'error': 'Counter key not found'})
    except TypeError:
        return jsonify({'error': 'Invalid data type'})
    if client_click_count < 0:
        client_click_count = 0
    elif client_click_count > 500:
        client_click_count = 500
    url = os.environ.get("KV_REST_API_URL")+"/get/imiss_count/"
    header = {"Authorization": "Bearer " + os.environ.get('KV_REST_API_TOKEN')}
    response = requests.get(url, headers=header)
    response_data = json.loads(response.text)
    if response_data["result"] is None:
        counter = client_click_count
        url = os.environ.get("KV_REST_API_URL")+"/set/imiss_count/"+str(counter)
        response = requests.put(url, headers=header)
    else:
        counter = response_data["result"]
        counter = int(counter) + client_click_count
        url = os.environ.get("KV_REST_API_URL")+"/set/imiss_count/"+str(counter)
        response = requests.put(url, headers=header)
    return jsonify({'counter': counter})


@app.route('/api/upcoming', methods=['GET'])
def upcoming():
    return jsonify({'status': 'not supported'})

if __name__ == '__main__':
    app.run(debug=True)