<script>
    import {playlists, selected_playlists, step} from '../stores.js';
    import {FetchVideo, sleep} from "../scripts/youtube";
    import Button from "../components/Button.svelte";
    import Help from "../components/Help.svelte";

    let items = [], errors = {}, loaded = {}, waiting = false, wait_count = 0, finished = false;

    async function Load(playlist) {
        for (const item of playlist.items) {
            let data, time = 60000;
            do {
                data = await FetchVideo(item.id);
                if (data.code === 429) {
                    console.log('Hit a rate limit');
                    waiting = true;
                    wait_count = wait_count + 1;
                    await sleep(time);
                    waiting = false;
                    time = time * 2;
                } else {
                    playlist.loaded.push(data);
                    loaded[playlist.name] += 1;
                    if (data.error) {
                        errors[playlist.name] += 1;
                    }
                }
            } while (data.code === 429);
        }
    }

    selected_playlists.subscribe(async (data) => {
        // -- Display playlists
        for (const playlist of data) {
            playlist.loaded = [];
            loaded[playlist.name] = 0;
            errors[playlist.name] = 0;
            items.push(playlist);
        }
        // -- Load items
        for (const playlist of data) {
            await Load(playlist);
            playlist.items = playlist.loaded;
            playlist.loaded = undefined;
            playlist.errors = errors[playlist.name];
        }
        finished = true;
        console.log('Finished loading all playlists');
    });

    function onNext() {
        playlists.set(items);
        step.set(4);
    }
</script>

<section>
    <Help step={4}>
        Loading playlist items... please wait. This may take several minutes.
    </Help>
    {#if waiting}
        <div class="wait">
            Encountered a rate limit while loading videos... waiting.. [Attempt #{wait_count}]
        </div>
    {/if}
    <div class="playlists">
        {#each items as playlist}
            <div class="playlist">
                <div class="name">
                    {playlist.name}
                </div>
                <div class="progress">
                    <div class="text">
                        [{loaded[playlist.name]} / {playlist.items.length}]
                    </div>
                    <div class="area">
                        <div class="bar"
                             style="width: {(loaded[playlist.name] / playlist.items.length) * 100}%"></div>
                    </div>
                </div>
                <div class="errors">
                    {errors[playlist.name]} errors
                </div>
            </div>
        {/each}
    </div>
    {#if finished === true}
        <div>
            <Button onClicked="{onNext}">Next</Button>
        </div>
    {/if}
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .wait {
        padding: 1em;
        color: orange;
        border: 1px solid darkorange;

        align-self: center;
    }

    .playlists {
        display: flex;
        flex-direction: column;
    }

    .playlist {
        display: flex;
        flex-direction: row;
        justify-items: center;
        gap: 16px;

        padding: 1em;
        background: var(--background-2);
    }

    .name {
        font-size: 18px;
    }

    .progress {
        display: flex;
        flex-direction: row;
        gap: 16px;
    }

    .progress > .text {
        color: darkgray;
    }

    .progress > .area {
        width: 150px;
    }

    @media (max-width: 768px) {
        .progress > .area {
            width: 100px;
        }
    }

    .progress > .area > .bar {
        height: 100%;
        background-color: #00b5e6;
    }

    .errors {
        color: indianred;
    }
</style>
