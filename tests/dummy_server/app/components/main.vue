<template>
    <div>
        <input type="text" placeholder="enter text" v-model="value">
        <p>{{value}}</p>
    </div>
</template>

<script>
"use strict";

module.exports = {
    data() {
        return {
            value: ''
        };
    }
};
</script>
