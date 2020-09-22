<template>
  <div class="container">
    <div>   
      <nuxt-link to="/products"> <button class="btn_link">product</button> </nuxt-link> 
      <h1 class="title">
        the Mwave home page
      </h1>
      <h2>  Australia's Largest Online Tech Retailer </h2>
      <template>
         <img src="~/assets/images/pic.jpg"> 
      </template>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.btn_link {
  width: 120px;
  height: 40px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  outline: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}
</style>
