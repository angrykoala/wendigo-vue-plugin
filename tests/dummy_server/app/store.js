"use strict";

const Vuex = require('vuex');

module.exports = new Vuex.Store({
    state: {
        count: 0,
        user: {
            uid: "42",
            name: "arthur"
        }
    },
    getters: {
        getCount(state) {
            return state.count;
        }
    },
    mutations: {
        addOne(state) {
            state.count += 1;
        }
    },
    actions: {
        addTwoAction(context) {
            context.commit("addOne");
            context.commit("addOne");
            return context.state.count;
        }
    }
});
