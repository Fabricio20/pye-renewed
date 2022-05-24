<script>
    export let playlist;

    let selected = {};
    for (let item of playlist.items) {
        selected[item.id] = item.selected;
    }

    function onUpdate(item) {
        selected[item.id] = !selected[item.id];
        item.selected = selected[item.id];
    }
</script>

<div class="playlist">
    <div class="name">
        {playlist.name}
    </div>
    <div class="items">
        {#each playlist.items as item}
            <div class="item">
                <div class="select"
                     class:selected={selected[item.id]}
                     class:unselected={!selected[item.id]}
                     on:click={onUpdate(item)}></div>
                <div class="image"
                     style="background-image: url('{item.thumbnail}');"></div>
                <div class="name">
                    <a href="https://youtube.com/watch?v={item.id}">
                        {item.title ? item.title : item.id}
                    </a>
                    {#if item.channel_id}
                        <br/>
                        <span>
                            <span>By</span>
                            <a href="https://youtube.com/channel/{item.channel_id}">
                                {item.channel_title}
                            </a>
                        </span>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    .playlist {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .playlist > .name {
        padding: 1em;
        background: var(--background-2);
    }

    .playlist > .items {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-left: 32px;
    }

    .playlist > .items > .item {
        display: flex;
        flex-direction: row;
        gap: 8px;
        align-items: center;

        background: var(--background-2);
    }

    .playlist > .items > .item > .select {
        cursor: pointer;
        height: 48px;
        width: 16px;
    }

    .playlist > .items > .item > .selected {
        background: #90ad2f;
    }

    .playlist > .items > .item > .unselected {
        background: indianred;
    }

    .playlist > .items > .item > .image {
        width: 85px;
        height: 48px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    a {
        color: var(--foreground);
    }
</style>
