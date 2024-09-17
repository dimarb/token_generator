import { Contract } from '@algorandfoundation/tealscript';

type CandidateInfo = { fistName: string; lastName: string; email: string; phone: string; votes: uint8 };

class Votations extends Contract {
  owner = GlobalStateKey<Address>();

  dataCandidate = BoxMap<Address, CandidateInfo>();

  // Firma Organizador de la votación - Al desplegar el Contrato
  createApplication(): void {
    this.owner.value = this.app.creator;
  }

  // Firmar Organizador de la votación - Al enviar una transacción
  reigsterCandidate(address: Address, fistName: string, lastName: string, email: string, phone: string): void {
    assert(this.owner.value === this.txn.sender, 'Only the owner can register a candidate');
    assert(!this.dataCandidate(address).exists, 'The candidate is already registered');
    this.dataCandidate(address).value = {
      fistName: fistName,
      lastName: lastName,
      email: email,
      phone: phone,
      votes: 0,
    };
  }

  // Firmar el votante - Al enviar una transacción
  vote(candidate: Address): void {
    assert(this.dataCandidate(candidate).exists, 'Canditae no registered');
    this.dataCandidate(candidate).value.votes = this.dataCandidate(candidate).value.votes + 1;
  }

  getVotes(candidate: Address): CandidateInfo {
    return this.dataCandidate(candidate).value;
  }
}
