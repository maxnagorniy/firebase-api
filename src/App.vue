<style>
    .item-one img{
        width: 80px;
    }
    .navbar-nav{
        flex-direction: row;
        padding: 0 10%;
    }
    .item-two{
        padding: 20px 50px;
        font-size: 22px;
    }
</style>
<template>
    <div id="app" >

        <header>
            <nav class="navbar navbar-light bg-faded">
                <ul class="navbar-nav">
                    <li class="nav-item item-one">
                        <router-link class="nav-link" to="../"><img src="http://downloadicons.net/sites/default/files/my-computer-icon-81972.png" alt=""></router-link>
                    </li>
                    <li class="nav-item item-two">
                        <router-link class="nav-link" to="/register">Register</router-link>
                    </li>
                    <li class="nav-item item-two">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                </ul>
            </nav>
        </header>

        <router-view></router-view>

    </div>
</template>

<script>



    export default {
        name: 'app',
        data: function () {
            return{

            }
        },

    }


</script>