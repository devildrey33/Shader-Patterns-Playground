import {basicSetup} from "codemirror"
import {EditorState, Compartment} from "@codemirror/state"
import {EditorView, drawSelection, keymap, lineNumbers} from "@codemirror/view"
import {defaultKeymap, history, historyKeymap} from "@codemirror/commands"
import {syntaxHighlighting, defaultHighlightStyle} from "@codemirror/language"
import {cpp} from '@codemirror/lang-cpp'
import Main from "./Main.js"
import FragmentList from "./FragmentList.js"

//import Fragment01 from './shaders/01-uv-color.glsl'


export default class Editor {
    constructor() {
        // Link to the main object
        this.main = new Main();
        this.view = this.main.view;

        this.fragments = new FragmentList();

        this.start();
    }

    // Builds and starts the editor
    start() {

        // setup the theme
/*        this.theme = EditorView.theme({
            ".cm-content, .cm-gutter" : { "min-height" : "150px" },
            ".cm-gutters"             : { "margin"     : "1px" },
            ".cm-scroller"            : { "overflow"   : "auto" },
            ".cm-wrap"                : { "border"     : "1px solid silver" }
        }, { dark : false });*/

        // setup codemirror options
        this.language = new Compartment;

        // Setup codemirror extensions
        this.extensions = [
            keymap.of([...defaultKeymap, ...historyKeymap]),
            history(),
            drawSelection(),
            syntaxHighlighting(defaultHighlightStyle),
            lineNumbers(),
            this.language.of(cpp()),
            EditorView.updateListener.of((v , ViewUpdate) => {
                // Document changed
                if (v.docChanged) {
                    // Clear the console
                    console.clear();
                    
                    this.updateFragment();
                }
            })
        ];

        let name = "";

        // if the url contains a hash, try to open-it
        if (window.location.hash !== "") {
            name = window.location.hash.slice(1);
        }

        // if the url doesnt have a hash try to load the local storage
        if (window.location.hash === "") {            
            // Get the last shader opened
            name = window.localStorage.getItem("shaderName");
            // If no last shader opened, set the name to empty string
            if (name === null) name = "";
            // if the name its not an empty string (so its the last opened)
        }

        if (name !== "") {
            // set the HTML select value this name
            this.fragments.select.value = name;
        }

        // Create a start state 
        this.startState = EditorState.create({
            doc : this.fragments.getCode(name),
            extensions: this.extensions
        })

        
        // Start codemirror inside of #CodeMirrorDiv 
        this.editorView = new EditorView({
            state: this.startState,
            parent: document.getElementById("CodeMirrorDiv")
        })

        // Update the view material code
        this.updateFragment();
    }

    setCode(shader) {
        // Update the local storage last opened shader
        window.localStorage.setItem("shaderName", shader.name);
        // Set the new code into the editor
        this.editorView.setState(EditorState.create({ doc: shader.code, extensions: this.extensions }));
        // Compile and update the new shader
        this.updateFragment();
    }

    // Apply the updated code to the fragment shader
    updateFragment() {
        // Set time to 0
        this.view.material.uniforms.uTime.value = 0;
        // Update the fragment shader
        this.view.material.fragmentShader = this.editorView.state.doc.toString();    
        // Tell THREE.JS to update this material
        this.view.material.needsUpdate = true;
    }

}