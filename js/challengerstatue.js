// statue.js
import * as THREE from "../build/three.module.js";
import { GLTFLoader } from "../examples/jsm/loaders/GLTFLoader.js";
console.log("something here? yesss")

export const loadStatueModel = (scene) => {
  const loader = new GLTFLoader();

  loader.load(
    "../challenger/scene.gltf",
    (gltf) => {
      const statue = gltf.scene;

      console.log("STATUE", gltf);

      // Position the statue at the center of the floor
      statue.position.set(5, 0, -12);

      // Scale if necessary
      statue.scale.set(0.02, 0.02, 0.02);

      // Iterate through all the meshes in the statue and update their materials
      statue.traverse((child) => {
        if (child.isMesh) {
          map: child.material.map,
            // Modify child.material here to improve appearance
            (child.material.metalness = 0.2),
            (child.material.roughness = 0.2),
            // Cast shadow
            (child.castShadow = true);

          console.log("Statue Material:", child.material);
        }
      });

      // Add the statue to the scene
      scene.add(statue);
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the model.", error);
    }
  );
};