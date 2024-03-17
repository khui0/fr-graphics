<script>
    let cards = [
        {
            title: "Thumbnail",
            description: "Easy as pie!",
            thumbnail: "./thumbnail.png",
            src: "/generator/thumbnail",
        },
        {
            title: "Upcoming Events",
            description: "What's going on?",
            thumbnail: "./events.png",
            src: "/generator/events",
        },
        {
            title: "Weather",
            description: "It's raining cats and dogs!",
            thumbnail: "./weather.png",
            src: "/generator/weather",
        },
    ];
</script>

<svelte:head>
    <title>Falcon Report Graphics</title>
</svelte:head>

<h1 class="text-center mb-8 text-2xl font-bold">Graphics Generators</h1>
<div class="mx-auto flex flex-row gap-4 flex-wrap w-fit justify-center">
    {#each cards as card}
        <div class="card card-compact w-96 hover:scale-95 transition-all">
            <a href={card.src}
                ><figure class="rounded-box">
                    <img src={card.thumbnail} alt={card.title} />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">{card.title}</h2>
                    <p>{card.description}</p>
                </div>
            </a>
        </div>
    {/each}
</div>
