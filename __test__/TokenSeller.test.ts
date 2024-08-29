import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import * as algokit from '@algorandfoundation/algokit-utils';
import { FactoryCallerClient } from '../contracts/clients/FactoryCallerClient';

const fixture = algorandFixture();
algokit.Config.configure({ populateAppCallResources: true });

let appClient: FactoryCallerClient;

describe('TokenSeller', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { testAccount } = fixture.context;
    const { algorand } = fixture;

    appClient = new FactoryCallerClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algorand.client.algod
    );

    await appClient.create.createApplication({});
    await appClient.appClient.fundAppAccount(algokit.microAlgos(500_000));
  });

  test('mintAndGetAsset', async () => {
    const asset = Number(
      (
        await appClient.mintAndGetAsset(
          {},
          {
            sendParams: { fee: algokit.microAlgos(12_000) },
          }
        )
      ).return?.valueOf()
    );
    expect(asset.valueOf()).not.toBeUndefined();
  });
});
