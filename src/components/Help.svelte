<script>
    export let step = 1;
</script>

<div class="help">
    <div class="step">
        Step {step}
    </div>
    <div>
        <slot></slot>
    </div>
</div>

<style>
    .help {
        display: flex;
        flex-direction: column;
        padding: 1em;
    }

    .step {
        opacity: .4;
    }
</style>
