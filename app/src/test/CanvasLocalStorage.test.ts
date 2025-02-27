import { describe, it, expect } from "vitest";
import CanvasLocalStorage from "../adapters_out/CanvasLocalStorage";

describe("Chargement des datas pour un canvas", () => {
    const storageKey = 'test'
    const mockData = [{"id":0,"canvas":{},"x":0,"y":0,"isDragging":false,"angle":0,"selected":false,"icon":"Ellipse.svg","image":{},"sideLength":60},{"id":1,"canvas":{},"x":0,"y":0,"isDragging":false,"angle":0,"selected":false,"icon":"Rectangle.svg","image":{},"sideLength":66},{"id":2,"canvas":{},"x":0,"y":0,"isDragging":false,"angle":0,"selected":false,"icon":"Polygon.svg","image":{},"sideLength":47}];
    localStorage.setItem(storageKey, JSON.stringify(mockData));

    it("Je devrais avoir le même json que celui de mon mockData'", () => {
        const canvasStorage = new CanvasLocalStorage(storageKey);
        const result = canvasStorage.load(storageKey);
        expect(result).toEqual(mockData);
    });

    it("J'essaie de charger une sauvegarde qui n'existe pas, il doit me retourner null", () => {
        const canvasStorage = new CanvasLocalStorage(storageKey);
        const result = canvasStorage.load("aodznof");
        expect(result).toBeNull();
    });
});
