"use strict";
/* eslint-disable no-underscore-dangle*/

if (!window.WendigoVuePlugin) {
    window.WendigoVuePlugin = {
        vue: null,

        // Based on https://github.com/vuejs/vue-devtools
        detectVue() {
            let vue = this._detectFromElements();
            if (!vue) vue = this._detectFromNuxt();
            this.vue = vue;
            return Boolean(vue);
        },

        getStore() {

        },

        _detectFromNuxt() {
            if (window.$nuxt && window.$nuxt.$root) {
                return window.$nuxt.$root;
            }
        },
        _detectFromElements() {
            const all = document.querySelectorAll('*');
            for (let i = 0; i < all.length; i++) {
                if (all[i].__vue__) {
                    return all[i].__vue__.$root;
                }
            }
        }
    };
}
/* eslint-enable no-underscore-dangle*/
