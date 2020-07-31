<template>
  <div>
    导航: 
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>

    <router-view a=1 b=2></router-view>


    <div>Vuex</div>
    <div>我的年龄1 {{$store.state.age}}</div>
    <div>我的年龄2 {{$store.getters.getAge}}</div>
    <button @click="syncAdd">同步更新状态 +1 </button>
    <button @click="asyncAdd">异步更新状态 +2 </button>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    console.log('实例中获取到的属性$route:', this.$route, '$router: ',this.$router)
    console.log('实例中获取到的属性$store:', this)
  },
  methods: {
    syncAdd() {
      this.$store.commit('changeAge', 1)
    },
    asyncAdd() {
      this.$store.dispatch('changeAge', 2)
    }
  }
}
</script>
