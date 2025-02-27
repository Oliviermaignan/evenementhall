import Shape from '../components/ShapeClass'; 
// interface a def [TODO]
// export interface ShapesConfig {
//   name: string
//   id: number
//   x: number
//   y: number
//   angle: number
//   icon: string
// }



export abstract class CanvasStorage {
    abstract save(storageKey: number, data: Shape[]): void;
    abstract load(): string | null;
  }
  