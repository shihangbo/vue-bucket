<template>
<div id="app">
  app
  <router-link to="/">foo</router-link>
  <router-link to="/bar">bar</router-link>
  <router-view></router-view>
</div>
</template>

<script>
import Foo from './components/Foo.vue'
import Bar from './components/Bar.vue'
export default {
  components: {
    Foo,
    Bar
  }
}
</script>
