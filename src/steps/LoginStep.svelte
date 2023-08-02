<script>
    import {IsLoggedIn, LogIn} from "../scripts/account";
    import Button from "../components/Button.svelte";
    import {step} from "../stores";
    import Help from "../components/Help.svelte";

    let error = undefined;

    async function onLogin() {
        if (IsLoggedIn()) {
            step.set(3);
            return;
        }
        await LogIn();
        if (IsLoggedIn()) {
            step.set(3);
        } else {
            error = 'Failed to authorize, try again.';
        }
    }
</script>

<section>
    <Help step={3}>
        You need to authorize access to your YouTube account so we can create the playlists and import the tracks,
        please authorize below.
    </Help>
    {#if error}
        <div class="error">
            {error}
        </div>
    {/if}
    <div class="center">
        <Button onClicked="{onLogin}">Authorize YouTube</Button>
    </div>
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

    .center {
        align-self: center;
    }
</style>
