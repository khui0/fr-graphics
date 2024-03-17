<script>
    import Generator from "$lib/Generator.svelte";

    let title = "Weather";
    let fields = [
        {
            type: "date",
            text: "Date",
        },
        {
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
            type: "select",
            text: "Subtitle Style",
            options: [
                { value: 0, text: "Date" },
                { value: 1, text: "Subtitle" },
                { value: 2, text: "Date and Subtitle" },
            ],
        },
        {
            type: "string",
            text: "Subtitle Text",
        },
        {
            type: "select",
            text: "Background Style",
            options: [
                { value: 0, text: "Default" },
                { value: 1, text: "Transparent" },
            ],
        },
    ];
</script>

<svelte:head>
    <title>{title} - Falcon Report Graphics</title>
</svelte:head>

<Generator {title} {fields}></Generator>
