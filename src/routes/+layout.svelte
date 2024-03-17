<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
</script>

<div class="app h-full flex flex-col">
    <Header></Header>
    <main class="px-4">
        <slot />
    </main>
    <Footer></Footer>
</div>

<style>
    .app {
        font-family: "Montserrat", sans-serif;
    }
</style>
