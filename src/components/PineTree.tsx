/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: sycoinc (https://sketchfab.com/sycoinc)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/low-poly-tree-concept-e815f8acd6d34528a82feef38d5af880
title: Low Poly Tree Concept
*/

import * as THREE from "three";
import React, {
  useRef,
  useMemo,
  useContext,
  createContext,
  RefObject,
  useEffect,
} from "react";
import { useGLTF, Merged } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { Group, Mesh, SphereBufferGeometry, Vector3 } from "three";
import { pickRandomIntFromInterval, getRandomNumber } from "../utils";
import { WORLD_SIZE } from "../Scene";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    initialShadingGroup: THREE.MeshStandardMaterial;
  };
};

const context = createContext(undefined);
// @ts-ignore
export function PineTreeInstances({ children, ...props }) {
  const { nodes } = useGLTF(
    "/models/PineTree/scene-transformed.glb"
  ) as GLTFResult;
  const instances = useMemo(
    () => ({
      Object: nodes.Object_2,
    }),
    [nodes]
  );
  return (
    <Merged meshes={instances} {...props}>
      {/*
      // @ts-ignore */}
      {(instances) => (
        <context.Provider value={instances} children={children} />
      )}
    </Merged>
  );
}

export function PineTree({
  v3,
  earthRef,
}: {
  v3: Vector3;
  earthRef?: RefObject<Mesh<SphereBufferGeometry>>;
}) {
  const instances = useContext(context);
  const groupRef = useRef<Group>();
  const scale = useMemo(() => pickRandomIntFromInterval(5, 10) * 0.00005, []);
  const rotation = useMemo(() => getRandomNumber() * 5, []);

  useEffect(() => {
    if (!earthRef?.current || !groupRef?.current) {
      return;
    }

    groupRef.current.position.setFromSphericalCoords(
      WORLD_SIZE - 0.05,
      v3.y,
      v3.x
    );
    groupRef.current.lookAt(earthRef.current.position);
  }, [earthRef, v3]);

  return (
    <group ref={groupRef}>
      <group rotation={[-(Math.PI / 2) - 0.1, 0, 0]}>
        <group scale={scale} dispose={null}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            {/*
        // @ts-ignore */}
            <instances.Object />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/PineTree/scene-transformed.glb");