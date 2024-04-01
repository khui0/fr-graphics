<script>
    import { onMount } from "svelte";
    import { load, generate, download, parseCSV } from "./generator.js";
    import { clamp, parseRange } from "$lib/utilities.js";

    import Generator from "$lib/Generator.svelte";

    let title = "Falcos";
    let fields = [
        {
            name: "file",
            type: "file",
            text: "CSV file",
            accept: ".csv",
        },
        {
            name: "nameStyle",
            type: "select",
            text: "Names",
            options: [
                { value: 0, text: "Full" },
                { value: 1, text: "Initialed First" },
                { value: 2, text: "Initialed Last" },
            ],
        },
        {
            name: "rows",
            type: "string",
            text: "Rows",
            placeholder: "e.g. 0-2, 11-22",
        },
    ];
    let values;
    let canvas;
    $: values, update();

    let previewDetails;
    let previewIndex = 0;

    $: previewIndex, update();

    onMount(() => {
        // Set canvas context once it's rendered
        canvas.ctx = canvas.getContext("2d");
    });

    function update() {
        const ready = Boolean(canvas?.ctx);
        if (!ready || !values.file) return;

        const data = parseCSV(values.file);
        if (!data) return;

        const indices = parseRange(values.rows || "");

        let index;
        if (indices && indices.length > 0) {
            previewIndex = clamp(previewIndex, 0, indices.length - 1);
            index = indices[previewIndex];
        } else {
            previewIndex = clamp(previewIndex, 0, data.length - 1);
            index = previewIndex;
        }
        const story = data[index];
        previewDetails = `${story.canonical} - ${story.portion} - ${story.title}`;

        load().then(() => {
            generate(canvas.ctx, story, values);
        });
    }
</script>

<svelte:head>
    <title>{title} - Falcon Report Graphics</title>
</svelte:head>

<Generator {title} {fields} bind:canvas bind:values>
    {#if values?.file}
        <div class="flex flex-col items-center gap-4 w-full">
            <p>{previewDetails}</p>
            <div class="flex flex-row gap-2">
                <button
                    class="btn btn-circle"
                    on:click={() => {
                        previewIndex--;
                    }}><i class="bi bi-chevron-left"></i></button
                >
                <input
                    type="number"
                    class="input input-bordered w-full max-w-28"
                    bind:value={previewIndex}
                />
                <button
                    class="btn btn-circle"
                    on:click={() => {
                        previewIndex++;
                    }}><i class="bi bi-chevron-right"></i></button
                >
            </div>
            <button
                class="btn btn-primary"
                on:click={() => {
                    download(values);
                }}>Download ZIP</button
            >
        </div>
    {/if}
</Generator>
