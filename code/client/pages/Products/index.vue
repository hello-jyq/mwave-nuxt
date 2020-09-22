
<template>
  <div class="content">
    <div class="gallery">
      <div class="alert-status">
        <a href="https://www.mwave.com.au/blog/2020/3/18/mwave-coronavirus-covid-19-update">
          <b>We are experiencing high demand. Processing time may be longer than usual.</b> Learn more >
        </a>
      </div>
      <p class="breadcrumb">
        <nuxt-link to="/">Home</nuxt-link>>
        <a>Graphics Card</a>>
        <a>NVIDIA Video Cards</a>> ASUS GeForce RTX 2080 SUPER Dual EVO OC V2 8GB Video Card
      </p>
      <div class="product-common">
        <div class="carousel-box">
          <div class="product-img-box">
            <img src="../../assets/images/free.png" class="free-img">       
            <template v-for="(item,index) in pImgs">
              <div class="product-img" v-if="index == imgsI" :key="index" @click="onShowBig">
                <img
                  class="big"
                  :src="item.url"
                  :alt="item.name"
                  style="max-width:450px;max-height:350px;"
                />
              </div>
            </template>          
          </div>
         <div class="thumbnail">
            <div class="thumbnail-button prev-btn" :class="{'disabled':left == 0}" @click="thumbnailPrev"></div>
            <div class="thumbnail-box">
              <ul :style="thumbnailWidth">
                <li class="imgs"  :class="{'active-img' : imgsI==i}" v-for="(item,i) in activeImgs" @click="imgsI=i" :key="i">
                  <img :src="item.url" :alt="item.name" />
                </li>
              </ul>
            </div>
            <div class="thumbnail-button next-btn" :class="{'disabled':activeImgs.length<5 || nextDisabled}" @click="thumbnailNext"></div>
          </div>
        </div>

        <div class="basic-infos">
          <p class="basic-tips font-red">Limited Time Marked Down Prices. Must End By 31 August. While Stock Lasts.</p>
          <div>
            <p class="basic-infos-name">{{productInfo.name}}</p>
            <p class="basic-infos-sku">SKU# {{productInfo.sku}}, Model# {{productInfo.model}}/XY</p>
          </div>
          <div class="rate-box">
            <el-rate
              v-model="productInfo.rate"
              disabled
              show-score
              text-color="#ff9900"
              >
            </el-rate>
            <div class="rate-count">(27 reviews)</div>
          </div>
          <ul class="stock-and-delivery">
            <li class="stock-delivery-info">
              <div class="sd-info-title">Availability:</div>
              <div class="sd-info-detail">
                <template v-if="productInfo.inStock">
                  <div class="sd-info-detail-list">
                    <div>In-Stock at Mwave:</div>
                    <div class="font-green">Yes</div>
                  </div>
                  <div class="sd-info-detail-list">
                    <div>Processing Time<span style="font-weight: normal;">(after payment approval):</span></div>
                    <div class="font-green">Less Than 24 Hours</div>
                  </div>
                  <div class="sd-info-detail-list special font-red">Free Shipping</div>
                  <div class="sd-info-detail-list special font-red">Offer Ends 21/08/2020<nuxt-link to>Conditions Apply</nuxt-link></div>
                </template>
                <div class="sd-info-detail-list" v-else style="font-weight: normal;">Currently No Stock </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="cart-box">
          <div class="cart-info">
            <div class="cart-up">
              <div class="cost-price">{{productInfo.constPrice}}</div>
              <div class="price">{{productInfo.price}}</div>
              <div class="buy-now">
                <span>Own it now, pay later</span>
                <img src="https://www.mwave.com.au/content/img/zipmoney-small.png" alt />
              </div>
            </div>
            <div class="cart-down">
              <div class="add-carts">
                <el-form :inline="true" :rules="rules" ref="formInline" :model="productInfo" :hide-required-asterisk="true" v-if="productInfo.inStock" class="demo-form-inline">
                  <el-form-item label="Qty:" prop="qty" :show-message="false">
                    <el-input v-model="productInfo.qty"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="cart-btn" @click="onSubmit('formInline')">Add to Cart</div>
                  </el-form-item>
                </el-form>
                <div class="notify-btn" v-else>Notify Me</div>
              </div>
              <div class="add-watch-list">
                <div class="watch-btn">Add to Watch List</div>
              </div>
            </div>
          </div>
          <p class="special-offer-tips">{{productInfo.tips}}</p>
        </div>
      </div>
    </div>
    <div class="big-show-mask" v-if="isShowBig" @click="isShowBig = false">
      
      <div class="big-container" @click.stop>
        <div class="big-image" :class="{'show-image' : isShowBig&&!isLoading}">
          <img src="../../assets/images/loading.gif" class="loading-image" v-if="isLoading" />
          <template v-else>
              <div class="big-prev" @click.stop="onPrevImg" :style="hidePrev"></div> 
              <img :src="pImgs[bigIndex].href" ref="bigImage">
              <div class="big-next" @click.stop="onNextImg" :style="hideNext"></div>
          </template>
        </div>
        <div class="big-info">
          <div class="big-detail">Image {{activeIndex}} of  {{pImgs.length}}</div>
          <div class="big-close" @click="isShowBig = false">
            <img src="../../assets/images/close.png" />
          </div>
        </div>
      </div>
    </div>
    
    <div class="sli">
      <div class="cus-bought">
        <div class="cus-title">Customers also bought</div>
        <ul class="cus-content">
          <li v-for="(item,i) in cusBoughtS" :key="i">
            <div class="cus-con-img">
              <img :src="item.img" />
            </div>
            <div class="cus-con-name">{{item.name}}</div>
            <div class="cus-con-stars" :title="item.stars">
              <div v-if="item.stars!=''">
                <img src="../../assets/images/stars.png" />
              </div>
            </div>
            <div class="cus-con-price">${{item.price}}</div>
          </li>
        </ul>
      </div>
      <div class="cus-viewed">
        <div class="cus-title">Customers also viewed</div>
        <ul class="cus-content">
          <li v-for="(item,i) in cusViewedS" :key="i">
            <div class="cus-con-img">
              <img :src="item.img" />
            </div>
            <div class="cus-con-name">{{item.name}}</div>
            <div class="cus-con-stars" :title="item.stars">
              <div v-if="item.stars!=''">
                <img src="../../assets/images/stars.png" />
              </div>
            </div>
            <div class="cus-con-price">${{item.price}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="product-details">
      <div class="details-tab">
        <ul>
          <li :class="{on:index===tab}" v-for="(item,index) in tabItem" :key="index" @click="clickActive(index)">
            <a>
              <span>{{item.name}}</span>
            </a>
          </li>
        </ul>
        <div class="detail-icon">
          <a class="print-icon"></a>
        </div>
      </div>
      <div class="detail-main">
        <div class="tab-detail" v-for="(item,index) in tabMain" :key="index" v-show="index===tab">
          <div v-for="(list,index) in item.detail" :key="index" >
            <div class="tabs-container">
              <div class="tab-detail-top" v-if="item.type==='Overview'||item.type==='Specifications'">SKU # {{list.sku}} | Model # {{list.model}}</div>
              <div v-if="item.type==='Overview'">
                <div  class="tab-detail-con" >
                  <h2>{{list.description}}</h2>
                  <div v-if="list.ManufacturerWarranty" ><span>Manufacturer Warranty: </span>{{list.ManufacturerWarranty}}</div>
                  <div v-if="list.ManufacturerContactInfo" ><span>Manufacturer Contact Info: </span>{{list.ManufacturerContactInfo}}</div>
                  <div v-if="list.Rating" class="rating">Rating: {{list.Rating}}</div>
                </div>
                <div class="tab-detail-main">
                  <ul class="tab-detail-main-param">
                    <li v-for="(detail,index) in list.parameter" :key="index" >
                      {{detail}}
                    </li>
                  </ul>
                  <div  class="tab-detail-main-title">
                    {{list.title}}
                  </div>
                  <div class="tab-detail-main-img">
                    <img :src="list.img"/>
                  </div>
                </div>
              </div>
              <div class="tab-specifications-main" v-if="item.type==='Specifications'">
                <table class="specifications-table">
                  <tbody>
                    <tr v-for="(spec,index) in list.details" :key="index" >
                      <td>{{spec.name}}</td>
                       <td>{{spec.substance}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
               <div class="tab-reviews-main" :class="item.type==='Reviews'?'tab-reviews':''">
                  <img src='../../assets/images/reviews.png'/>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 正数校验数字
    var validatedigital = (rule, value, callback) => {
      console.log("value", value);
      if (value != "" && value) {
        // 正则数字
        var reg = /^\d+$|^\d+[.]?\d+$/;
        if (!reg.test(value)) {
          callback(new Error(""));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      isLoading:true,
      isShowBig: false,
      nextDisabled: false,
      nextCount: 0,
      left: 0,
      rules: {
        qty: [
          { required: true, message: "", trigger: "blur" },
          { validator: validatedigital, trigger: "blur" },
        ],
      },
      productInfo: {
        name: 'Lenovo V330-14ARR 14" Laptop Ryzen 5 2500U 8GB 256GB W10P',
        sku: 'AC35051',
        model: 'LS24D330HSX/XY',
        rate: 4.4,
        inStock: true,
        constPrice: '$968.00',
        price: '$929.00',
        qty: 1,
        tips: 'Online Only. Ends 31/08/2020 or While Promotional Stock Lasts'
      },
      activeIndex: 1,
      bigIndex: 0,
      imgsI: 0,
      tab: 0,
      pImgs: [
        {
          name: "Samsung SD300 24&quot; Full HD 1ms LED Monitor(LS24D330HSX/XY) - 0",
          url: "https://cdn.mwave.com.au/images/midimage/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051.jpg",
          href: "https://cdn.mwave.com.au/images/400/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051.jpg",
        },
        {
          name: "Samsung SD300 24&quot; Full HD 1ms LED Monitor(LS24D330HSX/XY) - 1",
          url: "https://cdn.mwave.com.au/images/midimage/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_1.jpg",
          href: "https://cdn.mwave.com.au/images/400/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_1.jpg",
        },
        {
          name: "Samsung SD300 24&quot; Full HD 1ms LED Monitor(LS24D330HSX/XY) - 2",
          url: "https://cdn.mwave.com.au/images/midimage/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_2.jpg",
          href: "https://cdn.mwave.com.au/images/400/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_2.jpg",
        },
        {
          name: "Samsung SD300 24&quot; Full HD 1ms LED Monitor(LS24D330HSX/XY) - 3",
          url: "https://cdn.mwave.com.au/images/midimage/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_3.jpg",
          href: "https://cdn.mwave.com.au/images/400/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_3.jpg",
        },
        {
          name: "Samsung SD300 24&quot; Full HD 1ms LED Monitor(LS24D330HSX/XY) - 4",
          url: "https://cdn.mwave.com.au/images/midimage/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_4.jpg",
          href: "https://cdn.mwave.com.au/images/400/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_4.jpg",
        },
      ],
      activeImgs: [
        {
          name: "Samsung SD300 24&quot; Full HD 1ms LED Monitor(LS24D330HSX/XY) - 0",
          url: "https://cdn.mwave.com.au/images/65/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051.jpg",
        },
        {
          name: "Samsung SD300 24&quot; Full HD 1ms LED Monitor(LS24D330HSX/XY) - 1",
          url: "https://cdn.mwave.com.au/images/65/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_1.jpg",
        },
        {
          name: "Samsung SD300 24&quot; Full HD 1ms LED Monitor(LS24D330HSX/XY) - 2",
          url: "https://cdn.mwave.com.au/images/65/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_2.jpg",
        },
        {
          name: "Samsung SD300 24&quot; Full HD 1ms LED Monitor(LS24D330HSX/XY) - 3",
          url: "https://cdn.mwave.com.au/images/65/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_3.jpg",
        },
        {
          name: "Samsung SD300 24&quot; Full HD 1ms LED Monitor(LS24D330HSX/XY) - 4",
          url: "https://cdn.mwave.com.au/images/65/samsung_sd300_24_full_hd_1ms_gaming_monitor_ac35051_4.jpg",
        }
      ],
      cusBoughtS: [
        {
          id: 1,
          img: "https://cdn.mwave.com.au/images/150/mwave_custom_pc_assembly_and_testing_service_ab47402_7.jpg",
          name: "Mwave Custom PC Assembly and Testing Service",
          price: "199.00",
          stars: "",
        },
        {
          id: 2,
          img: "https://cdn.mwave.com.au/images/150/AB64973.jpg",
          name: "Windows 10 Home 64-bit OEM DVD",
          price: "173.00",
          stars: "",
        },
        {
          id: 3,
          img: "https://cdn.mwave.com.au/images/150/AC20161_1.jpg",
          name: 'Seagate ST2000DM008 2TB BarraCuda 3.5" 7200RPM SATA3 Desktop Hard Drive',
          price: "299.00",
          stars: "4.5/5",
        },
        {
          id: 4,
          img: "https://cdn.mwave.com.au/images/150/AC24743_1.jpg",
          name: "AMD Ryzen 5 3600 6 Core Socket AM4 3.6GHz CPU Processor + Wraith Stealth Cooler",
          price: "103.00",
          stars: "",
        },
        {
          id: 5,
          img: "https://cdn.mwave.com.au/images/150/AB82054_4.jpg",
          name: "Deepcool RGB 350 Colour LED Strip Magnetic Lighting Kit With Remote",
          price: "22.00",
          stars: "4.2/5",
        },
      ],
      cusViewedS: [
        {
          id: 1,
          img: "https://cdn.mwave.com.au/images/150/amd_ryzen_7_3800xt_8_core_socket_am4_390ghz_unlocked_cpu_processor_ac35859_3.jpg",
          name: "AMD Ryzen 7 3800XT 8 Core Socket AM4 3.90GHz Unlocked CPU Processor",
          price: "665.00",
          stars: "4.1/5",
        },
        {
          id: 2,
          img: "https://cdn.mwave.com.au/images/150/AC12828.jpg",
          name: "AMD Ryzen 5 2600 6 Core Socket AM4 3.4GHz CPU Processor + Wraith Stealth Cooler",
          price: "219.00",
          stars: "4.7/5",
        },
        {
          id: 3,
          img: "https://cdn.mwave.com.au/images/150/AC24743_1.jpg",
          name: "AMD Ryzen 5 3600 6 Core Socket AM4 3.6GHz CPU Processor + Wraith Stealth Cooler",
          price: "299.00",
          stars: "",
        },
        {
          id: 4,
          img: "https://cdn.mwave.com.au/images/150/AC24747_2.jpg",
          name: "AMD Ryzen 9 3900X 12 Core Socket AM4 3.8GHz CPU Processor + Wraith Prism Cooler",
          price: "829.00",
          stars: "4.4/5",
        },
        {
          id: 5,
          img: "https://cdn.mwave.com.au/images/150/amd_ryzen_9_3950x_16core_am4_350_ghz_unlocked_cpu_processor_ac29613.jpg",
          name: "AMD Ryzen 9 3950X 16-Core AM4 3.50 GHz Unlocked CPU Processor",
          price: "1229.00",
          stars: "4.6/5",
        },
      ],
      tabItem: [
        { id: 1, name: "Overview" },
        { id: 2, name: "Specifications" },
        { id: 3, name: "Reviews" },
      ],
      tabMain: [
        {
          id: 1,
          type: 'Overview',
          detail:
            [
              {
                id: 11,
                sku: "AC11457",
                model: "MZ-76E500BW",
                description: 'Lenovo ThinkVision P32u-10 32" 4K UHD Professional IPS Monitor - Panel Type: IPS - Native Resolution: 4K UHD (3840x2160) - Response Time: 4ms GtG (Extreme), 6ms GtG (Normal) - Contrast Ratio: 1000:1 - Colour Depth: 10-bit - Colour Gamut: 99.5% Adobe RGB, sRGB 100% - I/O: DisplayPort 1.2, 2x HDMI 2.0, Thunderbolt 3 In/Out, 3.5mm Audio-Out, 6x USB 3.0 - VESA: 100mmx100mm - Adjustability: Lift, Pivot, Swivel, Tilt - 61C1RAR2AU - 3 Years Limited Warranty',
                ManufacturerWarranty: '3 Years Limited Warranty',
                ManufacturerContactInfo: 'http://www.amd.com, 02 8877 7222',
                Rating: '4.8 stars - 10 reviews',
                parameter:
                  [
                    '· 32-inch 4K UHD (3840 x 2160) IPS Display',
                    '· Thunderbolt 3 Titan Ridge technology delivers lightning-fast one cable connection for power, data, video and audio',
                    '· 10-bit colour depth offers over 1 billion colours with the 99.5% Adobe RGB colour gamut',
                    '· Capable of daisy chaining two 4K monitors for smooth multitasking and an unmatched viewing experience',
                    '· Position the monitor in any way that suits your working style or posture with lift, tilt, pivot, and swivel'
                  ],
                title: 'The 32” Lenovo ThinkVision P32u-10 4K display makes your creative ideas come to life. With industry 1st Thunderbolt 3 Titan Ridge technology (universal certified), P32u-10 delivers lightning-fast one cable connection for power, data, video and audio. At the same time, you can truly boost productivity and enjoy a stunning visual experience by connecting dual 4K monitors via Thunderbolt 3 out! What’s more, Adobe RGB and multiple colour spaces ensure accurate colours for creativity.',
                img: 'https://www.mwave.com.au/images/400/lenovo_thinkvision_p32u10_32_4k_uhd_professional_ips_monitor_ac35904_3.jpg'

              }
            ],
        },
        {
          id: 2,
          type: 'Specifications',
          detail:
            [
              {
                id: 22,
                sku: "AC11457",
                model: "MZ-76E500BW",
                details: [
                  { name: 'Brand', substance: 'Lenovo' },
                  { name: 'Aspect Ratio', substance: '16:9' },
                  { name: 'Refresh Rate', substance: '60Hz' },
                  { name: 'Brightness', substance: '300 cd/m2' },
                  { name: 'Contrast Ratio', substance: '1000:1' },
                  { name: 'Colour Depth', substance: '10-bit' },
                  { name: 'Response Time', substance: 'Under 5ms' },
                  { name: 'Curved', substance: 'No' },
                  { name: 'Adaptive Sync Technology', substance: 'N/A' },
                  { name: 'VESA Mount Compatible', substance: 'Yes' },
                  { name: 'Stand Feature', substance: 'Height Adjustable' },
                  { name: 'Stand Feature', substance: 'Pivot Adjustable' },
                  { name: 'Stand Feature', substance: 'Swivel Adjustable' },
                  { name: 'Stand Feature', substance: 'Tilt Adjustable' },
                  { name: 'Recommended For', substance: 'Multimedia' },
                ]
              }
            ],
        },
        {
          id: 3,
          type: "Reviews",
          detail:
            [
              { id: 33 }
            ],
        },
      ],
    };
  },
  watch: {
    imgsI(newVal) {
      this.bigIndex = newVal;
      this.activeIndex = newVal + 1;
    },
    bigIndex(newVal) {
      this.activeIndex = newVal + 1;
    }
  },
  head: {
    titleTemplate: 'product',
    meta: [
      { charset: 'utf-8' },
      { name: "author", content: "Mwave.com.au" },
      { name: "google", content: "notranslate" },
      { hid: 'description', name: 'description', content: 'Buy Samsung 860 Evo 500GB 2.5" SATA III 6GB/s V-NAND SSD MZ-76E500BW - MZ-76E500BW online with fast shipping and top-rated customer service. Mwave.com.au' }
    ]
  },
  computed: {
    thumbnailWidth() {
      return { width: this.activeImgs.length * 71 + "px", left: this.left == 0 ? this.left + "px" : "-" + this.left + "px" };
    },
    hidePrev() {
      return { display: this.activeIndex == 1 ? 'none' : ' block' };
    },
    hideNext() {
      return { display: this.activeIndex == this.pImgs.length ? 'none' : ' block' };
    }
  },
  methods: {
    onShowBig() {
      this.isShowBig = true;
      // this.bigIndex = this.imgsI;
      // this.$nextTick(function(){
      //   let width = this.$refs.bigImage.width;
      //   if(width<0){
      //     this.isLoading = true;
      //   }else{
      //     this.isLoading = false;
      //   }
      // })
      let self = this;
      setTimeout(function(){
        self.isLoading = false;
        self.bigIndex = self.imgsI;
      },1000)
    },
    onPrevImg() {
      this.bigIndex--;
    },
    onNextImg() {
      this.bigIndex++;
    },
    thumbnailPrev() {
      if (this.left == 0) {
        return false;
      }
      let allWidth = this.activeImgs.length * 71;
      let outerWidth = 71 * 4;
      if (this.left <= outerWidth) {
        this.left = 0;
        this.nextCount = 0;
        this.nextDisabled = false;
      } else {
        this.nextCount--;
        let count = parseInt(this.left / outerWidth);
        let counts = this.left % outerWidth;
        this.left = this.left - outerWidth;
        this.nextDisabled = false;
      }
    },
    thumbnailNext() {
      if (this.activeImgs.length < 5 || this.nextDisabled) {
        return false;
      }
      let allWidth = this.activeImgs.length * 71;
      let outerWidth = 71 * 4;
      if (allWidth - outerWidth > outerWidth) {
        this.nextCount++;
        let count = parseInt(allWidth / outerWidth);
        let counts = allWidth % outerWidth;
        if (this.nextCount < count) {
          this.left = outerWidth * this.nextCount;
        } else {
          this.left = outerWidth * (count - 1) + counts;
          this.nextDisabled = true;
        }
      } else {
        this.left = allWidth - outerWidth;
        this.nextDisabled = true;
      }
    },
    clickActive(i) {
      this.tab = i;
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.font-bold {
  font-weight: bold;
}
.font-green {
  color: #5eb549;
}
.font-red {
  color: #ed1c24;
}
a {
  text-decoration: none;
}

ul li {
  list-style: none;
}

.alert-status {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 5px 0;
  padding: 0 5px;
  background-color: #f2b71d;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
.alert-status a {
  color: #000;
}
.breadcrumb {
  padding: 2px 0 15px;
  color: #898989;
}
.breadcrumb a {
  color: #898989;
  text-decoration: underline;
  cursor: pointer;
}
.breadcrumb a:hover {
  text-decoration: unset;
}

.product-img-box {
  position: relative;
  width: 322px;
  height: 269px;
  border: 1px solid #ccc;
}
.free-img {
  position: absolute;
  top: 15px;
  right: 18px;
}
.product-img {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.productActive {
  display: block;
}
.thumbnail {
  position: relative;
  width: 322px;
  height: 67px;
  margin: 4px auto;
  overflow: hidden;
}
.thumbnail-button {
  position: absolute;
  width: 15px;
  height: 67px;
  border: 1px solid #c7cacd;
  background-image: url("../../assets/images/icon-arrow.gif");
  background-repeat: no-repeat;
  cursor: pointer;
}
.prev-btn {
  left: 0;
  background-position: 0 50%;
}
.prev-btn.disabled {
  background-color: #f3f3f3;
  background-position: -13px 50%;
  cursor: no-drop;
}
.next-btn {
  right: 0px;
  background-position: 100% 50%;
}
.next-btn.disabled {
  background-color: #f3f3f3;
  background-position: -26px 50%;
  cursor: no-drop;
}
.thumbnail-box {
  position: absolute;
  left: 19px;
  width: 284px;
  height: 67px;
  margin: 0 auto;
  overflow: hidden;
}
.thumbnail ul {
  position: absolute;
  height: 67px;
  transition: left 0.5s;
}
.imgs {
  float: left;
  width: 67px;
  height: 67px;
  margin-right: 4px;
  border: 1px solid #c7cacd;
  cursor: pointer;
}
.active-img {
  border-color: #ff8900;
}

.product-common {
  width: 100%;
  height: 414px;
  overflow: hidden;
}
.carousel-box {
  float: left;
  width: 322px;
  height: auto;
}
.basic-infos {
  float: left;
  width: 550px;
  height: auto;
  margin-left: 15px;
}
.basic-tips {
  padding: 5px 0;
  font-size: 14px;
}
.basic-infos-name {
  line-height: 1.1;
  font-size: 24px;
  color: #000000;
}
.basic-infos-sku {
  margin-top: 6px;
  line-height: 14px;
  font-size: 12px;
  color: #898989;
}
.rate-box {
  display: flex;
  align-items: center;
  margin-top: 7px;
}
.el-rate__icon {
  margin-right: 0;
  font-size: 22px;
}
.el-rate__text {
  font-weight: bold;
  font-size: 12px;
  color: #000000 !important;
  margin: 0 8px;
}
.rate-count {
  text-decoration: underline;
  color: #666666;
  cursor: pointer;
}
.stock-and-delivery {
  margin-top: 50px;
  font-size: 14px;
}
.stock-delivery-info {
  display: flex;
  align-items: baseline;
  font-weight: bold;
}
.sd-info-title {
  width: 105px;
}
.sd-info-detail-list {
  display: flex;
  line-height: 20px;
}
.special {
  font-size: 12px;
}
.special a {
  margin-left: 5px;
  color: #318dc9;
}

.cart-box {
  float: left;
  width: 300px;
  height: auto;
  margin-left: 40px;
}
.cart-info {
  border: 8px solid #f5f5f7;
}
.cart-up {
  width: auto;
  height: auto;
  padding: 15px;
}
.cost-price {
  font-size: 18px;
  text-decoration: line-through;
  color: #888;
}
.price {
  height: 30px;
  margin-bottom: 2px;
  line-height: 27px;
  font-size: 28px;
  font-weight: 500;
  color: #000000;
}
.buy-now {
  width: 100%;
  height: 16px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #898989;
}
.buy-now img {
  margin-left: 3px;
  vertical-align: middle;
}
.cart-down {
  width: auto;
  height: auto;
  padding: 0 12px;
  border-top: 8px solid #f5f5f7;
}
.add-carts {
  padding: 12px 0 15px 0;
  border-bottom: 1px solid #f5f5f7;
  overflow: hidden;
}
.el-form-item {
  margin-bottom: 0;
  margin-right: 0 !important;
}
.el-form-item__label {
  padding: 0;
  color: #000000;
}
.el-form-item__content {
  margin-left: 6px;
}
.el-input__inner {
  width: 40px;
  height: 30px;
  padding: 0 2px 0 2px;
  text-align: center;
  color: #555555;
  border-color: #cdcdcd;
}
.el-input__inner:focus {
  border-color: rgba(82, 168, 236, 0.8);
  outline: 0;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus {
  border-color: #953b39;
  color: #953b39;
  box-shadow: none;
}
.cart-btn {
  width: 175px;
  height: 40px;
  line-height: 40px;
  margin-left: 3px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-align: center;
  background: linear-gradient(to bottom, #fbe09e, #ffc434);
  border: 1px solid #dea007;
  border-radius: 5px;
  cursor: pointer;
}
.notify-btn {
  display: inline-block;
  width: auto;
  height: 30px;
  line-height: 30px;
  padding: 0px 14px;
  font-size: 14px;
  color: #333333;
  text-align: center;
  background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
}
.add-watch-list {
  padding: 15px 0 12px 0;
}
.watch-btn {
  width: 254px;
  height: 32px;
  line-height: 32px;
  margin: 0 auto;
  font-size: 14px;
  color: #000;
  font-weight: 600;
  text-align: center;
  background: linear-gradient(to bottom, #fff, #f5f5f7);
  border: 1px solid #cdcdcd;
  border-radius: 5px;
  cursor: pointer;
}
.special-offer-tips {
  padding: 5px 10px 0 0;
  color: red;
}

.big-show-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 9999;
}
.big-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: auto;
  height: auto;
}
.big-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  padding: 10px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 5px;
  user-select: none;
}
.big-image img {
  width: 100%;
  height: 100%;
}
.big-image .loading-image{
  width: 150px;
  height: 150px;
}
.big-image.show-image {
  animation: myShow 0.7s forwards;
}
@keyframes myShow {
  from {
    width: 300px;
    height: 300px;
  }
  to {
    width: 820px;
    height: 820px;
  }
}
.big-prev,
.big-next {
  position: absolute;
  top: 0;
  width: 40%;
  height: 100%;
}
.big-prev {
  float: left;
  left: 0;
}
.big-prev:hover {
  background: url("../../assets/images/prev.png") left center no-repeat;
}
.big-next {
  float: right;
  right: 0;
}
.big-next:hover {
  background: url("../../assets/images/next.png") right center no-repeat;
}
.big-info {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding: 0 10px;
  color: #bbbbbb;
}
.big-close {
  cursor: pointer;
}
</style>
<style>
.gallery {
  height: 454px;
}
.sli {
  width: 100%;
  height: auto;
}
.cus-bought,
.cus-viewed {
  margin-top: 30px;
}
.cus-title {
  font-size: 21px;
  font-weight: bold;
  margin-bottom: 20px;
  width: 100%;
}
.cus-content {
  width: 100%;
  overflow: hidden;
}
.cus-content li {
  width: 245px;
  height: 325px;
  margin: 0;
  padding: 10px 3px 0 12px;
  float: left;
  border: none;
  display: list-item;
}
.cus-con-img {
  position: relative;
  height: 160px;
  overflow: hidden;
  text-align: center;
}
.cus-con-img img {
  max-height: 160px;
  max-width: 160px;
  overflow: hidden;
}
.cus-con-name {
  height: 60px;
  line-height: 20px;
  overflow: hidden;
}
.cus-con-stars {
  height: 13px;
  margin-top: 5px;
}
.cus-con-price {
  width: 100%;
  color: black;
  float: left;
  padding-right: 5px;
  font-size: 22px;
  text-align: left;
  font-weight: normal;
}
.product-details {
  margin-top: 20px;
}
.details-tab {
  height: 35px;
  border-bottom: 3px solid #443266;
}
.detail-icon {
  float: right;
  margin-right: 14px;
}
.detail-icon .print-icon {
  display: block;
  width: 27px;
  height: 25px;
  background: url("../../assets/images/icon-print.gif") no-repeat;
  cursor: pointer;
}
.details-main {
  padding-top: 15px;
  overflow: hidden;
}
.details-tab ul {
  padding-left: 10px;
}
.details-tab ul li {
  margin-right: 3px;
  float: left;
  background: url("../../assets/images/tab-bg.gif") 0 -128px repeat-x;
}
.details-tab ul li.on {
  background-position: 0 -32px;
}
.details-tab ul li.on a {
  background-position: 0 0;
  color: #fff;
  font-weight: 700;
}
.details-tab ul li.on a span {
  background-position: 100% -64px;
}
.details-tab ul li a {
  display: block;
  float: left;
  background: url("../../assets/images/tab-bg.gif") 0 -96px no-repeat;
  color: #000;
  text-decoration: none;
}
.details-tab ul li a span {
  display: block;
  float: left;
  height: 32px;
  padding: 5px 20px 0;
  line-height: 27px;
  background: url("../../assets/images/tab-bg.gif") 100% -160px no-repeat;
  cursor: pointer;
}
.detail-main {
  padding-top: 15px;
  overflow: hidden;
}
.tab-detail-top {
  padding-bottom: 12px;
  border-bottom: 4px solid #e3e6e9;
}
.tab-detail-con {
  font-size: 12px;
  font-weight: bold;
  padding: 12px 0 22px 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #e3e6e9;
}
.tab-detail-con h2 {
  font-size: 12px;
  font-weight: bold;
}
.tab-detail-con span {
  color: #ff7701;
}
.tab-detail-con div {
  line-height: 20px;
}
.tab-detail-con .rating {
  margin-top: 5px;
  color: #000;
  font-weight: normal;
}
.tab-detail-main ul li {
  font-weight: bold;
  line-height: 20px;
}
.tab-detail-main-title {
  margin: 12px 0 32px 0;
  font-family: verdana, geneva, sans-serif;
  font-size: 14px;
  line-height: 20px;
}
.tab-detail-main-img {
  text-align: center;
}
.tab-detail-main-img img {
  margin: 12px 0;
}
.tab-specifications-main {
  padding: 12px 0;
}
.specifications-table {
  margin-bottom: 32px;
}

.specifications-table td {
  border: 1px solid #cecece;
  border-collapse: collapse;
  padding: 5px 12px;
  text-align: left;
  line-height: 20px;
}
.tab-reviews-main {
  border-top: 3px solid #443266;
  padding: 24px 0 36px 0;
}
.tab-reviews {
  padding-top: 0px;
  border: none;
}
</style>
