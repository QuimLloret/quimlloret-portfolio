import * as THREE from "three"
import Experience from "./Experience.js";
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.createPerspectiveCamera();
        this.createOrtographicCamera();
        this.setOrbitcontrols();

    }

    createPerspectiveCamera()
    {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = 29;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 12;
    }

    createOrtographicCamera()
    {
        this.ortographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -50,
            50
        );

        // originalment era y: 3.5
        this.ortographicCamera.position.y = 2.5;
        this.ortographicCamera.position.z = 5;
        this.ortographicCamera.rotation.x = -Math.PI / 6;

        this.scene.add(this.ortographicCamera);

        //this.helper = new THREE.CameraHelper(this.ortographicCamera);
        //this.scene.add(this.helper);

        const size = 20;
        const divisions = 20;

        //const gridHelper = new THREE.GridHelper( size, divisions );
        //this.scene.add( gridHelper );

        const axesHelper = new THREE.AxesHelper( 10);
        //this.scene.add( axesHelper );
    }

    setOrbitcontrols()
    {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    resize()
    {
        // Update perspective camera 
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        // Update ortographic camera 
        this.ortographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.ortographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.ortographicCamera.top = this.sizes.frustrum / 2;
        this.ortographicCamera.bottom = -this.sizes.frustrum / 2;
        this.ortographicCamera.updateProjectionMatrix();
    }

    update()
    {
        //console.log(this.perspectiveCamera.position);
        this.controls.update();

        //this.helper.matrixWorldNeedsUpdate = true;
        //this.helper.update();
        //this.helper.position.copy(this.ortographicCamera.position);
        //this.helper.rotation.copy(this.ortographicCamera.rotation);
        
    }
}