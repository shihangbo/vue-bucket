<template>
  <div>
    导航: 
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>

    <router-view a=1 b=2></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    console.log('实例中获取到的属性$route:', this.$route, '$router: ',this.$router)
  }
}
</script>
