import * as THREE from "three"

import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Resources from "./Utils/Resources.js"
import assets from "./Utils/assets.js"

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Theme from "./Theme.js";
import Preloader from "./Preloader.js";
import AudioManager from "./AudioManager.js"

import World from "./World/World.js";
import Controls from "./World/Controls.js";

export default class Experience{

    static instance;
    constructor(canvas)
    {
        if(Experience.instance)
        {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();

        this.muteButton = document.getElementById('muteButton');
        this.musicOnSound = document.getElementById('musicOn-sound');
        this.musicOfSound = document.getElementById('musicOff-sound');

        this.world.on("worldready", ()=>{
            this.controls = this.world.controls;
        });

        this.sizes.on("resize", ()=>{
            this.resize();
        });

        this.time.on("update", ()=>{
            this.update();
        });

        this.preloader.on("preloader-end", ()=>{
            this.enableControls();
        });

        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener("DOMContentLoaded", () => {
          const startButton = document.getElementById("startButton");
          const introPanel = document.getElementById("introPanel");
    
          startButton.addEventListener("click", () => {
            introPanel.style.display = "none";
            this.setMusic();
            this.playIntro();
          });
        });
      }

    setMusic()
    {
        this.resources.setMusic();
        this.sound = this.resources.sound;
        this.audiomanager = new AudioManager();

        this.audiomanager.on("mute", ()=>{
            this.mute();
        });
    }

    playIntro()
    {
        this.preloader.playIntro();
    }


    enableControls()
    {
        this.controls.setSmoothScroll();
        this.controls.setScrollTrigger();
    }

    resize()
    {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }

    update()
    {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    mute()
    {
        var volume = this.sound.getVolume();
        console.log(volume)

        if(volume > 0)
        {
            this.sound.setVolume(0);
            this.musicOfSound.play();
        }
        else
        {
            this.sound.setVolume(0.10);
            this.musicOnSound.play();
        }
    }
}