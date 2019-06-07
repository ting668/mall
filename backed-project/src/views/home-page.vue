<template>
  <div>
    <Header/>
    <Content ref="scrollContent">
      <div class="content">
        <h1>首页轮播图</h1>
        <div class="container">
          <div class="carousel">
            <div class="mg-TB15" v-for="(item,index) in imgList" :key="index">
              <el-input placeholder="请输入图片地址" v-model="item.url">
                <template slot="prepend">图片url:</template>
                <div class="input-suffix" slot="suffix" @click="carouselDelete(index)">
                  <i class="el-icon-circle-close" style="color:red">
                    <span>清除</span>
                  </i>
                </div>
              </el-input>
              <el-input placeholder="请输入商品id" v-model="item.id">
                <template slot="prepend">商品 id:</template>
              </el-input>
            </div>
            <div class="mg-TB60">
              <el-button size="medium" round @click="carouselAdd()">新增</el-button>
              <el-button
                size="medium"
                type="primary"
                round
                :loading="carouselSetting"
                @click="carouselConfirm"
              >确认</el-button>
            </div>
          </div>
        </div>
        <h1>新品尝鲜</h1>
        <div class="container">
          <div class="newproduct" v-for="(item,index) in newProducts" :key="index">
            <div class="newproduct-index">
              <span>{{index+1}}</span>
            </div>
            <div class="newproduct-info">
              <el-input :placeholder="item.id" v-model="newProducts[index].id">
                <template slot="prepend">id:</template>
              </el-input>
              <el-input :placeholder="item.url" v-model="newProducts[index].url">
                <template slot="prepend">url:</template>
              </el-input>
              <el-input :placeholder="item.name" v-model="newProducts[index].name">
                <template slot="prepend">name:</template>
              </el-input>
              <el-input :placeholder="item.price" v-model="newProducts[index].price">
                <template slot="prepend">price:</template>
              </el-input>
            </div>
            <div class="newproduct-delete" @click="newProductDelete(index)">
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <div class="mg-TB60">
            <el-button size="medium" round @click="newProductAdd()">新增</el-button>
            <el-button
              size="medium"
              type="primary"
              round
              :loading="newProductSetting"
              @click="newProductConfirm"
            >确认</el-button>
          </div>
        </div>
        <h1>热销产品</h1>
        <div class="container">
          <div class="newproduct" v-for="(item,index) in hotProducts" :key="index">
            <div class="newproduct-index">
              <span>{{index+1}}</span>
            </div>
            <div class="newproduct-info">
              <el-input :placeholder="item.id" v-model="hotProducts[index].id">
                <template slot="prepend">id:</template>
              </el-input>
              <el-input :placeholder="item.url" v-model="hotProducts[index].url">
                <template slot="prepend">url:</template>
              </el-input>
              <el-input :placeholder="item.name" v-model="hotProducts[index].name">
                <template slot="prepend">name:</template>
              </el-input>
              <el-input :placeholder="item.price" v-model="hotProducts[index].price">
                <template slot="prepend">price:</template>
              </el-input>
            </div>
            <div class="newproduct-delete" @click="hotProductDelete(index)">
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <div class="mg-TB60">
            <el-button size="medium" round @click="hotProductAdd()">新增</el-button>
            <el-button
              size="medium"
              type="primary"
              round
              :loading="hotProductSetting"
              @click="hotProductConfirm"
            >确认</el-button>
          </div>
        </div>
      </div>
    </Content>
  </div>
</template>

<script>
import Header from '@/components/common-header'
import Content from '@/components/common-content'
import Footer from '@/components/common-footer'
import CoupleFaded from '@/components/couple-list-faded'
import CoupleZoom from '@/components/couple-list-zoom'
import { Swipe, SwipeItem } from 'vant'
import Axios from '@/service/axiosPlugin'
export default {
  name: 'HomePage',
  components: {
    Header,
    Content,
    Footer,
    CoupleFaded,
    CoupleZoom,
    Swipe,
    SwipeItem,
    Axios
  },
  created() {
    this.init()
  },
  data() {
    return {
      imgList: [{url:'',id:''}],
      newProducts: [{ id: '', url: '', name: '', price: '' }],
      hotProducts: [{ id: '', url: '', name: '', price: '' }],
      carouselSetting: false,
      newProductSetting: false,
      hotProductSetting: false,
      confirmming: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollContent.refresh()
    })
  },
  methods: {
    init: function() {
      let _this = this
      Axios.get('/shop/homepage')
        .then(function(res) {
          _this.imgList = res.data.data[0].carousel
          _this.newProducts = res.data.data[0].newProduct
          _this.hotProducts = res.data.data[0].hotProduct
          console.log(_this.imgList)
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    carouselDelete: function(index) {
      if (this.imgList.length === 1) {
        this.$toast.fail('至少保留一张图片链接！')
        return
      }
      this.imgList.splice(index, 1)
    },
    carouselAdd: function() {
      this.imgList.push({url:'',id:''})
    },
    carouseConfirm: function() {},
    newProductAdd: function() {
      this.newProducts.push({ id: '', url: '', name: '', price: '' })
    },
    newProductDelete: function(index) {
      if (this.newProducts.length === 1) {
        this.$toast.fail('至少保留一张图片链接！')
        return
      }
      this.newProducts.splice(index, 1)
    },
    hotProductAdd: function() {
      this.hotProducts.push({ id: '', url: '', name: '', price: '' })
    },
    hotProductDelete: function(index) {
      if (this.hotProducts.length === 1) {
        this.$toast.fail('至少保留一张图片链接！')
        return
      }
      this.hotProducts.splice(index, 1)
    },
    carouselConfirm: function() {
      const _this = this
      this.carouselSetting = true
      Axios.post('/edit/hpbase/carousel', {
        imglist: _this.imgList
      })
        .then(function(res) {
          console.log(res.data)
          _this.carouselSetting = false
          if (res.data.state === true) {
            _this.$toast.success('修改成功！')
          } else if (res.data.state === true) {
            _this.$toast.fail('修改失败！')
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    newProductConfirm: function() {
      const _this = this
      this.newProductSetting = true
      Axios.post('/edit/hpbase/newproduct', {
        newproduct: _this.newProducts
      })
        .then(function(res) {
          console.log(res.data)
          _this.newProductSetting = false
          if (res.data.state === true) {
            _this.$toast.success('修改成功！')
          } else if (res.data.state === true) {
            _this.$toast.fail('修改失败！')
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    hotProductConfirm: function() {
      const _this = this
      this.hotProductSetting = true
      Axios.post('/edit/hpbase/hotproduct', {
        hotproduct: _this.hotProducts
      })
        .then(function(res) {
          console.log(res.data)
          _this.hotProductSetting = false
          if (res.data.state === true) {
            _this.$toast.success('修改成功！')
          } else if (res.data.state === true) {
            _this.$toast.fail('修改失败！')
          }
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  margin: auto;
  .container {
    max-width: 1000px;
    margin: auto;
    width: 80%;
    .carousel {
      width: calc(100% - 160px);
      margin: auto;
    }
    .input-suffix {
      line-height: 40px;
      cursor: pointer;
    }
    .newproduct {
      display: flex;
      margin: 30px;
      .newproduct-info {
        width: calc(100% - 120px);
      }
      .newproduct-index {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
      }
      .newproduct-delete {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        i {
          cursor: pointer;
        }
        i:hover {
          color: #09007a;
        }
      }
    }
  }
}
img {
  width: 100%;
}
</style>
