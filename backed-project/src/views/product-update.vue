<template>
  <div>
    <Header/>
    <Content ref="scrollContent">
      <div class="content">
        <h1>修改商品</h1>
        <div class="container">
          <div class="newproduct" v-for="(item,index) in newProducts" :key="index" :npIndex="index">
            <div class="newproduct-index">
              <span>商品 {{index+1}}</span>
            </div>
            <div class="newproduct-info">
              <el-input :placeholder="item.name" v-model="newProducts[index].name">
                <template slot="prepend">商品名称:</template>
              </el-input>
              <el-input :placeholder="item.title" v-model="newProducts[index].title">
                <template slot="prepend">商品说明:</template>
              </el-input>
              <el-input :placeholder="item.type" v-model="newProducts[index].type">
                <template slot="prepend">商品类型:</template>
              </el-input>
              <el-input :placeholder="item.priceDesc" v-model="newProducts[index].priceDesc">
                <template slot="prepend">商品价格描述:</template>
              </el-input>
              <div class="img">
                <div class="newproduct" v-for="(img,index) in item.imgList" :key="index">
                  <div class="newproduct-index">
                    <span>商品图集{{index+1}}</span>
                  </div>
                  <div class="newproduct-info">
                    <el-input :placeholder="img.url" v-model="item.imgList[index].url">
                      <template slot="prepend">图片地址:</template>
                    </el-input>
                    <div></div>
                  </div>
                  <div class="newproduct-delete" @click="newProductImgDelete(index)">
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div class="mg-TB60">
                  <el-button size="medium" round @click="newProductImgAdd(index)">新增商品图片</el-button>
                </div>
              </div>
              <div class="color">
                <div
                  class="newproduct"
                  v-for="(itemColor,colorIndex) in item.colorInfo"
                  :key="colorIndex"
                >
                  <div class="newproduct-index">
                    <span>商品颜色{{colorIndex+1}}</span>
                  </div>
                  <div class="newproduct-info">
                    <el-input :placeholder="itemColor.color" v-model="itemColor.color">
                      <template slot="prepend">商品颜色色值:</template>
                    </el-input>
                    <el-input :placeholder="itemColor.colorDesc" v-model="itemColor.colorDesc">
                      <template slot="prepend">商品颜色描述:</template>
                    </el-input>
                    <div class="size">
                      <div
                        class="newproduct"
                        v-for="(itemSize,index) in itemColor.sizeInfo"
                        :key="index"
                      >
                        <div class="newproduct-index">
                          <span>商品配置{{index+1}}</span>
                        </div>
                        <div class="newproduct-info">
                          <el-input :placeholder="itemSize.size" v-model="itemSize.size">
                            <template slot="prepend">商品配置:</template>
                          </el-input>
                          <el-input :placeholder="itemSize.number" v-model="itemSize.number">
                            <template slot="prepend">商品库存:</template>
                          </el-input>
                          <el-input :placeholder="itemSize.price" v-model="itemSize.price">
                            <template slot="prepend">商品价格:</template>
                          </el-input>
                        </div>
                        <div
                          class="newproduct-delete"
                          @click="newProductSizeDelete(colorIndex,index)"
                        >
                          <i class="el-icon-delete"></i>
                        </div>
                      </div>
                      <div class="mg-TB60">
                        <el-button
                          size="medium"
                          round
                          @click="newProductSizeAdd(colorIndex,index)"
                        >新增商品配置</el-button>
                      </div>
                    </div>
                  </div>
                  <div class="newproduct-delete" @click="newProductColorDelete(colorIndex)">
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
                <div class="mg-TB60">
                  <el-button size="medium" round @click="newProductColorAdd()">新增商品颜色</el-button>
                </div>
              </div>
            </div>
            <div class="newproduct-delete" @click="newProductDelete(index)">
              <i class="el-icon-delete"></i>
            </div>
          </div>
          <div class="mg-TB60">
            <el-button size="medium" round @click="deleteProduct()">删除商品</el-button>
            <el-button
              size="medium"
              type="primary"
              round
              :loading="newProductSetting"
              @click="newProductConfirm"
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
  name: 'ProductEdit',
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
  data() {
    return {
      newProducts: [
        {
          name: '',
          title: '',
          priceDesc: '',
          colorInfo: [
            {
              color: '',
              colorDesc: '',
              sizeInfo: [
                {
                  size: '',
                  number: 0,
                  price: 0
                }
              ]
            }
          ],
          imgList: [{ url: '' }],
          type: ''
        }
      ],
      newProductSetting: false,
      npIndex: 0
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.scrollContent.refresh()
    })
  },
  methods: {
    init: function() {
      let _this = this
      Axios.post('/edit/product/find', {
        id: _this.$route.params.id
      })
        .then(function(res) {
          _this.newProducts = res.data.state
          _this.$nextTick(() => {
            _this.$refs.scrollContent.refresh()
          })
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    deleteProduct: function() {
      let _this = this
      Axios.post('/edit/product/delete', {
        id: _this.$route.params.id
      })
        .then(function(res) {
          if (res.data.state===true) {
             _this.$toast.success('商品删除成功！')
          } else {
            _this.$toast.fail('数据请求出错！')
          }
          _this.$nextTick(() => {
            _this.$refs.scrollContent.refresh()
          })
        })
        .catch(function(error) {
          _this.$toast.fail('数据请求出错！')
        })
    },
    newProductAdd: function() {
      this.newProducts.push({
        name: '',
        title: '',
        priceDesc: '',
        colorInfo: [
          {
            color: '',
            colorDesc: '',
            sizeInfo: [
              {
                size: '',
                number: 0,
                price: 0
              }
            ]
          }
        ],
        imgList: [{ url: '' }],
        type: ''
      })
    },
    newProductDelete: function(index) {
      if (this.newProducts.length === 1) {
        this.$toast.fail('至少保留一组商品数据！')
        return
      }
      this.newProducts.splice(index, 1)
    },
    newProductConfirm: function() {
      const _this = this
      this.newProductSetting = true
      console.log(this.newProducts)
      Axios.post('/edit/product/update', {
        id:_this.$route.params.id,
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
    newProductImgDelete: function(index) {
      if (this.newProducts[this.npIndex].imgList.length === 1) {
        this.$toast.fail('至少保留一组商品数据！')
        return
      }
      this.newProducts[this.npIndex].imgList.splice(index, 1)
    },
    newProductImgAdd: function() {
      this.newProducts[this.npIndex].imgList.push({
        url: ''
      })
    },
    newProductColorDelete: function(index) {
      if (this.newProducts[this.npIndex].colorInfo.length === 1) {
        this.$toast.fail('至少保留一组商品数据！')
        return
      }
      this.newProducts[this.npIndex].colorInfo.splice(index, 1)
    },
    newProductColorAdd: function() {
      this.newProducts[this.npIndex].colorInfo.push({
        color: '',
        colorDesc: '',
        sizeInfo: [
          {
            size: '',
            number: 0,
            price: 0
          }
        ]
      })
    },
    newProductSizeDelete: function(colorIndex, index) {
      if (
        this.newProducts[this.npIndex].colorInfo[colorIndex].sizeInfo.length ===
        1
      ) {
        this.$toast.fail('至少保留一组商品数据！')
        return
      }
      this.newProducts[this.npIndex].colorInfo[colorIndex].sizeInfo.splice(
        index,
        1
      )
    },
    newProductSizeAdd: function(colorIndex, index) {
      this.newProducts[this.npIndex].colorInfo[colorIndex].sizeInfo.push({
        size: '',
        number: 0,
        price: 0
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
      padding: 10px;
      box-shadow: 0px 0px 2px #e5e5ee;
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
