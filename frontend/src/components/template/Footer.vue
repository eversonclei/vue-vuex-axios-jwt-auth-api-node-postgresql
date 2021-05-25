<template>
    <footer class="footer">
        <span>© 2021<strong> - Everson Clei</strong></span>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        grid-area: footer;
        background-color: #ddd;
        color: #333;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
    }
</style>