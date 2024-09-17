import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { VotationsClient } from '../contracts/clients/VotationsClient';

const fixture = algorandFixture();
algokit.Config.configure({ populateAppCallResources: true });
type CandidateInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  wallet: algosdk.Account;
};

let appClientVotations: VotationsClient;
let objectsWithWallets: CandidateInfo[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let account: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// let asetId: any;

function generateRandomData(): CandidateInfo {
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'];
  const domains = ['example.com', 'mail.com', 'test.com', 'demo.com', 'sample.com'];

  const randomIndex = (arr: string[]) => Math.floor(Math.random() * arr.length);

  return {
    firstName: firstNames[randomIndex(firstNames)],
    lastName: lastNames[randomIndex(lastNames)],
    email: `${firstNames[randomIndex(firstNames)].toLowerCase()}.${lastNames[randomIndex(lastNames)].toLowerCase()}@${domains[randomIndex(domains)]}`,
    phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    wallet: algosdk.generateAccount(),
  };
}

describe('Investment', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { testAccount } = fixture.context;

    account = testAccount;
    const { algorand } = fixture;

    appClientVotations = new VotationsClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algorand.client.algod
    );

    await appClientVotations.create.createApplication({});
    await appClientVotations.appClient.fundAppAccount(algokit.microAlgos(550_000));
  });

  test('Registry Candidates', async () => {
    objectsWithWallets = Array.from({ length: 3 }, generateRandomData);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const candidates: any[] = [];

    objectsWithWallets.forEach(async (obj: CandidateInfo) => {
      const candidate = await appClientVotations.reigsterCandidate(
        {
          address: obj.wallet.addr,
          fistName: obj.firstName,
          lastName: obj.lastName,
          email: obj.email,
          phone: obj.phone,
        },
        {
          sendParams: { fee: algokit.microAlgos(12_000) },
        }
      );
      candidates.push(candidate);
    });

    expect(candidates).not.toBeUndefined();
  });

  test('Vote', async () => {
    const voteData = await appClientVotations.vote(
      { candidate: objectsWithWallets[1].wallet.addr },
      {
        sendParams: { fee: algokit.microAlgos(12_000) },
      }
    );
    expect(voteData).not.toBeUndefined();
  });
  test('Get Data', async () => {
    const boxesData = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const box of objectsWithWallets) {
      // eslint-disable-next-line no-await-in-loop
      const boxValue = await appClientVotations.getVotes(
        { candidate: box.wallet.addr },
        {
          sendParams: { fee: algokit.microAlgos(12_000) },
        }
      );

      boxesData.push(boxValue.return);
    }
    console.log(boxesData);
    expect(boxesData).not.toBeUndefined();
  });
});
