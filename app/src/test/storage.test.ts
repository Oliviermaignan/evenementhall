import { describe,it,vi,expect,beforeEach } from "vitest";
import Shape from "../components/ShapeClass";
import CanvasLocalStorage from "../adapters_out/CanvasLocalStorage";
import { CanevasIconName } from "../components/enums";

describe("CanvasLocalStorage",() => {
    // pour que ce test passe j'ai du créer un fichier vitest.config.ts
    const key = "oui!";
    it("should store the array of shapes in localStorage",() => {

        const mockCanvas = document.createElement("canvas");
        const shape: Shape = new Shape(mockCanvas,0,0,0,CanevasIconName.Chaise)
        const shapes: Shape[] = [shape,shape]

        const canvasLocalStorage = new CanvasLocalStorage(key);

        canvasLocalStorage.save(shapes);

        expect(localStorage.getItem(key)).toEqual(JSON.stringify(shapes));
    });
});
