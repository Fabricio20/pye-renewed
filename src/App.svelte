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
    import Banner from "./components/Banner.svelte";

    let currentStep;
    step.subscribe((data) => {
        currentStep = data;
    });
</script>

<main>
    <div class="left">
        <Banner/>
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
        padding: 50px;
    }

    .left {
        width: 25%;
    }

    .right {
        width: 75%;
        display: flex;
        flex-direction: column;
    }

    @media (max-width: 768px) {
        main {
            flex-direction: column;
        }

        .left {
            width: 100%;
        }

        .right {
            width: 100%;
        }
    }
</style>
