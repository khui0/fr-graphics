<script>
    import { onMount } from "svelte";
    import Field from "./Field.svelte";

    export let title = "Generator";
    export let fields;
    export let canvas;

    export let values = createStructure(fields);

    function createStructure(fields) {
        const object = {};
        fields.forEach((field) => {
            if (field.type == "group") {
                object[field.name] = {};
            }
        });
        return object;
    }

    $: console.log(values);
</script>

<h2 class="text-center text-2xl">{title}</h2>
<div class="flex flex-row gap-4 items-start justify-center flex-wrap my-4">
    <canvas
        bind:this={canvas}
        class="rounded-box bg-base-200 w-full max-w-xl"
        width="1920"
        height="1080"
    ></canvas>
    <div class="w-full max-w-xl overflow-auto">
        {#each fields as field}
            {#if field.type !== "group"}
                <Field {field} bind:value={values[field.name]}></Field>
            {:else}
                <div
                    class="w-full max-w-xl p-3 border border-neutral rounded-box my-4 first:mt-0 last:mb-0"
                >
                    {#if field.text}
                        <p class="text-neutral-content">{field.text}</p>
                    {/if}
                    {#each field.fields as subField}
                        <Field
                            field={subField}
                            bind:value={values[field.name][subField.name]}
                        ></Field>
                    {/each}
                </div>
            {/if}
        {/each}
        <button class="btn btn-primary my-4">Generate</button>
    </div>
</div>
