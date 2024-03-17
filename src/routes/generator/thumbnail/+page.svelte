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
            value: "testing",
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

    let canvas;
    onMount(() => {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";

        const start = Date.now();
        const size = 50;
        let x = 0;
        let y = 0;

        function update() {
            ctx.clearRect(0, 0, 1920, 1080);

            x = Math.cos((Date.now() - start) / 500) * 100;
            y = Math.sin((Date.now() - start) / 500) * 100;
            ctx.fillRect(
                x + (1920 - size) / 2,
                y + (1080 - size) / 2,
                size,
                size,
            );

            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
</script>

<svelte:head>
    <title>{title} - Falcon Report Graphics</title>
</svelte:head>

<Generator {title} {fields} bind:canvas></Generator>
