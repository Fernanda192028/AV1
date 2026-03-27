import { Aeronave } from "./Aeronave";


export class Relatorio {
  gerar(aeronave: Aeronave): string {
    let texto = `RELATÓRIO DA AERONAVE\n`;
    texto += `Código: ${aeronave.codigo}\n`;

    texto += `\nPeças:\n`;
    aeronave.pecas.forEach(p => {
      texto += `- ${p.nome} (${p.status})\n`;
    });

    texto += `\nEtapas:\n`;
    aeronave.etapas.forEach(e => {
      texto += `- ${e.nome} (${e.status})\n`;
    });

    texto += `\nTestes:\n`;
    aeronave.testes.forEach(t => {
      texto += `- ${t.tipo} (${t.resultado})\n`;
    });

    return texto;
  }
}