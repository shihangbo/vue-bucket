
<template>
  <div>
    导航: 
    <router-link to="/">首页</router-link>
    <router-link to="/about">关于</router-link>

    <router-view a=1 b=2></router-view>


    <div>Vuex</div>
    <div>root state我的年龄: {{$store.state.age}}</div>
    <div>mapState我的年龄: {{age}}</div>
    <div>root getters我的年龄: {{$store.getters.getAge}}</div>
    <div>mapGetters我的年龄: {{getAge}}</div>
    <div>b我的年龄: {{$store.state.b.age}}</div>
    <div>c我的年龄: {{$store.state.c.age}}</div>
    <div>d我的年龄: {{$store.state.c.d.age}}</div>
    <div>e我的年龄: {{$store.state.b.e.myAge}}</div>

    <button @click="$store.state.age+=10">直接修改state的值</button>
    <button @click="syncAdd">同步更新状态 +1 </button>
    <button @click="syncAdd">mapMutaions 同步更新状态 +1 </button>
    <button @click="asyncAdd">异步更新状态 +2 </button>
    <button @click="asyncAdd">mapActions 异步更新状态 +2 </button>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from '../source/vuex'

export default {
  name: 'app',
  computed: {
    ...mapState(['age']),
    ...mapGetters(['getAge'])
  },
  mounted() {
    console.log('实例中获取到的属性$route:', this.$route, '$router: ',this.$router)
    console.log('实例中获取到的属性$store:', this)
  },
  methods: {
    ...mapActions(['syncChangeAge']),
    ...mapMutations(['asyncChangeAge']),
    syncAdd() {
      this.$store.commit('changeAge', 1)
    },
    asyncAdd() {
      this.$store.dispatch('changeAge', 2)
    }
  }
}
</script>
