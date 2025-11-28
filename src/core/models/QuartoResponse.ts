import { TipoQuarto } from './tipo.quarto';
import { StatusQuarto } from './status.quarto';

export interface QuartoResponse {
  id: number;
  numero: number;
  tipo: TipoQuarto;
  status: StatusQuarto;
  diaria: number;
}
