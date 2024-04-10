<script>
  import { onMount } from "svelte";
  import { load, generate } from "./generator.js";
  import { download, downloadText, thisFriday, dateToISO } from "$lib/utilities.js";

  import Generator from "$lib/Generator.svelte";

  let title = "Thumbnail";
  let fields = [
    {
      name: "date",
      type: "date",
      text: "Date",
      value: dateToISO(thisFriday()),
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
      value: 8,
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
  <button class="btn btn-primary" on:click={() => download(canvas, `thumbnail-${values.date}`)}
    >Generate</button
  >
  <button
    class="btn"
    on:click={() => downloadText(JSON.stringify(values), `thumbnail-${values.date}.json`)}
    >JSON</button
  >
  <input
    type="file"
    class="file-input file-input-ghost w-full max-w-xs"
    accept="application/json"
    on:change={applyFile}
  />
</Generator>
