import { TipoQuarto } from './tipo.quarto';
import { StatusQuarto } from './status.quarto';

export interface QuartoRequest {
  numero: number;
  tipo: TipoQuarto;
  status: StatusQuarto;
  diaria: number;
}
