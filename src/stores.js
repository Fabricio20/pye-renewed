import {writable} from 'svelte/store';

export const step = writable(0);
export const loaded = writable(undefined);
export const selected_playlists = writable(undefined);
export const playlists = writable([]);
