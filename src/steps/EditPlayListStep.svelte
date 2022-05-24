<script>
    import {playlists, step} from '../stores.js';
    import TrackSelector from "../components/TrackSelector.svelte";
    import Button from "../components/Button.svelte";
    import Help from "../components/Help.svelte";

    let lists = [];
    playlists.subscribe((data) => {
        lists = data;
    });

    function onNext() {
        for (let item of lists) {
            item.items = item.items.filter(i => i.selected);
        }
        playlists.set(lists);
        step.set(5);
    }
</script>

<section>
    <Help step="5">
        You can select which tracks you want to import from each playlist below.
    </Help>
    <div class="playlists">
        {#each lists as list}
            <TrackSelector playlist="{list}"/>
        {/each}
    </div>
    <div class="button">
        <Button onClicked="{onNext}">Next</Button>
    </div>
</section>

<style>
    .playlists {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .button {
        margin-top: 16px;
    }
</style>
