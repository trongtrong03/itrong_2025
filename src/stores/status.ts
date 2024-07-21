import { defineStore } from 'pinia';

export const useStatus = defineStore("status", {
    state(){
        return {
            POPUP_OVERLAY: false
        }
    }
});