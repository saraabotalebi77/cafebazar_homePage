// Hide the loader after half a second has passed since the user's last typing
function debounce(){
    let timer = null;
    return ()=>{
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            document.querySelector(".show-searched-results>.loader-wrapper").style.display = "none";
        },"600")
    }
}
const clear_loader = debounce();
export default clear_loader;