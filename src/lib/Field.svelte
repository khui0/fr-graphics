<script>
    export let field;
    export let value;

    function parseText(e) {
        const input = e.target;
        if (input.files.length == 1) {
            const file = input.files[0];
            file.text().then((result) => {
                value = result;
            });
        }
    }
</script>

<label class="form-control w-full max-w-xl">
    {#if field.text && field.type !== "toggle"}
        <div class="label">
            <span class="label-text">{field.text}</span>
        </div>
    {/if}
    {#if field.type === "string"}
        {#if field.placeholder}
            <input
                type="text"
                class="input input-bordered"
                bind:value
                placeholder={field.placeholder}
            />
        {:else}
            <input type="text" class="input input-bordered" bind:value />
        {/if}
    {:else if field.type === "date"}
        <input type="date" class="input input-bordered" bind:value />
    {:else if field.type === "number"}
        <input type="number" class="input input-bordered" bind:value />
    {:else if field.type === "select" && field.options}
        <select class="select select-bordered" bind:value>
            {#each field.options as option}
                <option value={option.value}>{option.text}</option>
            {/each}</select
        >
    {:else if field.type === "range"}
        <input
            type="range"
            min={field.min}
            max={field.max}
            class="range"
            step="1"
            bind:value
        />
        <div class="w-full flex justify-between text-xs px-2">
            {#each Array(field.max) as _, i}
                <span>{i + field.min}</span>
            {/each}
        </div>
    {:else if field.type === "toggle"}
        <label class="label cursor-pointer">
            <span class="label-text">{field.text}</span>
            <input type="checkbox" class="toggle" bind:checked={value} />
        </label>
    {:else if field.type === "file"}
        {#if field.accept}
            <input
                type="file"
                class="file-input file-input-bordered w-full"
                accept={field.accept}
                on:change={parseText}
            />
        {:else}
            <input
                type="file"
                class="file-input file-input-bordered w-full"
                on:change={parseText}
            />
        {/if}
    {/if}
</label>
