import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll';

export default class Controls{
    constructor(){

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child=>{
            if(child.type == "PointLight")
            {
                this.pointLight = child;
            }
        });
        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;

        GSAP.registerPlugin(ScrollTrigger);

        //this.setSmoothScroll();
        //this.setScrollTrigger();

    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
          ease: 0.1,
          disableRaf: true });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }

    setSmoothScroll()
    {
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger()
    {
        ScrollTrigger.matchMedia({
	
            //Desktop
            "(min-width: 969px)": () => {

                this.room.scale.set(0.11,0.11,0.11);

                // First section ----------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * 0.0014;
                    }
                });

                // Second section ----------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return 1;
                    },
                    z: ()=>{
                        return this.sizes.height * 0.0032;
                    }
                    },
                    "same"
                );
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
                    },
                    "same"
                );
                this.secondMoveTimeline.to(this.camera.ortographicCamera.position, {
                    y: 0.75,
                    x: -1.5,
                    z: -3,
                    
                },"same");

                // Third section ----------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.thirdMoveTimeline.to(this.camera.ortographicCamera.position, {
                    y: 4,
                    
                }, "same");

                // Fourth section ----------------------------------------------
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.fourthMoveTimeline.to(this.camera.ortographicCamera.position, {
                    y: -2.5,
                    x: 4,
                    
                }, "same");

                // Fifth section ----------------------------------------------
                this.fifthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fifth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.fifthMoveTimeline.to(this.camera.ortographicCamera.position, {
                    y: 0,
                    x: 2,
                    z: -10,
                    
                }, "same");
                this.fifthMoveTimeline.to(this.camera.ortographicCamera.rotation, {
                    y: ()=>{
                        return -Math.PI / 4.5;
                    },
                },"same");
                this.fifthMoveTimeline.to(this.camera.ortographicCamera.rotation, {
                    x: ()=>{
                        return -Math.PI / 8;
                    },
                },"same");
                this.fifthMoveTimeline.to(this.camera.ortographicCamera.rotation, {
                    z: ()=>{
                        return -Math.PI / 12;
                    },
                },"same");
                this.fifthMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return -7;
                    },
                },"same");
                this.fifthMoveTimeline.to(this.room.scale, {
                    x: 0.8,
                    y: 0.8,
                    z: 0.8,
                    },
                    "same"
                );
                // Sixth section ----------------------------------------------
                this.sixthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".sixth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
                this.sixthMoveTimeline.to(this.room.rotation, {
                    x: ()=>{
                        return Math.PI / 4;
                    },
                },"same");
                this.sixthMoveTimeline.to(this.room.rotation, {
                    z: ()=>{
                        return Math.PI / 4;
                    },
                },"same");
                /*this.sixthMoveTimeline.to(this.room.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    },
                    "same"
                );*/
            },

            // Mobile
            "(max-width: 968px)": () => {
                console.log("fired mobile");

                // Resets
                this.room.scale.set(0.07, 0.07, 0.07);
                this.room.position.set(0,0,0);

                // First section ----------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                });

                // Second section ----------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale, {
                    x: 0.25,
                    y: 0.25,
                    z: 0.25,
                },
                "same"
                ).to(this.room.position, {
                    x: 1.5,
                },
                "same"
                );

                // Third section ----------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                });
            },
              
            "all": () => {
                // Circle animations
                // First section ----------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })

                // Second section ----------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleSecond.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })

                // Third section ----------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })
            }
              
          }); 
    }

    resize()
    {

    }

    update()
    {
        
    }
}