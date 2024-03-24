import BlocoModel from './bloco.model.js';
import NotaModel from './nota.model.js';

export default interface BlocoNotasModel {
    bloco: BlocoModel;
    notas: NotaModel[];
}