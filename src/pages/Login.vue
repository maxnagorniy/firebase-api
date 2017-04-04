<template>


    <div class="container" style="padding-top: 50px">
        <div class="row">
            <div class="offset-2 col-8">

                <form :class="{'errors': hasErrors}">

                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" v-model.trim="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" v-model.trim="password" id="exampleInputPassword1" placeholder="Password">
                    </div>


                    <div class="product-buy">
                        <button type="submit" class="btn btn-primary "  @click.prevent="login">Login</button>
                    </div>

                    <div class="error" v-if="hasErrors" style="color: red">
                        <p v-for="error in errors">{{ error }}</p>
                    </div>

                </form>
                <div class="link-login">
                    You not login? <router-link to="/register">Register</router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import Vue from 'vue'

    import { database, auth } from '../firebase.js'

    export default{
        name: 'login',
        data(){
            return{
                email: '',
                password: '',
                errors: [],

            }
        },
        computed: {
            hasErrors (){
                return this.errors.length > 0;
            }
        },
        methods: {
            login(){

                this.errors = [];
                console.log("hello");

                if(this.isFormValid()){


                    auth.signInWithEmailAndPassword(this.email, this.password).then(user =>{

                        this.$store.dispatch('setUser', user);
                        this.$router.push('/');

                    }).catch(error => {
                        this.errors.push(error.message);
                    })
                }

            },
            isFormValid(){
                if(this.email.length > 0 && this.password.length > 0){
                    return true
                }
                return false
            }
        }
    }

</script>