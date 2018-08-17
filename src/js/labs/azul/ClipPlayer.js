/**
 * Play listeners
 */
export default class ClipPlayer {
    constructor( clipElement ){
        this.playing = false;
        this.clip  = clipElement;
    }

    play( ){
        this.clip.play();
        this.playing = true;
    }

    pause(){
        this.clip.pause();
        this.playing = false;
    }

    toggle(){
        (this.playing ? this.pause() : this.play() );
    }
}