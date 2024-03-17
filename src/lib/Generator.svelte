<script>
    import Field from "./Field.svelte";

    export let title = "Generator";
    export let fields;
</script>

<h2 class="text-center text-2xl">{title}</h2>
<div class="flex flex-row gap-4 items-start justify-center flex-wrap my-4">
    <canvas
        class="rounded-box bg-base-200 w-full max-w-xl"
        width="1920"
        height="1080"
    ></canvas>
    <div class="w-full max-w-xl overflow-auto">
        {#each fields as field}
            {#if field.type !== "group"}
                <Field {field}></Field>
            {:else}
                <div
                    class="w-full max-w-xl p-3 border border-neutral rounded-box my-4 first-of-type:mt-0 last-of-type:mb-0"
                >
                    {#if field.text}
                        <p class="text-neutral-content">{field.text}</p>
                    {/if}
                    {#each field.fields as field}
                        <Field {field}></Field>
                    {/each}
                </div>
            {/if}
        {/each}
        <button class="btn btn-primary my-4">Generate</button>
    </div>
</div>
