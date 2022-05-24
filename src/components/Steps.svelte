<script>
    import {step} from '../stores';

    let stepVal;
    step.subscribe(data => {
        stepVal = data;
    });
</script>

<section>
    <div class="step" class:wait={stepVal === 0} class:done={stepVal > 0}>
        <span class="icon"></span>
        Import JSON
    </div>
    <div class="step" class:wait={stepVal === 1} class:done={stepVal > 1}>
        <span class="icon"></span>
        Select PlayList
    </div>
    <div class="step" class:wait={stepVal === 2} class:done={stepVal > 2}>
        <span class="icon"></span>
        Authorize APIs
    </div>
    <div class="step" class:wait={stepVal === 3} class:done={stepVal > 3}>
        <span class="icon"></span>
        Load tracks
    </div>
    <div class="step" class:wait={stepVal === 4} class:done={stepVal > 4}>
        <span class="icon"></span>
        Select tracks
    </div>
    <div class="step" class:wait={stepVal === 5} class:done={stepVal > 5}>
        <span class="icon"></span>
        Import data
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 8px;
        border: 1px solid yellow;
    }

    .step > .icon {
        width: 16px;
        display: inline-block;
        text-align: center;
    }

    .wait > .icon:after {
        content: "🕛";
    }

    .done > .icon:after {
        content: "✅";
    }
</style>
