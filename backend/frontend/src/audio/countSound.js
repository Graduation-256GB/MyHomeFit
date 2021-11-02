import { Howl } from 'howler';

function countSound(src, volume = 1) {
    let sound;
    const soundInject = (src) => {
        sound = new Howl({ src });
        sound.volume(volume);
    }
    soundInject(src);
    return sound;
}

export default countSound;