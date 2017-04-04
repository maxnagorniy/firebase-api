<style>
  .product{
    padding: 30px 0;
  }
  .product-img img{
    width: 100%;
  }
  .product-title{
    padding: 20px 0;
    border-bottom: 2px solid #2c3e50;
    border-top: 2px solid #2c3e50;
    margin-top: 70px;
  }
  .product-title h2{
    margin: 0;
  }
  .product-description{
    padding: 20px 0;
    text-align: left;
  }
  .product-price{
    padding: 15px 0;
  }
  .product-price h3{
    margin: 0;
    font-weight: bold;
    color: #dd6353;
  }
  .product-price span{
    color: #2c3e50;
  }
  .product-buy button{
    background: #aeebec;
    font-size: 20px;
    padding: 5px 50px;
    color: #2c3e50;
    border: 2px solid #628baa;
    border-radius: 5px;
    cursor: pointer;
  }
  .product-buy button:hover{
    background: #94c8c9;
    transition: 0.5s;
  }

  @media (max-width: 991px) {
    .product-title{
      margin: 0;
    }
  }

  @media (max-width: 576px) {
    .product-title{
      margin-top: 20px;
    }
  }

  .form-group textarea{
    min-height: 80px;
  }

  .add-comment button{
    background: #aeebec;
    font-size: 20px;
    padding: 5px 50px;
    color: #2c3e50;
    border: 2px solid #628baa;
    border-radius: 5px;
    cursor: pointer;
  }
  .add-comment button:hover{
    background: #94c8c9;
    transition: 0.5s;
  }

  .rating-stars label:hover,
  .rating-stars label:hover ~ label {
    color: #e5b808;
  }

  .rating-stars * {
    margin: 0;
    padding: 0;
  }

  .rating-stars input {
    display: none;
  }

  .rating-stars  {
    unicode-bidi: bidi-override;
    direction: rtl;
  }

  .rating-stars label {
    color: #ccc;
  }

  .rating-stars label::before{
    content: "\2605";
    width: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 28px;
    cursor: pointer;
  }

  .rating-stars input:checked ~ label{
    color: #e5b808;
  }

  .rating-stars-disabled {
    opacity: .50;
    pointer-events: none;
  }
  #form{
    padding: 15px 0;
  }
  .comment-block{
    background: #f8f8f8;
    border: 2px solid #c1c6c0;
    border-radius: 5px;
    text-align: left;
    padding: 10px;
    margin: 3px 0;
  }
  .comment-block p{
    margin: 0;
    padding: 5px 0;
  }
</style>

<template>
  <div class="product" >
    <div class="container">
      <div class="row" v-if="product">
          <div class="col-12 col-sm-7">
            <div class="product-img">
              <img :src="product.image" alt="">
            </div>
          </div>
          <div class="col-12 col-sm-5">
            <div class="product-title">
              <h2>{{ product.title }}</h2>
            </div>
            <div class="product-price">
              <h3><span>Price: </span>{{ product.price }} $</h3>
            </div>
            <div class="product-buy">
              <button type="button">BUY</button>
            </div>
          </div>
          <div class="col-12">
            <div class="product-description">
              <p>{{ product.body }}</p>
            </div>
          </div>
      </div>
        <div class="col-12">
          <h4>Please adding your review</h4>
          <form id="form" @submit.prevent="addReview">
            <div class="form-group col-12">
              <div class="rating-stars">
                <input type="radio" name="value" id="group-1-0" value="5" v-model="newReview.value" /><label for="group-1-0"></label>
                <input type="radio" name="value" id="group-1-3" value="4" v-model="newReview.value" /><label for="group-1-3"></label>
                <input type="radio" name="value" id="group-1-2" value="3" v-model="newReview.value" /><label for="group-1-2"></label>
                <input type="radio" name="value" id="group-1-1" value="2" v-model="newReview.value" /><label for="group-1-1"></label>
                <input type="radio" name="value" id="group-1-4" value="1" v-model="newReview.value" /><label for="group-1-4"></label>
              </div>
            </div>
            <div class="form-group col-12">
              <textarea type="text" id="newComment" name="comment" class="form-control" v-model="newReview.comment"></textarea>
            </div>
            <div class="add-comment">
              <button type="submit">Add Review</button>
            </div>
          </form>

          <div class="comment-block" v-for="review in reviews">
            <div class="comment-user">
              <p><strong>Comment:</strong></p>
              <p>{{ review.comment }}</p>
            </div>
            <div class="rating-user">
              <p><strong>Rating:</strong>   {{ review.value }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>

    import Vue from 'vue'

    import { database } from '../firebase.js'

    let reviewRef = database.ref('reviews');

    let catalogRef = database.ref('catalogs');

    export default {
        data: function () {
            return{
                product: null,
                newReview: {
                    comment: '',
                    value: ''
                }
            }
        },
        updated() {
            let product;

            if (this.$route.params.key) {
                product = this.catalogs.find(item => item['.key'] === this.$route.params.key);
            }

            if (product) {
                this.$set(this, 'product', product);
            }
        },
        firebase: {
            catalogs: catalogRef,
            reviews: reviewRef
        },
        methods:{
            addReview: function () {
                  reviewRef.push(this.newReview);
                  this.newReview.comment = '';
                  this.newReview.value = '';
            }
        }
    }
</script>

