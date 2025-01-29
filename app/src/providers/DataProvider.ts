import type { Plan } from "../interface";

// En TS, le lint attend de spécifier le contenu de la fonction -> peut être mieux de passer par des interfaces ici ...

export interface DataProvider {
    save(plan: Plan): void;
    get(): Plan | null;
}