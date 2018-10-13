"use strict";

const Vuex = require('vuex');

module.exports = new Vuex.Store({
    state: {
        uid: null,
        data: null,
        password: null
    },
    getters: {
        getUser(state) {
            return {
                uid: state.uid,
                data: state.data
            }
        }
    },
    mutations: {
        user(state, data) {
            state.uid = data.uid;
            state.data = data;
        },
        userPassword(state, password) {
            state.password = password;
        }
    },
    actions: {

    }
});
