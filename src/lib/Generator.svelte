<script>
    export let title = "Generator";
    export let fields;
</script>

<div class="flex flex-col items-center">
    <h2 class="text-center text-2xl">{title}</h2>
    <canvas
        class="rounded-box bg-base-200 w-full max-w-xl my-4"
        width="1920"
        height="1080"
    ></canvas>
    {#each fields as field}
        <label class="form-control w-full max-w-xl">
            <div class="label">
                <span class="label-text">{field.text}</span>
            </div>
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
            {/if}
        </label>
    {/each}
    <button class="btn btn-primary my-4">Generate</button>
</div>
