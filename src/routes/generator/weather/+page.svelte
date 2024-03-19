<script>
    import { onMount } from "svelte";
    import { load, generate } from "./generator.js";
    import { download } from "$lib/utilities.js";

    import Generator from "$lib/Generator.svelte";

    let title = "Weather";
    let fields = [
        {
            name: "reporterName",
            type: "string",
            text: "Reporter Name",
        },
        {
            name: "period",
            type: "string",
            text: "Period",
            value: "Weekend",
        },
        {
            name: "days",
            type: "range",
            text: "Days",
            min: 1,
            max: 10,
            value: 3,
        },
        {
            name: "startDay",
            type: "select",
            text: "Start",
            options: [
                { value: 0, text: "Sunday" },
                { value: 1, text: "Monday" },
                { value: 2, text: "Tuesday" },
                { value: 3, text: "Wednesday" },
                { value: 4, text: "Thursday" },
                { value: 5, text: "Friday" },
                { value: 6, text: "Saturday" },
            ],
            value: 5,
        },
        ...Array.from(Array(10)).map((_, i) => {
            return {
                name: `day${i}`,
                type: "group",
                text: `Day ${i + 1}`,
                fields: [
                    {
                        name: "conditions",
                        type: "select",
                        text: "Conditions",
                        options: [
                            { value: "sunny", text: "Sunny" },
                            { value: "cloudy", text: "Cloudy" },
                            { value: "thunder", text: "Thunder" },
                            { value: "rain", text: "Rain" },
                            { value: "snow", text: "Snow" },
                            { value: "partlyCloudy", text: "Partly Cloudy" },
                        ],
                    },
                    {
                        name: "temperature",
                        type: "number",
                        text: "Temperature",
                        value: 60,
                    },
                ],
            };
        }),
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
            canvas.ctx.drawImage(generate(canvas, assets, values), 0, 0);
        });
    }
</script>

<svelte:head>
    <title>{title} - Falcon Report Graphics</title>
</svelte:head>

<Generator
    {title}
    {fields}
    bind:canvas
    bind:values
    on:click={() => download(canvas, "weather")}
></Generator>
