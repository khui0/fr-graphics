<script>
    import { onMount } from "svelte";
    import Generator from "$lib/Generator.svelte";

    let title = "Thumbnail";
    let fields = [
        {
            name: "date",
            type: "date",
            text: "Date",
        },
        {
            name: "fontSize",
            type: "select",
            text: "Font Size",
            options: [
                { value: 10, text: "1/10" },
                { value: 9, text: "1/9" },
                { value: 8, text: "1/8" },
                { value: 7, text: "1/7" },
                { value: 6, text: "1/6" },
            ],
        },
        {
            name: "subtitleStyle",
            type: "select",
            text: "Subtitle Style",
            options: [
                { value: 0, text: "Date" },
                { value: 1, text: "Subtitle" },
                { value: 2, text: "Date and Subtitle" },
            ],
        },
        {
            name: "subtitleText",
            type: "string",
            text: "Subtitle Text",
        },
        {
            name: "backgroundStyle",
            type: "select",
            text: "Background Style",
            options: [
                { value: 0, text: "Default" },
                { value: 1, text: "Transparent" },
            ],
        },
    ];
    let values;
    $: values, update();

    let canvas;
    onMount(() => {
        canvas.ctx = canvas.getContext("2d");
    });

    function update() {
        const ready = Boolean(canvas?.ctx);
        if (!ready) return;
        console.log(values);
    }
</script>

<svelte:head>
    <title>{title} - Falcon Report Graphics</title>
</svelte:head>

<Generator {title} {fields} bind:canvas bind:values></Generator>
