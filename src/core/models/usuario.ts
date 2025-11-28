export interface Usuario {
  id?: number;
  email?: string;
  role?: string;
}

export interface DadosAutenticacao {
  login: string;
  senha: string;
}

export interface DadosTokenJWT {
  token: string;
}
