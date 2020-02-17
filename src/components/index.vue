<template>
  <div class="hello">
    <el-container>
      <el-header>
        <header-menu />
      </el-header>
      <el-main>
        <main-body />
      </el-main>
      <el-footer>
        <foot-page />
      </el-footer>
    </el-container>
    <back-top />
  </div>
</template>

<script>
import HeaderMenu from './header/Header.vue'
import MainBody from './main/MainBody.vue'
import FootPage from './footer/FootPage.vue'
import BackTop from './common/BackTop.vue'
export default {
  components: { HeaderMenu, MainBody, FootPage, BackTop },
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
  .hello {
    .el-header, .el-main, .el-footer {
      margin: 0;
      padding: 0;
    }
  }
</style>
