import BaseViewModel from "../../base.viewmodel.js";
export default class CriarViewModel extends BaseViewModel {
    voltar;
    nome;
    consultar;
    resultadoVerificacao;
    divSenha;
    senha;
    senhaConfirmacao;
    criar;
    onConsultar = (nomeHash) => { };
    onVoltar = () => { };
    onCriar = (nomeHash, senhaHash, blocoCrypt) => { };
    constructor(shadow) {
        super(shadow);
        this.voltar = this.getElement("voltar");
        this.nome = this.getElement("nome");
        this.consultar = this.getElement("consultar");
        this.resultadoVerificacao = this.getElement("resultadoVerificacao");
        this.divSenha = this.getElement("divSenha");
        this.senha = this.getElement("senha");
        this.senhaConfirmacao = this.getElement("senhaConfirmacao");
        this.criar = this.getElement("criar");
        this.eventosInternos();
        this.eventosExternos();
    }
    solicitarSenha() {
        this.resultadoVerificacao.innerText = `A nota ${this.nome.value} está disponível.`;
        this.nome.disabled = true;
        this.consultar.disabled = true;
        this.divSenha.classList.remove("ocultar");
    }
    reportarExistenciaConsultar() {
        this.resultadoVerificacao.innerText = `A nota ${this.nome.value} já existe.`;
        this.nome.focus;
    }
    reportarExistenciaCriar() {
        this.resultadoVerificacao.innerText = `A nota ${this.nome.value} foi crianda enquando você definia a senha, tente outro nome.`;
        this.nome.disabled = false;
        this.nome.focus;
        this.consultar.disabled = false;
        this.senha.value = "";
        this.senhaConfirmacao.value = "";
        this.divSenha.classList.add("ocultar");
    }
    reportarErroConsultar() {
        this.resultadoVerificacao.innerText = "Não foi possível verificar a nota no momento.";
    }
    reportarErroCriar() {
        this.resultadoVerificacao.innerText = "Não foi possível criar a nota no momento.";
    }
    eventosInternos() {
        this.nome.addEventListener("keyup", () => this.consultar.disabled = this.nome.value == "");
        this.senha.addEventListener("keyup", () => this.desativarCriar());
        this.senhaConfirmacao.addEventListener("keyup", () => this.desativarCriar());
    }
    desativarCriar() {
        this.criar.disabled = this.senha.value === "" || this.senha.value !== this.senhaConfirmacao.value;
    }
    eventosExternos() {
        this.voltar.addEventListener("click", (ev) => {
            ev.preventDefault;
            this.onVoltar();
        });
        this.consultar.addEventListener("click", async () => {
            const nomeHash = await this.crypto.obterHashNormalizado(this.nome.value);
            this.onConsultar(nomeHash);
        });
        this.criar.addEventListener("click", async () => {
            const nomeHash = await this.crypto.obterHashNormalizado(this.nome.value);
            const senhaHash = await this.crypto.obterHash(this.senha.value);
            const key = await this.crypto.obterKey(senhaHash);
            const bloco = {
                nome: this.nome.value,
                ultimoId: 0
            };
            const blocoCrypt = await this.crypto.criptografar(key, JSON.stringify(bloco));
            this.onCriar(nomeHash, senhaHash, blocoCrypt);
        });
    }
}
//# sourceMappingURL=criar.viewmodel.js.map