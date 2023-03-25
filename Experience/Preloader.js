import { EventEmitter } from "events"
import Experience from "./Experience.js"
import GSAP from "gsap";

export default class Preloader extends EventEmitter{
    constructor(){
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;
        
        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            //this.playIntro();
        });

    }

    setAssets()
    {
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    firstIntro()
    {
        return new Promise((resolve) => {

            this.timeline = new GSAP.timeline();

            if(this.device === "desktop")
            {
                this.timeline.to(this.roomChildren.cubo.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve,
                });
            }
            else
            {
                this.timeline.to(this.roomChildren.cubo.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,
                    onComplete: resolve,
                }); 
            }
        });
    }

    secondIntro()
    {
        return new Promise((resolve) => {

            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline.to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            }, "same").to(this.roomChildren.cubo.rotation, {
                y: 2 * Math.PI + Math.PI / 4,
            }, "same").to(this.roomChildren.cubo.scale, {
                x: 10,
                y: 10,
                z: 10,
            }, "same").to(this.camera.ortographicCamera.position, {
                y: 3.5,
            }, "same").to(this.roomChildren.cubo.position, {
                x: 0,
                y: 9,
                z: 0.598722,
            }, "same").set(this.roomChildren.body.scale, {
                x: 1,
                y: 1,
                z: 0.528,
            }).to(this.roomChildren.cubo.scale, {
                x: 0,
                y: 0,
                z: 0,
            }).to(this.roomChildren.table.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.flooritems.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.computer.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.otherstwo.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.chair.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.shelfs.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.tableitems.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.others.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
                onComplete: resolve,
            }) 
        });
        
    }

    onScroll(e)
    {
        if(e.deltaY > 0)
        {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e)
    {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e)
    {
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        
        console.log(difference);
        if(difference > 0)
        {
            this.removeEventListeners();
            this.playSecondIntro();
        }

        this.initalY = null;
    }

    removeEventListeners()
    {
        console.log("removing listeners");
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
        console.log("listeners removed");
    }

    async playIntro()
    {
        await this.firstIntro(); 
        //this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);

        this.playSecondIntro();
       
    }

    async playSecondIntro()
    {
        await this.secondIntro();
        //window.addEventListener("wheel", this.scrollOnceEvent);
        console.log("fi segona intro");
        document.querySelector(".page").style.overflow = "none";
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);

        this.emit("preloader-end");
    }

}