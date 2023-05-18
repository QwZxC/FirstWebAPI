import { ITheme } from "./ITheme";

export interface ILesson {
    id: number,
    name: string,
    courseId: number,
    themes: ITheme[]
}