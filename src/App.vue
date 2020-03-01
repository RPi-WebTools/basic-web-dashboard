<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '~vue-material/dist/theme/engine';

@include md-register-theme('default', (
    primary: #ff9800,
    accent: #f44336,
    theme: dark
));

@import '~vue-material/dist/theme/all';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
