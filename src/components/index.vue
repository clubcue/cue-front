<template>
  <div class="hello">
    <el-container>
      <el-header>
        <header-menu />
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderMenu from './header/Header.vue'
export default {
  components: { HeaderMenu },
  name: 'index',
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    count: {
      get () {
        return this.$store.getters.Search.count
      }
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .el-header {
    margin: 0;
    padding: 0;
  }
</style>
