import clear_loader from "./func/searched-result_clear-loader.js";
import showApps from "./func/show-apps-category.js";
import Slider from "./func/slider.js";
//initial references
const website_language_changing_menu_icon = document.querySelector(".vertical-menu-btn");
const website_language_changing_btn = document.querySelector(".website-language-changing-btn");
const responsive_menu_icon = document.querySelector(".menu-icon-btn");
const responsive_menu_content = document.querySelector(".responsive-menu--content");
const app_about_btn = document.querySelector(".app-about--content-continue-btn");
const content_homePage = document.querySelector(".content");
const search_input = document.querySelector(".search-input");

// define variables
let prev_search_input_length =0;
//Web page loading
window.addEventListener("load",()=>{
    document.querySelector("body>.loader-wrapper").style.display = "none";
    content_homePage.style.display = "block";
    showApps();
    Slider()
})
//Clicking the HTML document
document.addEventListener("click",(event)=>{
    if(!event.composedPath().includes(document.querySelector(".website-language-changing-wrapper"))){
        website_language_changing_btn.classList.remove("active");
    }
    if(!event.composedPath().includes(responsive_menu_content) && !event.composedPath().includes(responsive_menu_icon)){
        responsive_menu_icon.classList.remove("active");
        responsive_menu_content.classList.remove("active");
    }
})
//If the change website language menu icon is clicked and the box is not visible, show it
website_language_changing_menu_icon.addEventListener("click",()=>{
    website_language_changing_btn.classList.toggle("active");
})
//If the responsive menu icon is clicked and its content is not visible, show its content 
responsive_menu_icon.addEventListener("click",()=>{
    responsive_menu_icon.classList.toggle("active");
    document.querySelector(".responsive-menu--content").classList.toggle("active");
})
//If the app-content section button is clicked and its content is fully viewable, close the box and scroll to the top of the box, and if the content is not fully viewable, display it.
app_about_btn.addEventListener("click",()=>{
    const app_about = document.querySelector(".app-about");
    app_about.classList.toggle("active");
    app_about.style.height = `${app_about.scrollHeight}px`;
    if(![...app_about.classList].includes("active")){
        scrollTo(0,app_about.offsetTop-86);
        app_about.style.height = "300px";
    }
})
//Change the innerHTML of show-searched-results--searched-value element and hide the show-searched-results element if the length of input value is zero and clear loader  
search_input.addEventListener("keyup",(event)=>{
    document.querySelector(".show-searched-results--searched-value").innerHTML = event.target.value;
    if(event.target.value.length==0){
        document.querySelector(".show-searched-results").style.display = "none";
    }else{
        document.querySelector(".show-searched-results").style.display = "flex";
    }
    if(event.target.value.length - prev_search_input_length>=1 || event.target.value.length - prev_search_input_length<=-1){
        document.querySelector(".show-searched-results>.loader-wrapper").style.display = "flex";
    }
    prev_search_input_length = event.target.value.length;
    clear_loader();
})
//Display the loader
search_input.addEventListener("keydown",(event)=>{
    if(event.target.value.length - prev_search_input_length<0){
        document.querySelector(".show-searched-results>.loader-wrapper").style.display = "flex";
    }
})
//ّIf the length of search input isn't zero , Display the searched results 
search_input.addEventListener("focus",(event)=>{
    if(event.target.value.length !==0){
        document.querySelector(".show-searched-results").style.display = "flex";
    }
})
//Don't show the search results box if any element is clicked except the search form box
search_input.addEventListener("blur",(event)=>{
    document.querySelector(".show-searched-results").style.display = "none";

})