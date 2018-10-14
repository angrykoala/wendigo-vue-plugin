<template>
    <div>
        <p id="count">{{value}}</p>
        <button @click="add">Add</button>
    </div>
</template>

<script>
"use strict";

module.exports = {
    computed: {
        value() {
            return this.$store.getters.getCount;
        }
    },
    methods: {
        add() {
            this.$store.commit("addOne");
        }
    }
};
</script>
