import Main from "./Main.js"
import Fragment01 from './shaders/01-uv-black-white.glsl'
import Fragment02 from './shaders/02-uv-color.glsl'
import Fragment03 from './shaders/03-circle.glsl'
import Fragment96 from './shaders/96-portal.glsl'
import Fragment97 from './shaders/97-lightning.glsl'
import Fragment98 from './shaders/98-flames.glsl'
import Fragment99 from './shaders/99-manga-inflames-tornado.glsl'

export default class FragmentList {
    constructor() {
        // Get the main singleton
        this.main   = new Main();
        this.editor = this.main.editor;

        // Get the html select tag 
        this.select = document.getElementById("ShaderCombo");

        this.list = [ 
            { name : "01-uv-black-white"            , code : Fragment01 },
            { name : "02-uv-color"                  , code : Fragment02 },
            { name : "03-circle"                    , code : Fragment03 },
            { name : "96-portal"                    , code : Fragment96 },
            { name : "97-lightning"                 , code : Fragment97 },
            { name : "98-flames"                    , code : Fragment98 },
            { name : "99-manga-inflames-tornado"    , code : Fragment99 },
        ];

        // on select change
        this.select.addEventListener('change', (event) => {
            // Loop for each shader in the list
            for (let i = 0; i < this.list.length; i++) {
                // if the shader name its the same of the event
                if (this.list[i].name === event.target.value) {
                    // Get current url without tags
                    const url = window.location.href.split("#")[0];
                    // Push the new url with shader name as a tag
                    history.pushState(null, null,  url + "#" + this.list[i].name);
    
                    // Tell the editor to set this shader
                    this.main.editor.setCode(this.list[i]);
                    break;
                }
            }            
        });

        this.generateSelect();
    }

    // Returns the code of the name especified, if you dont specify a name it will return the first code in the list
    getCode(name = "") {
        // return the first code if the name is empty
        if (name === "") return this.list[0].code;

        // look for the code asociated with the name
        for (let i = 0; i < this.list.length; i++) {
            if (name === this.list[i].name) {
                return this.list[i].code;
            }
        }

        // never should get here...
        return "ERROR GETING CODE : " + name;
    }

    generateSelect() {
        let innerHtml = "";
        for (let i = 0; i < this.list.length; i++) {
            innerHtml = innerHtml + "<option value=" + this.list[i].name + ">" + this.list[i].name + "</option>";
        }

        this.select.innerHTML = innerHtml;
    }
}