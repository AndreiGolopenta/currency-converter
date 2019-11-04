import { DataBase } from './dataBase.interface';

export interface Dropdown {
  showList: boolean;
  topPosition: string;
  topCorrection: number,
  leftPosition: string;
  height: string;
  inputBinding: number;
  data: DataBase[];
}