import {client} from "./api";

export const sleep = (milliseconds = 500) => new Promise(resolve => setTimeout(resolve, milliseconds));

export async function FetchVideo(id) {
    if (!client) {
        console.error('No gapi');
        return {error: true, code: 0, id: id, selected: false};
    }
    const request = client.youtube.videos.list({
        part: 'id,snippet',
        id: id
    });
    const response = await request;
    if (response.status !== 200 || !response.result) {
        console.error(`Failed to load video ${id} - HTTP ${response.status}`);
        return {error: true, code: response.status, id: id, selected: false};
    }
    const items = response.result.items;
    if (items.length === 0) {
        console.error(`Failed to load video ${id}`);
        return {error: true, missing: true, id: id, selected: false};
    }
    const item = items[0];
    return {
        id: item.id,
        selected: true,
        title: item.snippet.title,
        channel_title: item.snippet.channelTitle,
        channel_id: item.snippet.channelId,
        thumbnail: `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`
    };
}

export async function CreatePlayList(name) {
    if (!client) {
        console.error('No gapi');
        return {error: true, code: 0};
    }
    const request = client.youtube.playlists.insert({
        part: 'snippet,status',
        resource: {
            snippet: {
                title: `${name} by Lindsey`,
                description: 'A plug.dj/lindsey playlist export. (Done with pye.lindseybot.net)',
                tags: ["plug.dj", "pye.lindseybot.net", "pye_exported_playlist"]
            },
            status: {
                privacyStatus: 'private'
            }
        }
    });
    const response = await request;
    if (response.status !== 200 || !response.result) {
        console.error(`Failed to create playlist ${name}`);
        return {error: true, code: response.status};
    }
    const id = response.result.id;
    return {
        id: id,
        name: name,
        url: `https://youtube.com/playlist?list=${id}`
    };
}

export async function InsertTrack(playlist_id, item) {
    if (!client) {
        console.error('No gapi');
        return {error: true, code: 0};
    }
    const request = client.request({
        path: 'youtube/v3/playlistItems',
        method: 'POST',
        params: {
            part: 'snippet'
        },
        body: {
            part: 'snippet',
            snippet: {
                playlistId: playlist_id,
                resourceId: {
                    kind: 'youtube#video',
                    videoId: item.id
                }
            }
        }
    });
    const response = await request;
    if (response.status !== 200 || !response.result) {
        console.error(`Failed to add track ${item.id} to playlist ${playlist_id}`);
        return {error: true, code: response.status};
    }
    return item;
}
