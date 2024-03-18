<script>
    import { onMount } from "svelte";
    import Generator from "$lib/Generator.svelte";

    let title = "Weather";
    let fields = [
        {
            name: "reporterName",
            type: "string",
            text: "Reporter Name",
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
        },
        {
            name: "endDay",
            type: "select",
            text: "End",
            options: [
                { value: 0, text: "Sunday" },
                { value: 1, text: "Monday" },
                { value: 2, text: "Tuesday" },
                { value: 3, text: "Wednesday" },
                { value: 4, text: "Thursday" },
                { value: 5, text: "Friday" },
                { value: 6, text: "Saturday" },
            ],
        },
        {
            name: "sunday",
            type: "group",
            text: "Sunday",
            fields: [
                {
                    name: "temperature",
                    type: "number",
                    text: "Temperature",
                },
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
            ],
        },
    ];

    let canvas;
    onMount(() => {
        const ctx = canvas.getContext("2d");
    });
</script>

<svelte:head>
    <title>{title} - Falcon Report Graphics</title>
</svelte:head>

<Generator {title} {fields} bind:canvas></Generator>
