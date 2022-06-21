import { axios } from "../request";

window.addEventListener('load', ()=>{
    document.getElementById("login-form").addEventListener("submit", (e) => {
        e.preventDefault();
        axios.get("/sanctum/csrf-cookie").then((response) => {
            e.target.submit();
        });
    })
})