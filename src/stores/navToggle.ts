import { defineStore } from 'pinia';

export const useNavToggle = defineStore("navactive", {
  state(){
      return {
          navActive: false
      }
  }
});