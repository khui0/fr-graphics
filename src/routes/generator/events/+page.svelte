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

    let values;
    console.log(values);
</script>

<svelte:head>
    <title>{title} - Falcon Report Graphics</title>
</svelte:head>

<Generator {title} {fields} bind:values></Generator>
