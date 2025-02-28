import { describe, it, expect, beforeEach, vi } from 'vitest';
import { reactive } from 'vue';
import Shape from '../components/ShapeClass';

import  { CanevasIconName } from '../components/enums';
// Simuler le stock et les formes
let stock: { table: number; chair: number };



beforeEach(() => {
  stock = reactive({
    table: 5,
    chair: 5,
  });

  const canvas = document.createElement('canvas')
  const shape = new Shape(canvas,5,2,0,CanevasIconName.Chaise)
});

describe('addShape', () => {


//   it('ne doit pas ajouter de chaise si le stock est épuisé', () => {
//     stock.chair = 0;
//     new addShape('chaise', { stock });
//     expect(stock.chair).toBe(0); // Le stock ne doit pas être négatif
//   });

//   it('ne doit pas ajouter de table si le stock est épuisé', () => {
//     stock.table = 0;
//     new addShape('table', { stock });
//     expect(stock.table).toBe(0);
//   });

//   it('doit ajouter une forme si le stock est suffisant', () => {
//     new addShape('chaise', { stock });
//     expect(shapes.length).toBe(1);
//   });

  it('Detection shape mouse out', () => {
    //setup des données necessaires au test
    const canvas = document.createElement('canvas')
    const shape = new Shape(canvas,5,2,0,CanevasIconName.Chaise)

    // je fais mes acctions
    const isInside = shape.isInside(10, 50)
    expect(isInside).eq(false);
  });
  

  
    it('Detection shape mouse in', () => { 
      // Setup des données nécessaires au test
      const canvas = document.createElement('canvas');
      const shape = new Shape(canvas, 10, 2, 0, CanevasIconName.Chaise);
  
      // Simulation de la détection de la souris dans la zone
      const isInside = shape.isInside(10, 2); // Assurez-vous que ces coordonnées sont correctes
  
      // Vérification correcte avec chai
      expect(isInside).eq(true);
    });
  });
  

// describe('DOM manipulation test', () => {
//   it('should create and append an element to the body', () => {
//     // Crée un nouvel élément div
//     const div = document.createElement('div');
//     div.textContent = 'Hello, Vitest!';

//     // Ajoute l'élément à l'élément body
//     document.body.appendChild(div);

//     // Vérifie que l'élément a bien été ajouté
//     expect(document.body.contains(div)).toBe(true);
//     expect(div.textContent).toBe('Hello, Vitest!');
//   });
// });
