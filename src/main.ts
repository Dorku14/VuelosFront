import { createApp } from 'vue';
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css';
import './style.css'
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import "./helpers/veeValidate";
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from "./modules/router/buildRoute";

const pinia = createPinia()
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark'
      }
  })

createApp(App).use(vuetify).use(pinia).use(router).mount('#app')
