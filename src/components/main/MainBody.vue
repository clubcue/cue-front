<template>
  <div class='MainBody'>
    <el-row>
      <el-col :span="24">
        <el-carousel :interval="4000" type="card" height="35vh">
          <el-carousel-item v-for="item in images" :key="item">
            <!--<h3 class="medium">{{ item }}</h3>-->
            <img :src=item.url width="100%" height="100%" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :offset="4" :span="16">
        <div class="content">
          内容
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MainBody',
  data () {
    return {
      msg: 'MainBody',
      images: [
        {
          url: 'static/assets/1.jpg'
        },
        {
          url: 'static/assets/2.jpg'
        },
        {
          url: 'static/assets/3.jpg'
        }
      ],
      show3: true
    }
  }
}
</script>

<style lang="less" scoped>
  .MainBody {
    margin-top: 10px;
    .el-carousel__item h3 {
      background-color: rgba(0,0,0, 0.2);
      color: white;
      font-size: 18px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }

    .medium {
      color: white;
    }

    .content {
      height: 1500px;
    }
  }
</style>
