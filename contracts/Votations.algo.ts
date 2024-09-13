import { Contract } from '@algorandfoundation/tealscript';

type CandidateInfo = { fistName: string; lastName: string; email: string; phone: string };
type MetaDataCandidate = { data: CandidateInfo; votes: uint8 };

class Votations extends Contract {
  owner = GlobalStateKey<Address>();

  dataCandidate = BoxMap<Address, MetaDataCandidate>();

  // Firma Organizador de la votación - Al desplegar el Contrato
  createApplication(): void {
    this.owner.value = this.app.creator;
  }

  // Firmar Organizador de la votación - Al enviar una transacción
  reigsterCandidate(address: Address, data: CandidateInfo): void {
    assert(this.owner.value === this.txn.sender, 'Only the owner can register a candidate');
    assert(!this.dataCandidate(address).exists, 'The candidate is already registered');
    this.dataCandidate(address).value = { data: data, votes: 0 };
  }

  // Firmar el votante - Al enviar una transacción
  vote(candidate: Address) {
    assert(this.dataCandidate(candidate).exists, 'Canditae no registered');
    this.dataCandidate(candidate).value.votes = this.dataCandidate(candidate).value.votes + 1;
  }
}
