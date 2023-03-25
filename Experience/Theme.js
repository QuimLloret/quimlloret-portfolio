import { EventEmitter } from "events"

export default class Theme extends EventEmitter{
    constructor(){
        super();

        this.theme = "light";

        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".toggle-circle");

        this.lightThemeSound = document.getElementById('light-theme-sound');
        this.darkThemeSound = document.getElementById('dark-theme-sound');

        this.setEventListeners();
    }

    setEventListeners()
    {
        this.toggleButton.addEventListener("click", ()=>{
            this.toggleCircle.classList.toggle("slide");

            this.theme ==="light" ? this.darkThemeSound.play() : this.lightThemeSound.play();
            this.theme = this.theme ==="light" ? "dark" : "light";
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");

            this.emit("switch", this.theme);
        });
    }
}