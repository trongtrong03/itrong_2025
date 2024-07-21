/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_MTLIST_JSON_PATH: string;
    VITE_MTROUTES_JSON_PATH: string;
    VITE_MTLINKS_JSON_PATH: string;
    VITE_MTLOGS_JSON_PATH: string;
    VITE_MTGALLERY_JSON_PATH: string;
    VITE_LEARN_JSON_PATH: string;
    VITE_RESOURCES_JSON_PATH: string;
    VITE_WORKS_JSON_PATH: string;
    VITE_WORKSHOP_JSON_PATH: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}