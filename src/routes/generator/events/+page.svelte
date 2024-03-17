<script>
    import Generator from "$lib/Generator.svelte";

    let title = "Upcoming Events";
    let fields = [
        {
            name: "panel1",
            type: "group",
            text: "Panel 1",
            fields: [
                {
                    type: "toggle",
                    text: "Enabled",
                },
                {
                    type: "string",
                    text: "Details 1",
                },
                {
                    type: "string",
                    text: "Details 2",
                },
                {
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
                    type: "toggle",
                    text: "Enabled",
                },
                {
                    type: "string",
                    text: "Details 1",
                },
                {
                    type: "string",
                    text: "Details 2",
                },
                {
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
                    type: "toggle",
                    text: "Enabled",
                },
                {
                    type: "string",
                    text: "Details 1",
                },
                {
                    type: "string",
                    text: "Details 2",
                },
                {
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
                    type: "toggle",
                    text: "Enabled",
                },
                {
                    type: "string",
                    text: "Details 1",
                },
                {
                    type: "string",
                    text: "Details 2",
                },
                {
                    type: "string",
                    text: "Title",
                },
            ],
        },
    ];
</script>

<svelte:head>
    <title>{title} - Falcon Report Graphics</title>
</svelte:head>

<Generator {title} {fields}></Generator>
