import BaseViewModel from "../../base.viewmodel.js";
export default class AbrirViewModel extends BaseViewModel {
    voltar;
    nome;
    senha;
    abrir;
    resultado;
    onVoltar = () => { };
    onAbrir = (nomeHash, senhaHash) => { };
    constructor(shadow) {
        super(shadow);
        this.voltar = this.getElement("voltar");
        this.nome = this.getElement("nome");
        this.senha = this.getElement("senha");
        this.abrir = this.getElement("abrir");
        this.resultado = this.getElement("resultado");
        this.voltar.addEventListener("click", ev => {
            ev.preventDefault();
            this.onVoltar();
        });
        this.nome.addEventListener("keyup", () => this.permitirAbrir());
        this.senha.addEventListener("keyup", () => this.permitirAbrir());
        this.abrir.addEventListener("click", async () => {
            const [nomeHash, senhaHash] = await Promise.all([
                this.crypto.obterHashNormalizado(this.nome.value),
                this.crypto.obterHash(this.senha.value)
            ]);
            this.onAbrir(nomeHash, senhaHash);
        });
    }
    reportarInexistente() {
        this.resultado.innerText = "Não foi possível abrir o bloco de anotações informado!";
    }
    reportarErro() {
        this.resultado.innerText = "Não foi possível consultar o bloco informado neste momento.";
    }
    permitirAbrir() {
        this.abrir.disabled = this.nome.value.trim() === "" || this.senha.value.trim() === "";
    }
}
//# sourceMappingURL=abrir.viewmodel.js.map