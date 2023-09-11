const create_sliders_list = () => {
    //list of initial references
    const sliders = [...document.querySelectorAll(".apps .slider")].map(slider => ({
        wrapper: slider,
        slidesShow: slider.querySelector(".slider--slidesShow"),
        prevBtn: slider.querySelector(".slider--prev-btn"),
        nextBtn: slider.querySelector(".slider--next-btn"),
    }))
    return sliders;
}
const get_slider_sizes = (slider) => {
    const width_slide = slider.slidesShow.querySelector(".slider--slide").getBoundingClientRect().width;
    const right_wrapper = slider.wrapper.getBoundingClientRect().right;
    const left_wrapper = slider.wrapper.getBoundingClientRect().left;
    const width_wrapper = slider.wrapper.getBoundingClientRect().width;
    const number_presentable_slides = (parseInt(width_wrapper / width_slide) < 1 || [...slider.wrapper.parentElement.classList].includes("apps-introduction")) ? 1 : innerWidth > 400 ? parseInt(width_wrapper / width_slide) - 2 : parseInt(width_wrapper / width_slide);
    const left_slidesShow = slider.slidesShow.offsetLeft;
    const width_slidesShow = slider.slidesShow.getBoundingClientRect().width;
    const right_slidesShow = slider.slidesShow.getBoundingClientRect().right;
    return {
        width_slide,
        right_wrapper,
        left_wrapper,
        width_wrapper,
        number_presentable_slides,
        left_slidesShow,
        width_slidesShow,
        right_slidesShow
    }
}
// keep track of user's mouse down and up
let isPressedDown = false;
// x horizontal space of cursor from slider
let cursorStartPosition;

const eventDown = (viewportClickedCoordinate,slider)=>{
    isPressedDown = true;
    const info_slider = { ...get_slider_sizes(slider) };
    cursorStartPosition = viewportClickedCoordinate - info_slider.left_wrapper - info_slider.left_slidesShow;
}
const eventMove = (viewportClickedCoordinate,slider)=>{
    if (!isPressedDown) return;
    const info_slider = { ...get_slider_sizes(slider) };
    slider.slidesShow.classList.add("scrolling");
    if (info_slider.right_wrapper - info_slider.right_slidesShow + (cursorStartPosition - (viewportClickedCoordinate - info_slider.left_wrapper - info_slider.left_slidesShow)) > 0) {
        slider.slidesShow.style.right = "0px";
        slider.nextBtn.style.display = "block";
        slider.prevBtn.style.display = "none";
    } else if ((info_slider.right_wrapper - info_slider.right_slidesShow + (cursorStartPosition - (viewportClickedCoordinate - info_slider.left_wrapper - info_slider.left_slidesShow))) < Math.round(info_slider.width_wrapper - info_slider.width_slidesShow)) {
        slider.slidesShow.style.right = `${Math.round(info_slider.width_wrapper - info_slider.width_slidesShow)}px`;
        slider.nextBtn.style.display = "none";
        slider.prevBtn.style.display = "block";
    } else {
        slider.slidesShow.style.right = `${info_slider.right_wrapper - info_slider.right_slidesShow + (cursorStartPosition - (viewportClickedCoordinate - info_slider.left_wrapper - info_slider.left_slidesShow))}px`;
        slider.nextBtn.style.display = "block";
        slider.prevBtn.style.display = "block";
    }
}
const eventUP = (slider)=>{
    isPressedDown = false;
    slider.slidesShow.classList.remove("scrolling");
}
export default function Slider() {
    const sliders_list = create_sliders_list();
    sliders_list.forEach(slider => {
        //Move the slider back with prev-btn
        slider.prevBtn.addEventListener("click", () => {
            const info_slider = { ...get_slider_sizes(slider) };
            if ((info_slider.right_slidesShow - info_slider.right_wrapper) > (info_slider.number_presentable_slides * info_slider.width_slide)) {
                slider.slidesShow.style.right = `${info_slider.right_wrapper - info_slider.right_slidesShow + (info_slider.number_presentable_slides * info_slider.width_slide)}px`;
            } else {
                slider.slidesShow.style.right = `${0}px`;
                slider.prevBtn.style.display = "none";
            }
            slider.nextBtn.style.display = "block";
        })
        //Move the slider forward with next-btn
        slider.nextBtn.addEventListener("click", () => {
            const info_slider = { ...get_slider_sizes(slider) };
            if (info_slider.left_slidesShow < 0 && Math.abs(info_slider.left_slidesShow) > info_slider.number_presentable_slides * info_slider.width_slide) {
                slider.slidesShow.style.right = `${(info_slider.right_wrapper - info_slider.right_slidesShow) - (info_slider.number_presentable_slides * info_slider.width_slide)}px`;
            } else if (info_slider.left_slidesShow < 0) {
                slider.slidesShow.style.right = `${info_slider.width_wrapper - info_slider.width_slidesShow}px`;
                slider.nextBtn.style.display = "none";
            }
            slider.prevBtn.style.display = "block";

        })
        //Move the slider with touch and mouse 
        slider.wrapper.addEventListener("mousedown",(e)=>{
            const viewportClickedCoordinate = e.clientX ;
            eventDown(viewportClickedCoordinate,slider);
        })
        slider.wrapper.addEventListener("mousemove",(e)=>{
            const viewportClickedCoordinate = e.clientX ;
            eventMove(viewportClickedCoordinate,slider);
        })
        slider.wrapper.addEventListener("mouseup",()=>{
            eventUP(slider);
        })
        slider.wrapper.addEventListener("touchstart",(e)=>{
            const viewportClickedCoordinate = e.touches[0].clientX ;
            eventDown(viewportClickedCoordinate,slider);
        })
        slider.wrapper.addEventListener("touchmove",(e)=>{
            const viewportClickedCoordinate = e.touches[0].clientX ;
            eventMove(viewportClickedCoordinate,slider);
        })
        slider.wrapper.addEventListener("touchend",()=>{
            eventUP(slider);
        })
        window.addEventListener("resize", () => {
            slider.slidesShow.style.right = "0px";
        })
    })


}