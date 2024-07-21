import { defineStore } from 'pinia';

export interface navItem {
    id: number;
    en: string;
    ch: string;
}

export interface JobItem {
    id: number;
    start: string;
    end: string;
    name: string;
    title: string;
}

export interface SkillItem {
    id: number;
    title: string;
    skills: string[];
}

export interface hkLinks {
    id: number;
    link: string;
    title: string;
}

export const useInfoStore = defineStore('infoStore', {
    state: () => ({
        NAV_LIST: [] as navItem[],
        JOB_LIST: [] as JobItem[],
        SKILL_LIST: [] as SkillItem[],
        HK_LINKS: [] as hkLinks[],
    }),
    actions: {
        loadNavs() {
            this.NAV_LIST = [
                { id: 1, en:'about', ch: '關於我' },
                { id: 2, en:'hikingbook', ch: '登山健行' },
                { id: 3, en:'learn', ch: '學習筆記' },
                { id: 4, en:'workshop', ch: '工作坊' },
                { id: 5, en:'resources', ch: '推薦資源' },
            ];
        },
        loadJobs() {
            this.JOB_LIST = [
                { id: 1, start: '2013.06', end: '2016.03', name: '里陽數位科技', title: '網頁設計師' },
                { id: 2, start: '2016.04', end: '2023.12', name: '中佑資訊', title: '網頁前端設計師' },
                { id: 3, start: '2018.04', end: '', name: 'Kiwigo 奇果，創意設計', title: '網頁前端工程師[合作接案]' },
                { id: 4, start: '2020.10', end: '', name: '山水雲林', title: '網頁前端工程師[合作接案]' },
            ];
        },
        loadSkills() {
            this.SKILL_LIST = [
                { id: 1, title: 'Programming', skills: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'jQuery', 'Vue'] },
                { id: 2, title: 'Design', skills: ['Photoshop', 'Illustrator', 'XD', 'Figma'] },
                { id: 3, title: 'Development', skills: ['Git', 'Visual Studio Code', 'Sublime Text'] },
            ];
        },
        loadHKLinks() {
            this.HK_LINKS = [
                { id: 1, link: 'mountains', title: '山岳資料' },
                { id: 2, link: 'routes', title: '路線彙整' },
                { id: 3, link: 'logs', title: '登山心得' },
                { id: 4, link: 'gallery', title: '影像故事' },
            ];
        }
    }
});
