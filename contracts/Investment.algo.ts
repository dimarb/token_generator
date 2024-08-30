import { Contract } from '@algorandfoundation/tealscript';

type MetaDataInvestor = { fistName: string; lastName: string; email: string; phone: string };

/**
 * Clase para manejar la creación y transferencia de Acciones
 */
class ShareFactory extends Contract {
  /**
   * Método para crear una acción
   * @param name - Nombre del activo
   * @param unitName - Nombre de la unidad del activo
   * @param q - Cantidad total de unidades del activo
   * @returns AssetID - ID del activo creado
   */
  emitShares(name: string, unitName: string, q: uint64): AssetID {
    return sendAssetCreation({
      configAssetName: name,
      configAssetUnitName: unitName,
      configAssetDecimals: 10,
      configAssetTotal: q,
    });
  }

  /**
   * Método para transferir una acción
   * @param asset - ID del activo a transferir
   * @param receiver - Dirección del receptor del activo
   */
  transferShares(asset: AssetID, receiver: Address): void {
    sendAssetTransfer({
      assetReceiver: receiver,
      assetAmount: 1, // Cantidad de acciones a transferir
      xferAsset: asset,
    });
  }
}

/**
 * Clase para invocar métodos de ShareFactory
 */
class InvestmentCaller extends Contract {
  metaData = BoxMap<Address, MetaDataInvestor>();

  assetId = GlobalStateKey<AssetID>();

  appId = GlobalStateKey<AppID>();

  /**
   * Método para crear un Token y realizar transferencia
   * @param name - Nombre del activo
   * @param unitName - Nombre de la unidad del activo
   * @param q - Cantidad total de unidades del activo
   * @returns AssetID - ID del activo creado
   */
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

    // Crear Token
    const createdAsset = sendMethodCall<typeof ShareFactory.prototype.emitShares>({
      applicationID: this.appId.value,
      methodArgs: [name, unitName, q], // Nombre y unidad del Token, cantidad total
    });

    sendAssetTransfer({
      assetReceiver: this.app.address,
      assetAmount: 0,
      xferAsset: createdAsset,
    });

    sendMethodCall<typeof ShareFactory.prototype.transferShares>({
      applicationID: this.appId.value,
      methodArgs: [createdAsset, this.app.address],
    });

    this.assetId.value = createdAsset;

    return createdAsset;
  }

  /**
   * Método para crear un titular de acciones
   * @param adress - Dirección del titular
   * @param data - Datos del titular
   */
  createHolder(adress: Address, data: MetaDataInvestor): void {
    assert(!this.metaData(adress).exists);
    this.metaData(adress).value = data;
  }

  /**
   * Método para transferir un token a un receptor
   * @param receiver - Dirección del receptor
   */
  transferToken(receiver: Address): void {
    assert(this.metaData(receiver).exists);
    sendMethodCall<typeof ShareFactory.prototype.transferShares>({
      applicationID: this.appId.value,
      methodArgs: [this.assetId.value, receiver],
    });
  }
}
