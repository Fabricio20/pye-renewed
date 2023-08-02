<script>
    import {PlayList} from '../scripts/schema';
    import {loaded, selected_playlists, step} from '../stores.js';
    import Button from "../components/Button.svelte";
    import Help from "../components/Help.svelte";

    let invalid = undefined, empty = false, playlists = [];

    loaded.subscribe((data) => {
        if (!data) {
            return;
        }
        onLoaded(data);
    });

    function onLoaded(data) {
        if (!data.is_plugdj_playlist) {
            invalid = 'The imported file is not of a compatible format.';
            return;
        }
        const pl_list = data['playlists'];
        empty = pl_list.length === 0;
        for (const pl in pl_list) {
            const playlist = new PlayList(pl, pl_list[pl]);
            playlists.push(playlist);
        }
    }

    function onNext() {
        let selected = playlists.filter(pl => pl.selected);
        if (selected.length === 0) {
            invalid = 'You must select at least one playlist.';
            return;
        }
        selected_playlists.set(selected);
        step.set(2);
    }
</script>

<section>
    <Help step={2}>
        Select which playlists you'd like to import below, then click next.
    </Help>
    {#if invalid}
        <div class="error">
            {invalid}
        </div>
    {/if}
    {#each playlists as playlist}
        <div class="playlist">
            <div class="check">
                <input type=checkbox bind:checked={playlist.selected}>
            </div>
            <div class="name">
                {playlist.name}
            </div>
            <div class="songs">
                {playlist.items.length} tracks
            </div>
        </div>
    {/each}
    <Button onClicked="{onNext}">Next</Button>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .error {
        padding: 1em;
        color: indianred;
        border: 1px solid red;

        align-self: center;
    }

    .playlist {
        display: flex;
        flex-direction: row;
        gap: 16px;

        padding: 1em;
        background: var(--background-2);
    }

    .songs {
        font-size: 14px;
        color: darkgray;
    }
</style>
