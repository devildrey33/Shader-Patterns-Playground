//import * as dat from 'lil-gui'

import Editor from "./Editor.js"
import View from "./View.js"

let mainInstance = null;

export default class Main {
    constructor() {
        if (mainInstance) {
            return mainInstance;
        }
        mainInstance = this;

        this.view   = new View();        
        this.editor = new Editor();
    }
}




// Debug
/*const gui = new dat.GUI( { width : 300, autoPlace : false })
document.getElementById("lil-gui").append(gui.domElement);


gui.add(material.uniforms.uSpeed, 'value').min(0.01).max(1).step(0.01).name("uSpeed")
gui.add(material.uniforms.uStep, 'value').min(0.01).max(0.99).step(0.01).name("uStep")
gui.add(material.uniforms.uAmplitude, 'value').min(0.5).max(50).step(0.1).name("uAmplitude")
gui.add(material.uniforms.uDepth, 'value').min(1).max(100).step(0.1).name("uDepth")
*/
