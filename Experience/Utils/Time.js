import { EventEmitter } from "events"

export default class Time extends EventEmitter{
    constructor(){
        super();

        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.update();
    }

    update()
    {
        const currenTime = Date.now();
        this.delta = currenTime - this.current;
        this.current = currenTime;
        this.elapsed = this.current - this.start;

        this.emit("update");
        window.requestAnimationFrame(() => this.update());
    }
}