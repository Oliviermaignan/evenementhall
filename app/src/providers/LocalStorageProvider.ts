import type { Plan } from "../interface";
import type { DataProvider } from "./DataProvider";

export class LocalStorageProvider implements DataProvider {
    localStorageEntryString = 'evenmentHallData'

    save(plan: Plan): void {
        const stringData = JSON.stringify(plan)
        localStorage.setItem(this.localStorageEntryString, stringData)
    }

    get(): Plan | null {
        const stringData = localStorage.getItem(this.localStorageEntryString)

        if (!stringData) return null

        const planData = JSON.parse(stringData) as Plan
        return planData
    }
}