<script>
  import Field from "./Field.svelte";

  export let title = "Generator";
  export let fields;
  export let canvas;

  // Binded values for the inputs
  export let values = createStructure(fields);

  // Analyzes "fields" and assigns appropriate variables to prevent undefined values
  function createStructure(fields) {
    const object = {};
    fields.forEach((field) => {
      if (field.type === "group") {
        object[field.name] = {};
        field.fields.forEach((subField) => {
          if (subField.value) {
            object[field.name][subField.name] = subField.value;
          }
        });
      } else {
        if (field.value) {
          object[field.name] = field.value;
        }
      }
    });
    return object;
  }
</script>

<h2 class="text-center text-2xl">{title}</h2>
<div class="flex flex-row gap-4 items-start justify-center flex-wrap my-4">
  <div class="w-full max-w-2xl">
    <canvas bind:this={canvas} class="rounded-box bg-base-200 w-full" width="1920" height="1080"
    ></canvas>
    <div class="flex flex-row justify-center mt-4 gap-2 flex-wrap">
      <slot />
    </div>
  </div>
  <div class="w-full max-w-xl">
    {#each fields as field}
      {#if field.type !== "group"}
        <Field {field} bind:value={values[field.name]}></Field>
      {:else}
        <div
          class="w-full max-w-xl p-3 border border-neutral rounded-box my-4 first:mt-0 last:mb-0"
        >
          <p class="text-neutral-content">{field.text}</p>
          {#each field.fields as subField}
            <Field field={subField} bind:value={values[field.name][subField.name]}></Field>
          {/each}
        </div>
      {/if}
    {/each}
  </div>
</div>
