<script>
    import { onMount } from "svelte";
    import { load, generate, download, parseCSV } from "./generator.js";

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

    let stories;
    let previewIndex = 0;

    $: previewIndex, update();

    onMount(() => {
        // Set canvas context once it's rendered
        canvas.ctx = canvas.getContext("2d");
    });

    function update() {
        const ready = Boolean(canvas?.ctx);
        if (!ready) return;
        if (values.file) {
            stories = parseCSV(values.file);
        }
        load().then((assets) => {
            canvas.ctx.drawImage(
                generate(canvas, assets, {
                    ...values,
                    previewIndex: previewIndex,
                }),
                0,
                0,
            );
        });
    }
</script>

<svelte:head>
    <title>{title} - Falcon Report Graphics</title>
</svelte:head>

<Generator {title} {fields} bind:canvas bind:values>
    <div class="flex flex-col items-center gap-4">
        <p>Cultural Society Ice Skating Night</p>
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
</Generator>
