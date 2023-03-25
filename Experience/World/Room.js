import * as THREE from "three"
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Room{
    constructor(){

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.time = this.experience.time;
        this.roomChildren = {};

        this.lerp = {
            current:0,
            target: 0,
            ease: 0.1,
        }
        
        this.setModel();
        this.onMouseMove();

    }

    setModel()
    {
        this.actualRoom.children.forEach(child=>{
            
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group)
            {
                child.children.forEach((groupChild)=>{

                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }

            if(child.name ==="computer")
            {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen
                });
            }

            child.scale.set(0, 0, 0);

            if(child.name === "Cubo")
            {
               //child.scale.set(1, 1, 1); 
               child.position.set(0, -1.5, 0);
               child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        this.pointLight = new THREE.PointLight(
            0xffffff,
            0,
            50
        );
        this.pointLight.position.set( -5.5, 2.5, -4 );
        this.actualRoom.add(this.pointLight);

        this.roomChildren['pointLight'] = this.pointLight;

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11,0.11,0.11);
    }

    onMouseMove()
    {
        window.addEventListener("mousemove", (e)=>{
            //console.log(e);
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }

    switchTheme(theme)
    {
        if(theme === "dark")
        {
            GSAP.to(this.pointLight, {
                intensity: 0.2,
            });
        }
        else
        {
            GSAP.to(this.pointLight, {
                intensity: 0,
            });
        }
    }

    resize()
    {

    }

    update()
    {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }
}