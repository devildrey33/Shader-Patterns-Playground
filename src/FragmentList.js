import Main from "./Main.js"
import Fragment01 from './shaders/01-uv-black-white.glsl'
import Fragment02 from './shaders/02-uv-color.glsl'

export default class FragmentList {
    constructor() {
        // Get the main singleton
        this.main   = new Main();
        this.editor = this.main.editor;

        // Get the html select tag 
        this.select = document.getElementById("shaders");

        this.list = [ 
            { name : "01-uv-black-white", code : Fragment01 },
            { name : "02-uv-color"      , code : Fragment02 }
        ];

        this.select.addEventListener('change', (event) => {
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].name === event.target.value) {
                    this.main.editor.setCode(this.list[i].code);
                    break;
                }
            }            
        });

        this.generateSelect();
    }

    getByPos(pos = 0) {
        return this.list[pos].code;
    }

    generateSelect() {
        let innerHtml = "";
        for (let i = 0; i < this.list.length; i++) {
            innerHtml = innerHtml + "<option value=" + this.list[i].name + ">" + this.list[i].name + "</option>";
        }

        this.select.innerHTML = innerHtml;
    }
}