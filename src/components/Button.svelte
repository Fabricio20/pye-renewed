<script>
    export let onClicked;
</script>

<div>
    <button class="button" on:click={onClicked}>
        <slot></slot>
    </button>
</div>

<style>
    .button {
        padding: 10px 16px;

        font-size: 18px;
        line-height: 1.33;
        font-weight: 400;

        color: #fff;
        background-color: #1c1f25;
        border: 1px solid #90ad2f;

        cursor: pointer;
    }
</style>
