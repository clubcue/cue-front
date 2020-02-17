<template>
  <div class='FootPage'>
    <el-col :offset="4" :span="16">
      <div style="float: left; padding-top: 10px">
        <el-col :span="8">
          <div style="width: 300px; text-align: left; color: gray">
            <h3>链接</h3>
            <ul style="list-style:none; padding: 0; height: 30px;">
              <li>代码仓库</li>
              <li>更新日志</li>
              <li>常见问题</li>
              <li>脚手架</li>
              <li>在线主题生成器</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="width: 300px; text-align: left; color: gray">
            <h3>链接</h3>
            <ul style="list-style:none; padding: 0; height: 30px;">
              <li>代码仓库</li>
              <li>更新日志</li>
              <li>常见问题</li>
              <li>脚手架</li>
              <li>在线主题生成器</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="width: 300px; text-align: left; color: gray">
            <h3>链接</h3>
            <ul style="list-style:none; padding: 0; height: 30px;">
              <li>代码仓库</li>
              <li>更新日志</li>
              <li>常见问题</li>
              <li>脚手架</li>
              <li>在线主题生成器</li>
            </ul>
          </div>
        </el-col>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'FootPage',
  data () {
    return {
      msg: 'FootPage'
    }
  }
}
</script>

<style scoped>
  .FootPage {
    width: 100%;
    height: 300px;
    background-color: #f7fbfd;
  }
  li{
    height: 30px;
  }
</style>
