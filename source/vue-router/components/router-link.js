export default {
  props: {
    to: {
      type: String,
      require:true
    },
    tag: {
      type: String,
    }
  },
  methods: {
    clickHandler() {
      this.$router.push(this.to)
    }
  },
  render(h) {
    let tag = this.tag || 'a'
    return h(tag,{
      on: {
        click: this.clickHandler
      }
    },this.$slots.default)
  }
}