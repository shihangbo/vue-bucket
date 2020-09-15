<template>
  <div class="blue" style="color:red;" @click="alert('bar')">Bar</div>
</template>
<script>
export default {
  methods:{
    alert(n){
      alert(n)
    }
  }
}
</script>



