import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AssetService } from './asset.service';
import { Asset } from '../models/asset';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {

  container!: HTMLElement;
  width: number = 0;
  height: number = 0;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  envLight!: THREE.HemisphereLight;
  pointLights: THREE.PointLight[] = [];
  gltfLoader!: GLTFLoader;
  objLoader!: OBJLoader;
  controls!: OrbitControls;
  model = {
    root: <any>null,
    head: {
      asset: null,
      position: {x: 0, y: 0, z: 0},
      rotation: {x: 0, y: 0, z: 0}
    }
  }
  
  constructor(
    private assetService: AssetService
  ) {}

  animate(): void {
    this.renderer.setAnimationLoop( () => {
      this.controls.update();
      this.renderer.render( this.scene, this.camera );
    }); 
  }

  loadModelIntoScene(asset: Asset, model: any) {
    switch (asset.type) {
      case "head":
        model.scale.set(0.125, 0.125, 0.125);
        model.position.set(0, 2, 0);
        this.scene.add(model);
        break;
      case "torso":
        model.position.y -= 0.15;
        model.position.z -= 0.5;
        this.scene.add(model);
        break;
      case "lArm":
        model.position.x += 0.1;
        model.position.y -= 3.25;
        model.position.z -= 0.5;
        model.scale.set(3, 3, 3);
        this.scene.add(model);
        break;
      default:
        break;
    }

  }

  loadOBJModel(asset: Asset) {
    this.objLoader.load(asset.path, (model) => {
      const obj = model;
      this.loadModelIntoScene(asset, obj);
    });
  }

  loadGLTFModel(asset: Asset) {
    this.gltfLoader.load(asset.path, (model) => {
      const obj = model.scene;
      this.loadModelIntoScene(asset, obj);
    });
  }

  loadDefaultModel() {
    const head = this.assetService.getDefaultHeadAsset();
    const torso = this.assetService.getDefaultTorsoAsset();
    const lArm = this.assetService.getDefaultLeftArm();
    const assets = [head, torso, lArm];
    assets.forEach((asset) => {
      switch (asset.file) {
        case "gltf":
          this.loadGLTFModel(asset);
          break;
        case "obj":
          this.loadOBJModel(asset);
          break;
        default:
          break;
      }
    })
  }

  setModelRoot() {
    this.model.root = new THREE.Group();
    this.scene.add(this.model.root);
  }

  setLighting(): void {
    let light = new THREE.PointLight(0xc1c1c1, 1, 100);
    let backlight = new THREE.PointLight(0xc4b0ac, 1, 100);
    light.position.set(3, 10, 10);
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.decay = 1;
    light.castShadow = true;
    backlight.position.set(0, 2, -20);
    this.envLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
    this.pointLights = [light, backlight]
    this.pointLights.forEach((light) => {
      this.scene.add(light);
    })
    this.scene.add(this.envLight);
  }

  setControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 2; 
    this.controls.maxDistance = 7;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1;
    this.controls.enablePan = false;
  }

  setLoader(): void {
    this.gltfLoader = new GLTFLoader();
    this.objLoader = new OBJLoader();
  }

  setThreeScene(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, (6/5) * (this.width / this.height), 0.001, 1000 );
    this.camera.position.z = 7;
    this.camera.position.x = -1;
    this.camera.position.y = 2;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( (6/5) * this.width, this.height );
    this.container.appendChild( this.renderer.domElement );
    this.animate();
  }

  setContainer(container: HTMLElement): void {
    this.container = container;
    this.width = container.clientWidth;
    this.height = container.clientHeight;
  }

  run(container: HTMLElement): void {
    this.setContainer(container);
    this.setThreeScene();
    this.setLoader();
    this.setControls();
    this.setLighting();
    this.setModelRoot();
    this.loadDefaultModel();
  }

}
