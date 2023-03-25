import { EventEmitter } from "events";
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Experience from "../Experience.js";

export default class Resources extends EventEmitter{
    constructor(assets){
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;
        this.camera = this.experience.camera.ortographicCamera;

        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.audioLoader = null;
        this.sound = null;

        this.setLoaders();
        //this.setMusic();
        this.startLoading();
    }

    setLoaders()
    {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }

    startLoading()
    {
        for(const asset of this.assets)
        {
            if(asset.type==="glbModel")
            {
                this.loaders.gltfLoader.load(asset.path, (file)=>{
                    this.singleAssetLoaded(asset, file);
                });
            }
            else if(asset.type==="videoTexture")
            {
                this.video = {};
                this.videoTexture = {};

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].muted = false;
                this.video[asset.name].playsInLine = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].play;

                this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name]);
                this.videoTexture[asset.name].flipY = false;
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].mageFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].generateMipmaps = false;
                this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

                this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
            }
        }
    }

    setMusic() {
        const listener = new THREE.AudioListener();
        this.camera.add(listener);
      
        // create a global audio source
        this.sound = new THREE.Audio(listener);
      
        // load a sound and set it as the Audio object's buffer
        this.audioLoader = new THREE.AudioLoader();
        this.audioLoader.load('audios/beyond.mp3', (buffer) => {
          this.sound.setBuffer(buffer);
          this.sound.setLoop(true);
          this.sound.setVolume(0.10);
      
          // Resume the AudioContext if it's suspended
          if (listener.context.state === 'suspended') {
            listener.context.resume().then(() => {
              this.sound.play();
            });
          } else {
            this.sound.play();
          }
        });
      }

    singleAssetLoaded(asset, file)
    {
        this.items[asset.name] = file;
        this.loaded++;

        if(this.loaded === this.queue)
        {
            this.emit("ready");
        }
    }

}