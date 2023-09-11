import AppsCategories from "../data/data.js";
export default function showApps(){
    AppsCategories.forEach((apps_category,index)=>{
        const app_category_section = document.createElement("section");
        app_category_section.className = "apps apps-category container box"
        app_category_section.innerHTML = `
        <h2 class="apps-category--title border-bottom d-flex justify-content-space-between fw-normal">
            <span class="apps-category--title-text fs-2">${apps_category.app_category_name}</span>
            ${apps_category.exist_more_app ? `<span class="apps-category--more-app text-gray-01 d-flex align-items-center justify-content-center gap-5 cursor-pointer fs-3">بیشتر</span>` : "" }    
        </h2>
        <div class="slider position-relative">
            <div class="slider--slidesShow p-8 position-relative">
            ${
                apps_category.apps.map(app=>(
                 `  <a href="#" class="slider--slide p-8 rounded-2">
                        <img class="slider--slide-img rounded-2"
                        src="${app.app_image}" alt="${app.app_name}" />
                        <h3 class="slider--slide-title fs-3 fw-normal text-gray-02 single-line">${app.app_name}</h3>
                        <span class="slider--app-type fs-4 single-line text-gray-02">${app.app_type}</span>
                    </a>`   
                )).join(" ")
            }
            </div>
            <button class="slider--prev-btn slider--btn d-none cursor-pointer shadow-sm position-absolute bg-white"></button>
            <button class="slider--next-btn  slider--btn  cursor-pointer shadow-sm position-absolute bg-white"></button>
        </div>`;
    if(index<=7){
        document.querySelector(".apps-introduction").before(app_category_section);
    }else{
        document.querySelector(".apps-introduction").after(app_category_section);
    }
    })
}