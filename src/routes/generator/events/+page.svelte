<script>
    import { onMount } from "svelte";
    import { load, generate } from "./generator.js";
    import { download, downloadText, dateToISO } from "$lib/utilities.js";

    import Generator from "$lib/Generator.svelte";

    let title = "Upcoming Events";
    let fields = [
        {
            name: "panel1",
            type: "group",
            text: "Panel 1",
            fields: [
                {
                    name: "enabled",
                    type: "toggle",
                    text: "Enabled",
                    value: true,
                },
                {
                    name: "details1",
                    type: "string",
                    text: "Details 1",
                },
                {
                    name: "details2",
                    type: "string",
                    text: "Details 2",
                },
                {
                    name: "title",
                    type: "string",
                    text: "Title (Use a backslash to split into two lines)",
                },
            ],
        },
        {
            name: "panel2",
            type: "group",
            text: "Panel 2",
            fields: [
                {
                    name: "enabled",
                    type: "toggle",
                    text: "Enabled",
                    value: true,
                },
                {
                    name: "details1",
                    type: "string",
                    text: "Details 1",
                },
                {
                    name: "details2",
                    type: "string",
                    text: "Details 2",
                },
                {
                    name: "title",
                    type: "string",
                    text: "Title",
                },
            ],
        },
        {
            name: "panel3",
            type: "group",
            text: "Panel 3",
            fields: [
                {
                    name: "enabled",
                    type: "toggle",
                    text: "Enabled",
                    value: true,
                },
                {
                    name: "details1",
                    type: "string",
                    text: "Details 1",
                },
                {
                    name: "details2",
                    type: "string",
                    text: "Details 2",
                },
                {
                    name: "title",
                    type: "string",
                    text: "Title",
                },
            ],
        },
        {
            name: "panel4",
            type: "group",
            text: "Panel 4",
            fields: [
                {
                    name: "enabled",
                    type: "toggle",
                    text: "Enabled",
                    value: true,
                },
                {
                    name: "details1",
                    type: "string",
                    text: "Details 1",
                },
                {
                    name: "details2",
                    type: "string",
                    text: "Details 2",
                },
                {
                    name: "title",
                    type: "string",
                    text: "Title",
                },
            ],
        },
    ];
    let values;
    let canvas;
    $: values, update();

    onMount(() => {
        // Set canvas context once it's rendered
        canvas.ctx = canvas.getContext("2d");
    });

    function update() {
        // Use presence canvas.ctx to determine if canvas is ready
        const ready = Boolean(canvas?.ctx);
        if (!ready) return;
        load().then((assets) => {
            generate(canvas, assets, values);
        });
    }

    async function applyFile(e) {
        const text = await e.target.files[0].text();
        const json = JSON.parse(text);
        Object.assign(values, json);
        update();
    }
</script>

<svelte:head>
    <title>{title} - Falcon Report Graphics</title>
</svelte:head>

<Generator {title} {fields} bind:canvas bind:values>
    <button
        class="btn btn-primary"
        on:click={() => download(canvas, `events-${dateToISO(new Date())}`)}
        >Generate</button
    >
    <button
        class="btn"
        on:click={() =>
            downloadText(
                JSON.stringify(values),
                `events-${dateToISO(new Date())}.json`,
            )}>JSON</button
    >
    <input
        type="file"
        class="file-input file-input-ghost w-full max-w-xs"
        accept="application/json"
        on:change={applyFile}
    />
</Generator>
