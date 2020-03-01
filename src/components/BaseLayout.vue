<template>
    <div id="layout">
        <sidebar class="sidebar" title="RPi Dashboard"></sidebar>
        <router-view class="main"></router-view>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
    components: {
        Sidebar
    }
}
</script>

<style scoped>
#layout {
    display: -webkit-flex;
    display: flex;
    min-height: 100%;
    height: 100%;
}
.sidebar {
    -webkit-flex: 0.5;
    -ms-flex: 0.5;
    flex: 0.6;
    width: 250px;
    min-height: 100%;
    padding: 20px;
    position: fixed;
    top: 0;
}
.main {
    -webkit-flex: 4;
    -ms-flex: 4;
    flex: 4;
    min-height: 100%;
    padding: 20px;
    padding-left: 270px;
}
@media (max-width: 600px) {
  #layout {
    -webkit-flex-direction: column;
    flex-direction: column;
  }
}
</style>
