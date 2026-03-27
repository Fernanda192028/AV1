import fs from "fs";

export class FileService {
  static salvar(caminho: string, dados: any) {
    fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
  }

  static carregar(caminho: string) {
    if (!fs.existsSync(caminho)) return [];

    const conteudo = fs.readFileSync(caminho, "utf-8");

    if (!conteudo) return [];

    return JSON.parse(conteudo);
  }
}