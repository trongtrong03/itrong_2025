import { onMounted, onUnmounted } from "vue";

export default function (className:string){
    // body add&remove class
    onMounted(() => {
        document.body.classList.add(className);
    });

    onUnmounted(() => {
        document.body.classList.remove(className);
    });
}