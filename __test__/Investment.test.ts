import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import * as algokit from '@algorandfoundation/algokit-utils';
import { InvestmentCallerClient } from '../contracts/clients/InvestmentCallerClient';

const fixture = algorandFixture();
algokit.Config.configure({ populateAppCallResources: true });

let appClientShare: InvestmentCallerClient;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let account: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let asetId: any;

describe('Investment', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { testAccount } = fixture.context;

    account = testAccount;
    const { algorand } = fixture;

    appClientShare = new InvestmentCallerClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algorand.client.algod
    );

    await appClientShare.create.createApplication({});
    await appClientShare.appClient.fundAppAccount(algokit.microAlgos(550_000));
  });

  test('Emit Tokens', async () => {
    const holder = Number(
      (
        await appClientShare.emmitAndGetShares(
          { name: 'MyTokenTest', unitName: 'MTT', q: 100 },
          {
            sendParams: { fee: algokit.microAlgos(12_000) },
          }
        )
      ).return?.valueOf()
    );
    asetId = holder;
    expect(holder).not.toBeUndefined();
  });

  test('Create a Holder', async () => {
    const holder = await appClientShare.createHolder(
      { adress: account.addr, data: ['PEPE', 'TORRES', '1111', '111'] },
      {
        sendParams: { fee: algokit.microAlgos(12_000) },
      }
    );
    expect(holder).not.toBeUndefined();
  });

  test('Optin asset Holder', async () => {
    const { algorand } = fixture;
    await algokit.assetOptIn({ account, assetId: asetId }, algorand.client.algod);
  });

  test('Transfer to Holder', async () => {
    const holder = await appClientShare.transferToken(
      { receiver: account.addr },
      {
        sendParams: { fee: algokit.microAlgos(12_000) },
      }
    );
    expect(holder).not.toBeUndefined();
  });
});
