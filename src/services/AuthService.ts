import { Funcionario } from "../models/Funcionario";

export class AuthService {
  static login(funcionarios: Funcionario[], usuario: string, senha: string) {
    return funcionarios.find(f => f.autenticar(usuario, senha));
  }
}