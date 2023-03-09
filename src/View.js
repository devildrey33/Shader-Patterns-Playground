import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import vertexShader from './shaders/vertex.glsl'
//import testFragmentShader from './shaders/test/fragment.glsl'

export default class View {
    constructor() {
        this.start();
    }

    start() {
        // Canvas
        this.canvas = document.querySelector('canvas.webgl');
        // Scene
        this.scene = new THREE.Scene();
        // Geometry
        this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
        // Material
        this.material = new THREE.ShaderMaterial({
            vertexShader    : vertexShader,
//            fragmentShader  : testFragmentShader,
            side            : THREE.DoubleSide,
            uniforms        : {
                uTime       : { value : 0.0 },
                uSpeed      : { value : 0.1 },
                uStep       : { value : 0.1 },
                uAmplitude  : { value : 10.0 },
                uDepth      : { value : 20.0 }
            }
        })    

        // Mesh
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        // Size of the view
        this.sizes = {
            width: window.innerWidth / 2,
            height: window.innerHeight
        }

        // Add a listener to the resize event to be able to update the view with a correct size
        window.addEventListener('resize', () => {
            // Update sizes
            this.sizes.width = window.innerWidth / 2;
            this.sizes.height = window.innerHeight;

            // Update camera
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();

            // Update renderer
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        })

        // Base camera
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.set(0.25, - 0.25, 1);
        this.scene.add(this.camera);

        // Orbit Controls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias : true
        })
        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setClearColor( 0x333333 );

        // Create a clock for the animations
        this.clock = new THREE.Clock();

        // Run the first tick
        this.tick();        
    }
    
        
    // Updates each frame
    tick() {
        const elapsedTime = this.clock.getElapsedTime();

        // Update material time
        this.material.uniforms.uTime.value = elapsedTime;

        // Update Orbit controls
        this.controls.update();
    
        // Render
        this.renderer.render(this.scene, this.camera);
    
        // Call tick again on the next frame
        window.requestAnimationFrame(()=> { this.tick(); });    
    }
}