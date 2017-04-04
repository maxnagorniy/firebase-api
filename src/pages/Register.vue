<template>
    <div class="container" style="padding-top: 50px">
        <div class="row">
            <div class="offset-2 col-8">
                <form :class="{'errors': hasErrors}">
                    <div class="form-group">
                        <label for="exampleInputName">Name</label>
                        <input type="text" class="form-control" v-model.trim="name" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter name" required>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" v-model.trim="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" v-model.trim="password" id="exampleInputPassword1" placeholder="Password" required>
                    </div>

                    <div class="form-group">
                        <label for="exampleInputPassword2">Password</label>
                        <input type="password" class="form-control" v-model.trim="password_confirmation" id="exampleInputPassword2" placeholder="Repeat Password" required>
                    </div>

                    <div class="product-buy">
                        <button type="submit" class="btn btn-primary"  @click.prevent="register">Register</button>
                    </div>

                    <div class="error" v-if="hasErrors" style="color: red">
                        <p v-for="error in errors">{{ error }}</p>
                    </div>

                </form>
                <div class="link-login">
                    You register? <router-link to="/login">Sign In</router-link>
                </div>
            </div>
        </div>
    </div>


</template>

<script>

    import Vue from 'vue'

    import { database, auth } from '../firebase.js'

    // const usersRef = database.ref('users');

    export default{
        firebase: {
            users: database.ref('users')
        },
        name: 'register',
        data (){
            return{
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                errors: []
            }
        },
        computed: {
            hasErrors (){
                return this.errors.length > 0;
            }
        },
        methods: {
            register(){
                console.log('Register');
                this.errors = [];

                if(this.isFormValid()){
                  console.log(this.email, this.password);

                    auth
                      .createUserWithEmailAndPassword(this.email, this.password)
                      .then(user => {
                          console.log('User: ' + user.email);

                          return user.updateProfile({
                              displayName: this.name,
                              photoURL: 'User:' + this.email
                            })
                            /*.then(() => {
                              return this.saveUserToUsersRef(user)
                            })*/
                            .then(() => {
                              this.$store.dispatch("setUser", user);
                              this.$router.push('/');
                            })
                        },
                        error => {
                          console.log(error);
                          this.errors.push(error.message);
                        }
                      )
                      .catch(error => {
                        console.log(error);
                        this.errors.push(error.message);
                      })
                }
            },
            /*saveUserToUsersRef(user){
                return this.usersRef
                  .child(user.uid).set({
                    name: user.displayName,
                    avatar: user.photoURL
                  })
            },*/
            isEmpty(){
                return this.name.length == 0
                  || this.email.length == 0
                  || this.password.length == 0
                  || this.password_confirmation.length == 0
            },
            passwordValid(){
                return this.password.length >= 6
                  && this.password_confirmation.length >= 6
                  && this.password === this.password_confirmation
            },
            isFormValid(){
                if(this.isEmpty()){
                    this.errors.push('Fill in all the fields');
                } else if (!this.passwordValid()){
                    this.errors.push('The password is incorrect');
                } else {
                  return true
                }
              return false
            }
        }
    }

</script>

<style>

    .link-login{
        padding: 15px 0;
    }

</style>
