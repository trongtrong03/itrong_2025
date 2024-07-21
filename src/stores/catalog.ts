import { defineStore } from 'pinia';

export interface CatalogItem {
    id: number;
    title: string;
}

export const useCatalogStore = defineStore("catalog", {
    state: () => ({
        items: [] as CatalogItem[],
    }),
    actions: {
        addItem(item: CatalogItem) {
            this.items.push(item);
        },
        removeItem(itemId: number) {
            this.items = this.items.filter(item => item.id !== itemId);
        }
    },
    getters: {
        getItemById: (state) => {
            return (id: number) => state.items.find(item => item.id === id);
        }
    }
});