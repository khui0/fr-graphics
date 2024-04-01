<script>
    import { base } from "$app/paths";

    const ver = __APP_VERSION__;

    let cards = [
        {
            title: "Thumbnail",
            description: "Easy as pie!",
            thumbnail: "./thumbnail.png",
            src: `${base}/generator/thumbnail`,
        },
        {
            title: "Upcoming Events",
            description: "What's going on?",
            thumbnail: "./events.png",
            src: `${base}/generator/events`,
        },
        {
            title: "Weather",
            description: "It's raining cats and dogs!",
            thumbnail: "./weather.png",
            src: `${base}/generator/weather`,
        },
    ];
</script>

<svelte:head>
    <title>Falcon Report Graphics</title>
</svelte:head>

<h1 class="text-center text-2xl">Graphics Generators</h1>
<div class="mx-auto my-10 flex flex-row gap-4 flex-wrap justify-center">
    {#each cards as card}
        <div class="card card-compact w-96 hover:scale-95 transition-all">
            <a href={card.src}
                ><figure class="rounded-box">
                    <img src={card.thumbnail} alt={card.title} />
                </figure>
                <div class="card-body gap-0">
                    <h2 class="card-title">{card.title}</h2>
                    <p class="text-neutral-content">{card.description}</p>
                </div>
            </a>
        </div>
    {/each}
</div>
<div class="prose text-center mx-auto">
    <p>Falcon Report internal tools {ver}</p>
</div>
