<script>
    export let field;
</script>

<label class="form-control w-full max-w-xl">
    {#if field.text && field.type !== "toggle"}
        <div class="label">
            <span class="label-text">{field.text}</span>
        </div>
    {/if}
    {#if field.type === "string"}
        <input type="text" class="input input-bordered" />
    {:else if field.type === "date"}
        <input type="date" class="input input-bordered" />
    {:else if field.type === "select" && field.options}
        <select class="select select-bordered">
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
            value={field.initial}
        />
        <div class="w-full flex justify-between text-xs px-2">
            {#each Array(field.max) as _, i}
                <span>{i + field.min}</span>
            {/each}
        </div>
    {:else if field.type === "toggle"}
        <label class="label cursor-pointer">
            <span class="label-text">{field.text}</span>
            <input type="checkbox" class="toggle" checked />
        </label>
    {/if}
</label>
