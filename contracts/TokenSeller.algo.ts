import { Contract } from '@algorandfoundation/tealscript';

// Clase para manejar la creación y transferencia de NFTs
class NFTFactory extends Contract {
  // Método para crear un NFT
  createNFT(name: string, unitName: string): AssetID {
    return sendAssetCreation({
      configAssetName: name,
      configAssetUnitName: unitName,
      configAssetTotal: 1, // NFT único
    });
  }

  // Método para transferir un NFT
  transferNFT(asset: AssetID, receiver: Address): void {
    sendAssetTransfer({
      assetReceiver: receiver,
      assetAmount: 1, // Transferencia de un NFT
      xferAsset: asset,
    });
  }
}

// Clase para invocar métodos de NFTFactory
// eslint-disable-next-line no-unused-vars
class FactoryCaller extends Contract {
  // Método para crear un NFT y realizar transferencia
  mintAndGetAsset(): AssetID {
    sendMethodCall<typeof NFTFactory.prototype.createApplication>({
      clearStateProgram: NFTFactory.clearProgram(),
      approvalProgram: NFTFactory.approvalProgram(),
    });

    const factoryApp = this.itxn.createdApplicationID;

    // Enviar pago al contrato
    sendPayment({
      amount: 200_000, // Pago en microAlgos
      receiver: factoryApp.address,
    });

    // Crear NFT
    const createdAsset = sendMethodCall<typeof NFTFactory.prototype.createNFT>({
      applicationID: factoryApp,
      methodArgs: ['My NFT', 'MNFT'], // Nombre y unidad del NFT
    });

    // Transferir NFT al contrato
    sendAssetTransfer({
      assetReceiver: this.app.address,
      assetAmount: 0, // Registrar el NFT en el contrato
      xferAsset: createdAsset,
    });

    // Transferir NFT desde el contrato
    sendMethodCall<typeof NFTFactory.prototype.transferNFT>({
      applicationID: factoryApp,
      methodArgs: [createdAsset, this.app.address],
    });

    return createdAsset;
  }
}
