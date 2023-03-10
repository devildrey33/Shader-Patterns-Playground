import Main from "./Main.js"
import Fragment01 from './shaders/01-uv-black-white.glsl'
import Fragment02 from './shaders/02-uv-color.glsl'
import Fragment98 from './shaders/98-flames.glsl'
import Fragment99 from './shaders/99-manga-inflames-tornado.glsl'

export default class FragmentList {
    constructor() {
        // Get the main singleton
        this.main   = new Main();
        this.editor = this.main.editor;

        // Get the html select tag 
        this.select = document.getElementById("shaders");

        this.list = [ 
            { name : "01-uv-black-white"            , code : Fragment01 },
            { name : "02-uv-color"                  , code : Fragment02 },
            { name : "98-flames"                    , code : Fragment98 },
            { name : "99-manga-inflames-tornado"    , code : Fragment99 },
        ];

        // on select change
        this.select.addEventListener('change', (event) => {
            // Loop for each shader in the list
            for (let i = 0; i < this.list.length; i++) {
                // if the shader name its the same of the event
                if (this.list[i].name === event.target.value) {
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
            if (name === this.list[i].name) return this.list[i].code;
        }

        // never shoud get here...
        return "ERROR GETING CODE";
    }

    generateSelect() {
        let innerHtml = "";
        for (let i = 0; i < this.list.length; i++) {
            innerHtml = innerHtml + "<option value=" + this.list[i].name + ">" + this.list[i].name + "</option>";
        }

        this.select.innerHTML = innerHtml;
    }
}