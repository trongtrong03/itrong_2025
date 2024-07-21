import { defineStore } from 'pinia';

export const useBaseInfo = defineStore("baseinfo", {
    state(){
        return {
            WEBSITE: import.meta.env.VITE_WEB_SITE,
            NAME: 'iTrong work studio',
            SHORTNAME: 'iTrong',
            TEL: '',
            EMAIL: 'trongtrong03@gmail.com',
            ADDRESS: '',
            FACEBOOK: '',
            LINE: '',
            IG: '',
        }
    }
});