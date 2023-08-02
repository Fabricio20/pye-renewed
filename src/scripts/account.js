import {client} from "./api";

export async function LogIn() {
    let token_client = google.accounts.oauth2.initTokenClient({
        client_id: '589352364432-6cgn304i2inu9svd3b7vc6oqapst0jqr.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/youtube',
        callback: '',  // defined at request time
    });
    await new Promise((resolve, reject) => {
        try {
            token_client.callback = (resp) => {
                if (resp.error !== undefined) {
                    reject(resp);
                }
                resolve(resp);
            }
            if (!IsLoggedIn()) {
                // Prompt the user to select an Google Account and asked for consent to share their data
                // when establishing a new session.
                token_client.requestAccessToken({prompt: 'consent'});
            } else {
                // Skip display of account chooser and consent dialog for an existing session.
                token_client.requestAccessToken({prompt: ''});
            }
        } catch (err) {
            console.log(err)
            reject(err);
        }
    });
}

export async function Revoke() {
    let cred = client.getToken();
    if (cred === null) {
        return;
    }
    google.accounts.oauth2.revoke(cred.access_token, () => {
        console.log('Revoked: ' + cred.access_token)
    });
    client.setToken('');
}

export function IsLoggedIn() {
    return client.getToken() !== null;
}
