"use strict";
/* eslint-disable no-underscore-dangle*/

if (!window.WendigoVuePlugin) {
    window.WendigoVuePlugin = {
        Vue: null,

        // Based on https://github.com/vuejs/vue-devtools
        detectVue() {
            let vue = this._detectFromDevTools();
            if (!vue) vue = this._detectFromNuxt();
            if (!vue) vue = this._detectFromElements();
            this.Vue = vue;
            return Boolean(vue);
        },
        _detectFromDevTools() {
            const hook = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
            if (hook && hook.Vue) return hook.Vue;
        },
        _detectFromNuxt() {
            if (window.$nuxt && window.$nuxt.$root) {
                return window.$nuxt.$root.constructor;
            }
        },
        _detectFromElements() {
            const all = document.querySelectorAll('*');
            let el;
            for (let i = 0; i < all.length; i++) {
                if (all[i].__vue__) {
                    el = all[i];
                    break;
                }
            }
            if (el) {
                let Vue = Object.getPrototypeOf(el.__vue__).constructor;
                while (Vue.super) {
                    Vue = Vue.super;
                }
                return Vue;
            }
        }
    };
}
/* eslint-enable no-underscore-dangle*/
