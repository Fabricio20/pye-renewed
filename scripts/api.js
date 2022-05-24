export const gapiApiKey = 'AIzaSyANIzcazoTXVb2DEJs0aO0MN_YFLIJ_Xgk';

export let client, auth;

function onLoad() {
    console.log('Loading Google API');
    gapi.client.setApiKey(gapiApiKey);
    gapi.client.load('youtube', 'v3', function () {
        console.log('Youtube V3 loaded');
    });
    client = gapi.client;
    auth = gapi.auth;
}

// 1. Load the JavaScript client library.
gapi.load('client', onLoad);
