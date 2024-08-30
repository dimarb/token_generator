import { Contract } from '@algorandfoundation/tealscript';

type MetaDataInvestor = { fistName: string; lastName: string; email: string; phone: string };
// Clase para manejar la creación y transferencia de Acciones
class ShareFactory extends Contract {
  // Método para crear una acción
  emitShares(name: string, unitName: string, q: uint64): AssetID {
    return sendAssetCreation({
      configAssetName: name,
      configAssetUnitName: unitName,
      configAssetDecimals: 10,
      configAssetTotal: q,
    });
  }

  // Método para transferir un NFT
  @allow.call('OptIn')
  transferShares(asset: AssetID, receiver: Address): void {
    sendAssetTransfer({
      assetReceiver: receiver,
      assetAmount: 1, // Transferencia de un NFT
      xferAsset: asset,
    });
  }
}

// Clase para invocar métodos de NFTFactory
// eslint-disable-next-line no-unused-vars
class InvestmentCaller extends Contract {
  metaData = BoxMap<Address, MetaDataInvestor>();

  assetId = GlobalStateKey<AssetID>();

  appId = GlobalStateKey<AppID>();

  // Método para crear un NFT y realizar transferencia
  emmitAndGetShares(name: string, unitName: string, q: uint64): AssetID {
    sendMethodCall<typeof ShareFactory.prototype.createApplication>({
      clearStateProgram: ShareFactory.clearProgram(),
      approvalProgram: ShareFactory.approvalProgram(),
    });

    this.appId.value = this.itxn.createdApplicationID;

    // Enviar pago al contrato
    sendPayment({
      amount: 200_000, // Pago en microAlgos
      receiver: this.appId.value.address,
    });

    // Crear NFT
    const createdAsset = sendMethodCall<typeof ShareFactory.prototype.emitShares>({
      applicationID: this.appId.value,
      methodArgs: [name, unitName, q], // Nombre y unidad del NFT
    });

    this.assetId.value = createdAsset;

    return createdAsset;
  }

  createHolder(adress: Address, data: MetaDataInvestor): void {
    assert(!this.metaData(adress).exists);
    this.metaData(adress).value = data;
  }

  transferToken(receiver: Address): void {
    assert(this.metaData(receiver).exists);

    // Transferir NFT desde el contrato
    sendMethodCall<typeof ShareFactory.prototype.transferShares>({
      fee: 12_000,
      applicationID: this.appId.value,
      methodArgs: [this.assetId.value, receiver],
    });
  }
}
