<script>
    import Dropzone from 'svelte-file-dropzone';

    import {loaded, step} from '../stores.js';
    import Help from "../components/Help.svelte";

    let files = {
        accepted: [],
        rejected: []
    };

    function onUploaded(e) {
        const {acceptedFiles, fileRejections} = e.detail;
        files.accepted = [...files.accepted, ...acceptedFiles];
        files.rejected = [...files.rejected, ...fileRejections];
        if (files.accepted.length === 0) {
            return;
        }
        const reader = new FileReader();
        reader.onloadend = function () {
            const data = JSON.parse(this.result);
            loaded.set(data);
            step.set(1);
        };
        reader.readAsText(files.accepted[0]);
    }
</script>

<section>
    <Help step="1">
        Upload your <code>PLAYLIST.json</code> file below.
    </Help>
    <div class="area">
        <Dropzone accept=".json" containerClasses="custom-dropzone" on:drop={onUploaded}/>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 16px;

        align-items: center;
    }
    code {
        padding: 2px 4px;
        font-size: 90%;
        color: #c7254e;
        background-color: #f9f2f4;
        border-radius: 0;
    }
    .area {
        width: 50%;
        cursor: pointer;
    }
    :global(.custom-dropzone) {
        border: 2px gray dashed !important;
        background: transparent !important;
    }
</style>
