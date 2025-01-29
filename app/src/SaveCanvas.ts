// SaveCanvas.ts
import { SavePlan } from './SavePlan'; // Import de la classe abstraite

export class SaveCanvas extends SavePlan {
  private shapes: any[];  // Tableau des formes
  private canvasWidth: number;
  private canvasHeight: number;

  constructor(shapes: any[], canvasWidth: number, canvasHeight: number) {
    super();  // Appel du constructeur de la classe parente
    this.shapes = shapes;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  // Implémentation de la méthode save
  save() {
 

    // Exemple de sauvegarde dans le localStorage (vous pouvez adapter selon vos besoins)
    const planData = {

      shapes: this.shapes,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight
    };

    // Sauvegarde dans le localStorage
    localStorage.setItem('savedPlan', JSON.stringify(planData));

   
  }
}
