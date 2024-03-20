import BaseViewModel from "../../base.viewmodel.js";
import BlocoModel from "../../models/bloco.model.js";

export default class CriarViewModel extends BaseViewModel {

    private voltar: HTMLAnchorElement;

    private nome: HTMLInputElement;
    private consultar: HTMLButtonElement;
    private resultadoVerificacao: HTMLParagraphElement;

    private divSenha: HTMLDivElement;
    private senha: HTMLInputElement;
    private senhaConfirmacao: HTMLInputElement;
    private criar: HTMLButtonElement;

    public onConsultar = (nomeHash: string) => {};
    public onVoltar = () => {};
    public onCriar = (nomeHash: string, senhaHash: string, blocoCrypt: string) => {};

    constructor(shadow: ShadowRoot) {
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

    public solicitarSenha() {
        this.resultadoVerificacao.innerText = `A nota ${this.nome.value} está disponível.`;
        this.nome.disabled = true;
        this.consultar.disabled = true;
        this.divSenha.classList.remove("ocultar");
    }

    public reportarExistenciaConsultar() {
        this.resultadoVerificacao.innerText = `A nota ${this.nome.value} já existe.`;
        this.nome.focus;
    }

    public reportarExistenciaCriar() {
        this.resultadoVerificacao.innerText = `A nota ${this.nome.value} foi crianda enquando você definia a senha, tente outro nome.`;
        this.nome.disabled = false;
        this.nome.focus;
        this.consultar.disabled = false;
        this.senha.value = "";
        this.senhaConfirmacao.value = "";
        this.divSenha.classList.add("ocultar");
    }

    public reportarErroConsultar() {
        this.resultadoVerificacao.innerText = "Não foi possível verificar a nota no momento.";
    }

    public reportarErroCriar() {
        this.resultadoVerificacao.innerText = "Não foi possível criar a nota no momento.";
    }

    private eventosInternos() {
        this.nome.addEventListener("keyup", () => this.consultar.disabled = this.nome.value == "");
        
        this.senha.addEventListener("keyup", () => this.desativarCriar());
        this.senhaConfirmacao.addEventListener("keyup", () => this.desativarCriar());
    }

    private desativarCriar() {
        this.criar.disabled = this.senha.value === "" || this.senha.value !== this.senhaConfirmacao.value;
    }

    private eventosExternos() {
        this.voltar.addEventListener("click", (ev: MouseEvent) => {
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
            const bloco: BlocoModel = {
                nome: this.nome.value,
                ultimoId: 0
            };
            const blocoCrypt = await this.crypto.criptografar(key, JSON.stringify(bloco));
            this.onCriar(nomeHash, senhaHash, blocoCrypt);
        });
    }

    
}