import { CargoEnum } from './cargo.enum';

export interface FuncionarioResponse {
  uuid: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: CargoEnum;
}
