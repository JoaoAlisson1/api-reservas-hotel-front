import { CargoEnum } from './cargo.enum';

export interface FuncionarioRequest {
  nome: string;
  email: string;
  telefone: string;
  cargo: CargoEnum;
}
