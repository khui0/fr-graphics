<script>
  import { onMount } from "svelte";
  import { load, generate } from "./generator.js";
  import { download, downloadText, dateToISO } from "$lib/utilities.js";

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
          ...(i <= 1
            ? [
                {
                  name: "relativeDay",
                  type: "toggle",
                  text: "Relative day",
                  value: false,
                },
              ]
            : []),
          {
            name: "conditions",
            type: "select",
            text: "Conditions",
            options: [
              { value: "sunny", text: "Sunny" },
              { value: "mostlySunny", text: "Mostly Sunny" },
              { value: "partlyCloudy", text: "Partly Cloudy" },
              { value: "mostlyCloudy", text: "Mostly Cloudy" },
              { value: "cloudy", text: "Cloudy" },
              { value: "sunShowers", text: "Sun Showers" },
              { value: "lightShowers", text: "Light Showers" },
              { value: "showers", text: "Showers" },
              { value: "rain", text: "Rain" },
              { value: "thunder", text: "Thunder" },
              { value: "snow", text: "Snow" },
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
    on:click={() => download(canvas, `weather-${dateToISO(new Date())}`)}>Generate</button
  >
  <button
    class="btn"
    on:click={() => downloadText(JSON.stringify(values), `weather-${dateToISO(new Date())}.json`)}
    >JSON</button
  >
  <input
    type="file"
    class="file-input file-input-ghost w-full max-w-xs"
    accept="application/json"
    on:change={applyFile}
  />
</Generator>
