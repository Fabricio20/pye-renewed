<script>
    import UploadStep from "./steps/UploadStep.svelte";
    import Steps from "./components/Steps.svelte";

    import {step} from './stores.js';
    import SelectPlayListStep from "./steps/SelectPlayListStep.svelte";
    import LoadTracksStep from "./steps/LoadTracksStep.svelte";
    import EditPlayListStep from "./steps/EditPlayListStep.svelte";
    import LoginStep from "./steps/LoginStep.svelte";
    import ImportStep from "./steps/ImportStep.svelte";
    import FinishStep from "./steps/FinishStep.svelte";

    let currentStep;
    step.subscribe((data) => {
        currentStep = data;
    });
</script>

<main>
    <div class="left">
        <Steps/>
    </div>
    <div class="right">
        {#if currentStep === 0}
            <UploadStep/>
        {:else if currentStep === 1}
            <SelectPlayListStep/>
        {:else if currentStep === 2}
            <LoginStep/>
        {:else if currentStep === 3}
            <LoadTracksStep/>
        {:else if currentStep === 4}
            <EditPlayListStep/>
        {:else if currentStep === 5}
            <ImportStep/>
        {:else}
            <FinishStep/>
        {/if}
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        gap: 16px;
        padding: 1em;
    }

    .left {
        width: 30%;
        /*border: 1px solid red;*/
    }

    .right {
        width: 70%;
        display: flex;
        flex-direction: column;
        /*border: 1px solid blue;*/
    }
</style>
