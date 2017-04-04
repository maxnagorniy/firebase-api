<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .block{
    margin: 10px 0;
    display: flex;
  }

  .block-product{
    border: 2px solid #e6ebe5;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 0 15px 0 rgba(153,153,153,1);
  }

  .block-product-img img{
    width: 100%;
    min-width: 125px;
    height: auto;
    display: block;
    border: 2px solid #e2e7e1;
  }

  .block-product-title{
    padding: 20px 0;
  }

  .block-product-description{
    text-align: left;
  }

  .link{
    background: #aeebec;
    width: 50%;
    border-radius: 5px;
    padding: 8px;
    color: #2c3e50;
    border: 2px solid #628baa;
  }

  .block-product-more{
    text-align: left;
  }

  .link:hover{
    background: #94c8c9;
    transition: 0.5s;
  }

  .block-product-more a{
    text-decoration: none;
  }
</style>

<template>
  <div id="catalog" class="container">
    <div class="row">
        <div class="block col-12 col-sm-6 col-lg-4" v-for="(catalog, index) in catalogs">
          <div class="block-product">
            <div class="block-product-img">
              <img :src="catalog.image" alt="">
            </div>
            <div class="block-product-title">
              <h3>{{ catalog.title }}</h3>
            </div>
            <div class="block-product-description" >
              <p>{{ catalog.body | reverse }}</p>
            </div>
            <div class="block-product-more">
              <router-link class="link" :to="{ name: 'product', params: {key: catalog['.key']} }">See More</router-link>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue'
    import { database } from '../firebase.js'

    Vue.filter('reverse', function (value) {
        return value ? value.split('').slice(0, 120).join('') + ' ...' : ''
    });

    export default {
        name: 'catalog',
        firebase: {
            catalogs: database.ref('catalogs')
        },
        data() {
          return {}
        },
        methods: {}
    }

</script>
