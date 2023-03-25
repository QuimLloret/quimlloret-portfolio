import { EventEmitter } from "events"
import Resources from "./utils/Resources.js"
import Experience from "./Experience.js"

export default class AudioManager extends EventEmitter{
    constructor(){
        super();

        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.sound = this.resources.sound;

        this.toggleAudio = document.querySelector(".mute-wrapper");

        this.setEventListeners();
    }

    setEventListeners()
    {
        this.toggleAudio.addEventListener("click", ()=>{

            if(this.sound != null)
            {
                const iconMute = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path fill="currentColor" d="M560 925v-82q90-26 145-100t55-168q0-94-55-168T560 307v-82q124 28 202 125.5T840 575q0 127-78 224.5T560 925ZM120 696V456h160l200-200v640L280 696H120Zm440 40V414q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560 736ZM400 450l-86 86H200v80h114l86 86V450ZM300 576Z"/></svg>';
                const iconUnmute = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path fill="currentColor" d="M792 1000 671 879q-25 16-53 27.5T560 925v-82q14-5 27.5-10t25.5-12L480 688v208L280 696H120V456h128L56 264l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560 307v-82q124 28 202 125.5T840 575q0 53-14.5 102T784 768ZM650 634l-90-90V414q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650 634ZM480 464 376 360l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>';

                const button = document.getElementById('muteButton');
                const isMuted = button.getAttribute('data-muted') === 'true';

                button.innerHTML = isMuted ? iconMute : iconUnmute;
                button.setAttribute('data-muted', !isMuted);

                this.emit("mute");
            }
            else
            {
                console.log("this.sound is null");
            }
        });
    }
}