<template>
    <div class="storage-medium">
        <h1>This is detailed info about storage things</h1>
        <p>{{ fsDetails }}</p>
    </div>
</template>

<script>
export default {
    name: 'StorageMedium',
    props: {
        fsDetails: Object
    }
}
</script>
