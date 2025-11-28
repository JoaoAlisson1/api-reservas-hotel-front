import { FuncionarioResponse } from "./FuncionarioResponse";
import { HospedeResponse } from "./HospedeResponse";
import { QuartoResponse } from "./QuartoResponse";

export interface ReservaResponse {
  uuid: string;
  checkIn: string;
  checkOut: string;
  valorTotal: number;
  status: string;

  funcionario: FuncionarioResponse;
  hospedes: HospedeResponse[];
  quarto: QuartoResponse;
}
