<script>
    import { onMount } from "svelte";
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
            name: "panel2",
            type: "group",
            text: "Panel 2",
            fields: [
                {
                    name: "enabled",
                    type: "toggle",
                    text: "Enabled",
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

    let canvas;
    onMount(() => {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "blue";

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
