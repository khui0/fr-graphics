<script>
    import Header from "$lib/Header.svelte";
    import Footer from "$lib/Footer.svelte";
</script>

<div class="app h-full flex flex-col">
    <Header></Header>
    <main class="px-4 h-fit mb-auto">
        <slot />
    </main>
    <Footer></Footer>
</div>

<style>
    .app {
        font-family: "Montserrat", sans-serif;
    }
</style>
