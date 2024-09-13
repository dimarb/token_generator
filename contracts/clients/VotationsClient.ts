/* eslint-disable */
/**
 * This file was automatically generated by @algorandfoundation/algokit-client-generator.
 * DO NOT MODIFY IT BY HAND.
 * requires: @algorandfoundation/algokit-utils: ^2
 */
import * as algokit from '@algorandfoundation/algokit-utils'
import type {
  ABIAppCallArg,
  AppCallTransactionResult,
  AppCallTransactionResultOfType,
  AppCompilationResult,
  AppReference,
  AppState,
  CoreAppCallArgs,
  RawAppCallArgs,
  TealTemplateParams,
} from '@algorandfoundation/algokit-utils/types/app'
import type {
  AppClientCallCoreParams,
  AppClientCompilationParams,
  AppClientDeployCoreParams,
  AppDetails,
  ApplicationClient,
} from '@algorandfoundation/algokit-utils/types/app-client'
import type { AppSpec } from '@algorandfoundation/algokit-utils/types/app-spec'
import type { SendTransactionResult, TransactionToSign, SendTransactionFrom, SendTransactionParams } from '@algorandfoundation/algokit-utils/types/transaction'
import type { ABIResult, TransactionWithSigner } from 'algosdk'
import { Algodv2, OnApplicationComplete, Transaction, AtomicTransactionComposer, modelsv2 } from 'algosdk'
export const APP_SPEC: AppSpec = {
  "hints": {
    "createApplication()void": {
      "call_config": {
        "no_op": "CREATE"
      }
    },
    "reigsterCandidate(address,(string,string,string,string))void": {
      "call_config": {
        "no_op": "CALL"
      }
    },
    "vote(address)void": {
      "call_config": {
        "no_op": "CALL"
      }
    }
  },
  "bare_call_config": {
    "no_op": "NEVER",
    "opt_in": "NEVER",
    "close_out": "NEVER",
    "update_application": "NEVER",
    "delete_application": "NEVER"
  },
  "schema": {
    "local": {
      "declared": {},
      "reserved": {}
    },
    "global": {
      "declared": {
        "owner": {
          "type": "bytes",
          "key": "owner"
        }
      },
      "reserved": {}
    }
  },
  "state": {
    "global": {
      "num_byte_slices": 1,
      "num_uints": 0
    },
    "local": {
      "num_byte_slices": 0,
      "num_uints": 0
    }
  },
  "source": {
    "approval": "I3ByYWdtYSB2ZXJzaW9uIDEwCgovLyBUaGlzIFRFQUwgd2FzIGdlbmVyYXRlZCBieSBURUFMU2NyaXB0IHYwLjEwMC4yCi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbGdvcmFuZGZvdW5kYXRpb24vVEVBTFNjcmlwdAoKLy8gVGhpcyBjb250cmFjdCBpcyBjb21wbGlhbnQgd2l0aCBhbmQvb3IgaW1wbGVtZW50cyB0aGUgZm9sbG93aW5nIEFSQ3M6IFsgQVJDNCBdCgovLyBUaGUgZm9sbG93aW5nIHRlbiBsaW5lcyBvZiBURUFMIGhhbmRsZSBpbml0aWFsIHByb2dyYW0gZmxvdwovLyBUaGlzIHBhdHRlcm4gaXMgdXNlZCB0byBtYWtlIGl0IGVhc3kgZm9yIGFueW9uZSB0byBwYXJzZSB0aGUgc3RhcnQgb2YgdGhlIHByb2dyYW0gYW5kIGRldGVybWluZSBpZiBhIHNwZWNpZmljIGFjdGlvbiBpcyBhbGxvd2VkCi8vIEhlcmUsIGFjdGlvbiByZWZlcnMgdG8gdGhlIE9uQ29tcGxldGUgaW4gY29tYmluYXRpb24gd2l0aCB3aGV0aGVyIHRoZSBhcHAgaXMgYmVpbmcgY3JlYXRlZCBvciBjYWxsZWQKLy8gRXZlcnkgcG9zc2libGUgYWN0aW9uIGZvciB0aGlzIGNvbnRyYWN0IGlzIHJlcHJlc2VudGVkIGluIHRoZSBzd2l0Y2ggc3RhdGVtZW50Ci8vIElmIHRoZSBhY3Rpb24gaXMgbm90IGltcGxlbWVudGVkIGluIHRoZSBjb250cmFjdCwgaXRzIHJlc3BlY3RpdmUgYnJhbmNoIHdpbGwgYmUgIipOT1RfSU1QTEVNRU5URUQiIHdoaWNoIGp1c3QgY29udGFpbnMgImVyciIKdHhuIEFwcGxpY2F0aW9uSUQKIQppbnQgNgoqCnR4biBPbkNvbXBsZXRpb24KKwpzd2l0Y2ggKmNhbGxfTm9PcCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKmNyZWF0ZV9Ob09wICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRCAqTk9UX0lNUExFTUVOVEVEICpOT1RfSU1QTEVNRU5URUQgKk5PVF9JTVBMRU1FTlRFRAoKKk5PVF9JTVBMRU1FTlRFRDoKCS8vIFRoZSByZXF1ZXN0ZWQgYWN0aW9uIGlzIG5vdCBpbXBsZW1lbnRlZCBpbiB0aGlzIGNvbnRyYWN0LiBBcmUgeW91IHVzaW5nIHRoZSBjb3JyZWN0IE9uQ29tcGxldGU/IERpZCB5b3Ugc2V0IHlvdXIgYXBwIElEPwoJZXJyCgovLyBjcmVhdGVBcHBsaWNhdGlvbigpdm9pZAoqYWJpX3JvdXRlX2NyZWF0ZUFwcGxpY2F0aW9uOgoJLy8gZXhlY3V0ZSBjcmVhdGVBcHBsaWNhdGlvbigpdm9pZAoJY2FsbHN1YiBjcmVhdGVBcHBsaWNhdGlvbgoJaW50IDEKCXJldHVybgoKLy8gY3JlYXRlQXBwbGljYXRpb24oKTogdm9pZApjcmVhdGVBcHBsaWNhdGlvbjoKCXByb3RvIDAgMAoKCS8vIGNvbnRyYWN0cy9Wb3RhdGlvbnMuYWxnby50czoxMgoJLy8gdGhpcy5vd25lci52YWx1ZSA9IHRoaXMuYXBwLmNyZWF0b3IKCWJ5dGUgMHg2Zjc3NmU2NTcyIC8vICJvd25lciIKCXR4bmEgQXBwbGljYXRpb25zIDAKCWFwcF9wYXJhbXNfZ2V0IEFwcENyZWF0b3IKCXBvcAoJYXBwX2dsb2JhbF9wdXQKCXJldHN1YgoKLy8gcmVpZ3N0ZXJDYW5kaWRhdGUoYWRkcmVzcywoc3RyaW5nLHN0cmluZyxzdHJpbmcsc3RyaW5nKSl2b2lkCiphYmlfcm91dGVfcmVpZ3N0ZXJDYW5kaWRhdGU6CgkvLyBkYXRhOiAoc3RyaW5nLHN0cmluZyxzdHJpbmcsc3RyaW5nKQoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMgoKCS8vIGFkZHJlc3M6IGFkZHJlc3MKCXR4bmEgQXBwbGljYXRpb25BcmdzIDEKCWR1cAoJbGVuCglpbnQgMzIKCT09CgoJLy8gYXJndW1lbnQgMSAoYWRkcmVzcykgZm9yIHJlaWdzdGVyQ2FuZGlkYXRlIG11c3QgYmUgYSBhZGRyZXNzCglhc3NlcnQKCgkvLyBleGVjdXRlIHJlaWdzdGVyQ2FuZGlkYXRlKGFkZHJlc3MsKHN0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZykpdm9pZAoJY2FsbHN1YiByZWlnc3RlckNhbmRpZGF0ZQoJaW50IDEKCXJldHVybgoKLy8gcmVpZ3N0ZXJDYW5kaWRhdGUoYWRkcmVzczogQWRkcmVzcywgZGF0YTogQ2FuZGlkYXRlSW5mbyk6IHZvaWQKcmVpZ3N0ZXJDYW5kaWRhdGU6Cglwcm90byAyIDAKCgkvLyBjb250cmFjdHMvVm90YXRpb25zLmFsZ28udHM6MTYKCS8vIGFzc2VydCh0aGlzLm93bmVyLnZhbHVlID09PSB0aGlzLnR4bi5zZW5kZXIsICdPbmx5IHRoZSBvd25lciBjYW4gcmVnaXN0ZXIgYSBjYW5kaWRhdGUnKQoJYnl0ZSAweDZmNzc2ZTY1NzIgLy8gIm93bmVyIgoJYXBwX2dsb2JhbF9nZXQKCXR4biBTZW5kZXIKCT09CgoJLy8gT25seSB0aGUgb3duZXIgY2FuIHJlZ2lzdGVyIGEgY2FuZGlkYXRlCglhc3NlcnQKCgkvLyBjb250cmFjdHMvVm90YXRpb25zLmFsZ28udHM6MTcKCS8vIGFzc2VydCghdGhpcy5kYXRhQ2FuZGlkYXRlKGFkZHJlc3MpLmV4aXN0cywgJ1RoZSBjYW5kaWRhdGUgaXMgYWxyZWFkeSByZWdpc3RlcmVkJykKCWZyYW1lX2RpZyAtMSAvLyBhZGRyZXNzOiBBZGRyZXNzCglib3hfbGVuCglzd2FwCglwb3AKCSEKCgkvLyBUaGUgY2FuZGlkYXRlIGlzIGFscmVhZHkgcmVnaXN0ZXJlZAoJYXNzZXJ0CgoJLy8gY29udHJhY3RzL1ZvdGF0aW9ucy5hbGdvLnRzOjE4CgkvLyB0aGlzLmRhdGFDYW5kaWRhdGUoYWRkcmVzcykudmFsdWUgPSB7IGRhdGE6IGRhdGEsIHZvdGVzOiAwIH0KCWZyYW1lX2RpZyAtMSAvLyBhZGRyZXNzOiBBZGRyZXNzCglkdXAKCWJveF9kZWwKCXBvcAoJYnl0ZSAweCAvLyBpbml0aWFsIGhlYWQKCWJ5dGUgMHggLy8gaW5pdGlhbCB0YWlsCglieXRlIDB4MDAwMyAvLyBpbml0aWFsIGhlYWQgb2Zmc2V0CglmcmFtZV9kaWcgLTIgLy8gZGF0YTogQ2FuZGlkYXRlSW5mbwoJY2FsbHN1YiAqcHJvY2Vzc19keW5hbWljX3R1cGxlX2VsZW1lbnQKCWJ5dGUgMHgwMAoJY2FsbHN1YiAqcHJvY2Vzc19zdGF0aWNfdHVwbGVfZWxlbWVudAoJcG9wIC8vIHBvcCBoZWFkIG9mZnNldAoJY29uY2F0IC8vIGNvbmNhdCBoZWFkIGFuZCB0YWlsCglib3hfcHV0CglyZXRzdWIKCi8vIHZvdGUoYWRkcmVzcyl2b2lkCiphYmlfcm91dGVfdm90ZToKCS8vIGNhbmRpZGF0ZTogYWRkcmVzcwoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQoJZHVwCglsZW4KCWludCAzMgoJPT0KCgkvLyBhcmd1bWVudCAwIChjYW5kaWRhdGUpIGZvciB2b3RlIG11c3QgYmUgYSBhZGRyZXNzCglhc3NlcnQKCgkvLyBleGVjdXRlIHZvdGUoYWRkcmVzcyl2b2lkCgljYWxsc3ViIHZvdGUKCWludCAxCglyZXR1cm4KCi8vIHZvdGUoY2FuZGlkYXRlOiBBZGRyZXNzKTogdm9pZAp2b3RlOgoJcHJvdG8gMSAwCgoJLy8gY29udHJhY3RzL1ZvdGF0aW9ucy5hbGdvLnRzOjIyCgkvLyBhc3NlcnQodGhpcy5kYXRhQ2FuZGlkYXRlKGNhbmRpZGF0ZSkuZXhpc3RzLCAnQ2FuZGl0YWUgbm8gcmVnaXN0ZXJlZCcpCglmcmFtZV9kaWcgLTEgLy8gY2FuZGlkYXRlOiBBZGRyZXNzCglib3hfbGVuCglzd2FwCglwb3AKCgkvLyBDYW5kaXRhZSBubyByZWdpc3RlcmVkCglhc3NlcnQKCgkvLyBjb250cmFjdHMvVm90YXRpb25zLmFsZ28udHM6MjMKCS8vIHRoaXMuZGF0YUNhbmRpZGF0ZShjYW5kaWRhdGUpLnZhbHVlLnZvdGVzID0gdGhpcy5kYXRhQ2FuZGlkYXRlKGNhbmRpZGF0ZSkudmFsdWUudm90ZXMgKyAxCglmcmFtZV9kaWcgLTEgLy8gY2FuZGlkYXRlOiBBZGRyZXNzCglib3hfZ2V0CgoJLy8gYm94IHZhbHVlIGRvZXMgbm90IGV4aXN0OiB0aGlzLmRhdGFDYW5kaWRhdGUoY2FuZGlkYXRlKS52YWx1ZQoJYXNzZXJ0CglzdG9yZSAyNTUgLy8gZnVsbCBhcnJheQoJbG9hZCAyNTUgLy8gZnVsbCBhcnJheQoJaW50IDIKCWZyYW1lX2RpZyAtMSAvLyBjYW5kaWRhdGU6IEFkZHJlc3MKCWJveF9nZXQKCgkvLyBib3ggdmFsdWUgZG9lcyBub3QgZXhpc3Q6IHRoaXMuZGF0YUNhbmRpZGF0ZShjYW5kaWRhdGUpLnZhbHVlCglhc3NlcnQKCXN0b3JlIDI1NSAvLyBmdWxsIGFycmF5Cglsb2FkIDI1NSAvLyBmdWxsIGFycmF5CglleHRyYWN0IDIgMQoJYnRvaQoJaW50IDEKCSsKCWl0b2IKCWR1cAoJYml0bGVuCglpbnQgOAoJPD0KCgkvLyB0aGlzLmRhdGFDYW5kaWRhdGUoY2FuZGlkYXRlKS52YWx1ZS52b3RlcyArIDEgb3ZlcmZsb3dlZCA4IGJpdHMKCWFzc2VydAoJZXh0cmFjdCA3IDEKCXJlcGxhY2UzCglmcmFtZV9kaWcgLTEgLy8gY2FuZGlkYXRlOiBBZGRyZXNzCglkdXAKCWJveF9kZWwKCXBvcAoJc3dhcAoJYm94X3B1dAoJcmV0c3ViCgoqY3JlYXRlX05vT3A6CgltZXRob2QgImNyZWF0ZUFwcGxpY2F0aW9uKCl2b2lkIgoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAoJbWF0Y2ggKmFiaV9yb3V0ZV9jcmVhdGVBcHBsaWNhdGlvbgoKCS8vIHRoaXMgY29udHJhY3QgZG9lcyBub3QgaW1wbGVtZW50IHRoZSBnaXZlbiBBQkkgbWV0aG9kIGZvciBjcmVhdGUgTm9PcAoJZXJyCgoqY2FsbF9Ob09wOgoJbWV0aG9kICJyZWlnc3RlckNhbmRpZGF0ZShhZGRyZXNzLChzdHJpbmcsc3RyaW5nLHN0cmluZyxzdHJpbmcpKXZvaWQiCgltZXRob2QgInZvdGUoYWRkcmVzcyl2b2lkIgoJdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMAoJbWF0Y2ggKmFiaV9yb3V0ZV9yZWlnc3RlckNhbmRpZGF0ZSAqYWJpX3JvdXRlX3ZvdGUKCgkvLyB0aGlzIGNvbnRyYWN0IGRvZXMgbm90IGltcGxlbWVudCB0aGUgZ2l2ZW4gQUJJIG1ldGhvZCBmb3IgY2FsbCBOb09wCgllcnIKCipwcm9jZXNzX3N0YXRpY190dXBsZV9lbGVtZW50OgoJcHJvdG8gNCAzCglmcmFtZV9kaWcgLTQgLy8gdHVwbGUgaGVhZAoJZnJhbWVfZGlnIC0xIC8vIGVsZW1lbnQKCWNvbmNhdAoJZnJhbWVfZGlnIC0zIC8vIHR1cGxlIHRhaWwKCWZyYW1lX2RpZyAtMiAvLyBoZWFkIG9mZnNldAoJcmV0c3ViCgoqcHJvY2Vzc19keW5hbWljX3R1cGxlX2VsZW1lbnQ6Cglwcm90byA0IDMKCWZyYW1lX2RpZyAtNCAvLyB0dXBsZSBoZWFkCglmcmFtZV9kaWcgLTIgLy8gaGVhZCBvZmZzZXQKCWNvbmNhdAoJZnJhbWVfYnVyeSAtNCAvLyB0dXBsZSBoZWFkCglmcmFtZV9kaWcgLTEgLy8gZWxlbWVudAoJZHVwCglsZW4KCWZyYW1lX2RpZyAtMiAvLyBoZWFkIG9mZnNldAoJYnRvaQoJKwoJaXRvYgoJZXh0cmFjdCA2IDIKCWZyYW1lX2J1cnkgLTIgLy8gaGVhZCBvZmZzZXQKCWZyYW1lX2RpZyAtMyAvLyB0dXBsZSB0YWlsCglzd2FwCgljb25jYXQKCWZyYW1lX2J1cnkgLTMgLy8gdHVwbGUgdGFpbAoJZnJhbWVfZGlnIC00IC8vIHR1cGxlIGhlYWQKCWZyYW1lX2RpZyAtMyAvLyB0dXBsZSB0YWlsCglmcmFtZV9kaWcgLTIgLy8gaGVhZCBvZmZzZXQKCXJldHN1Yg==",
    "clear": "I3ByYWdtYSB2ZXJzaW9uIDEw"
  },
  "contract": {
    "name": "Votations",
    "desc": "",
    "methods": [
      {
        "name": "createApplication",
        "args": [],
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "reigsterCandidate",
        "args": [
          {
            "name": "address",
            "type": "address"
          },
          {
            "name": "data",
            "type": "(string,string,string,string)"
          }
        ],
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "vote",
        "args": [
          {
            "name": "candidate",
            "type": "address"
          }
        ],
        "returns": {
          "type": "void"
        }
      }
    ]
  }
}

/**
 * Defines an onCompletionAction of 'no_op'
 */
export type OnCompleteNoOp =  { onCompleteAction?: 'no_op' | OnApplicationComplete.NoOpOC }
/**
 * Defines an onCompletionAction of 'opt_in'
 */
export type OnCompleteOptIn =  { onCompleteAction: 'opt_in' | OnApplicationComplete.OptInOC }
/**
 * Defines an onCompletionAction of 'close_out'
 */
export type OnCompleteCloseOut =  { onCompleteAction: 'close_out' | OnApplicationComplete.CloseOutOC }
/**
 * Defines an onCompletionAction of 'delete_application'
 */
export type OnCompleteDelApp =  { onCompleteAction: 'delete_application' | OnApplicationComplete.DeleteApplicationOC }
/**
 * Defines an onCompletionAction of 'update_application'
 */
export type OnCompleteUpdApp =  { onCompleteAction: 'update_application' | OnApplicationComplete.UpdateApplicationOC }
/**
 * A state record containing a single unsigned integer
 */
export type IntegerState = {
  /**
   * Gets the state value as a BigInt.
   */
  asBigInt(): bigint
  /**
   * Gets the state value as a number.
   */
  asNumber(): number
}
/**
 * A state record containing binary data
 */
export type BinaryState = {
  /**
   * Gets the state value as a Uint8Array
   */
  asByteArray(): Uint8Array
  /**
   * Gets the state value as a string
   */
  asString(): string
}

export type AppCreateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult> & AppReference
export type AppUpdateCallTransactionResult = AppCallTransactionResult & Partial<AppCompilationResult>

export type AppClientComposeCallCoreParams = Omit<AppClientCallCoreParams, 'sendParams'> & {
  sendParams?: Omit<SendTransactionParams, 'skipSending' | 'atc' | 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources'>
}
export type AppClientComposeExecuteParams = Pick<SendTransactionParams, 'skipWaiting' | 'maxRoundsToWaitForConfirmation' | 'populateAppCallResources' | 'suppressLog'>

/**
 * Defines the types of available calls and state of the Votations smart contract.
 */
export type Votations = {
  /**
   * Maps method signatures / names to their argument and return types.
   */
  methods:
    & Record<'createApplication()void' | 'createApplication', {
      argsObj: {
      }
      argsTuple: []
      returns: void
    }>
    & Record<'reigsterCandidate(address,(string,string,string,string))void' | 'reigsterCandidate', {
      argsObj: {
        address: string
        data: [string, string, string, string]
      }
      argsTuple: [address: string, data: [string, string, string, string]]
      returns: void
    }>
    & Record<'vote(address)void' | 'vote', {
      argsObj: {
        candidate: string
      }
      argsTuple: [candidate: string]
      returns: void
    }>
  /**
   * Defines the shape of the global and local state of the application.
   */
  state: {
    global: {
      'owner'?: BinaryState
    }
  }
}
/**
 * Defines the possible abi call signatures
 */
export type VotationsSig = keyof Votations['methods']
/**
 * Defines an object containing all relevant parameters for a single call to the contract. Where TSignature is undefined, a bare call is made
 */
export type TypedCallParams<TSignature extends VotationsSig | undefined> = {
  method: TSignature
  methodArgs: TSignature extends undefined ? undefined : Array<ABIAppCallArg | undefined>
} & AppClientCallCoreParams & CoreAppCallArgs
/**
 * Defines the arguments required for a bare call
 */
export type BareCallArgs = Omit<RawAppCallArgs, keyof CoreAppCallArgs>
/**
 * Maps a method signature from the Votations smart contract to the method's arguments in either tuple of struct form
 */
export type MethodArgs<TSignature extends VotationsSig> = Votations['methods'][TSignature]['argsObj' | 'argsTuple']
/**
 * Maps a method signature from the Votations smart contract to the method's return type
 */
export type MethodReturn<TSignature extends VotationsSig> = Votations['methods'][TSignature]['returns']

/**
 * A factory for available 'create' calls
 */
export type VotationsCreateCalls = (typeof VotationsCallFactory)['create']
/**
 * Defines supported create methods for this smart contract
 */
export type VotationsCreateCallParams =
  | (TypedCallParams<'createApplication()void'> & (OnCompleteNoOp))
/**
 * Defines arguments required for the deploy method.
 */
export type VotationsDeployArgs = {
  deployTimeParams?: TealTemplateParams
  /**
   * A delegate which takes a create call factory and returns the create call params for this smart contract
   */
  createCall?: (callFactory: VotationsCreateCalls) => VotationsCreateCallParams
}


/**
 * Exposes methods for constructing all available smart contract calls
 */
export abstract class VotationsCallFactory {
  /**
   * Gets available create call factories
   */
  static get create() {
    return {
      /**
       * Constructs a create call for the Votations smart contract using the createApplication()void ABI method
       *
       * @param args Any args for the contract call
       * @param params Any additional parameters for the call
       * @returns A TypedCallParams object for the call
       */
      createApplication(args: MethodArgs<'createApplication()void'>, params: AppClientCallCoreParams & CoreAppCallArgs & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return {
          method: 'createApplication()void' as const,
          methodArgs: Array.isArray(args) ? args : [],
          ...params,
        }
      },
    }
  }

  /**
   * Constructs a no op call for the reigsterCandidate(address,(string,string,string,string))void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static reigsterCandidate(args: MethodArgs<'reigsterCandidate(address,(string,string,string,string))void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'reigsterCandidate(address,(string,string,string,string))void' as const,
      methodArgs: Array.isArray(args) ? args : [args.address, args.data],
      ...params,
    }
  }
  /**
   * Constructs a no op call for the vote(address)void ABI method
   *
   * @param args Any args for the contract call
   * @param params Any additional parameters for the call
   * @returns A TypedCallParams object for the call
   */
  static vote(args: MethodArgs<'vote(address)void'>, params: AppClientCallCoreParams & CoreAppCallArgs) {
    return {
      method: 'vote(address)void' as const,
      methodArgs: Array.isArray(args) ? args : [args.candidate],
      ...params,
    }
  }
}

/**
 * A client to make calls to the Votations smart contract
 */
export class VotationsClient {
  /**
   * The underlying `ApplicationClient` for when you want to have more flexibility
   */
  public readonly appClient: ApplicationClient

  private readonly sender: SendTransactionFrom | undefined

  /**
   * Creates a new instance of `VotationsClient`
   *
   * @param appDetails appDetails The details to identify the app to deploy
   * @param algod An algod client instance
   */
  constructor(appDetails: AppDetails, private algod: Algodv2) {
    this.sender = appDetails.sender
    this.appClient = algokit.getAppClient({
      ...appDetails,
      app: APP_SPEC
    }, algod)
  }

  /**
   * Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type
   *
   * @param result The AppCallTransactionResult to be mapped
   * @param returnValueFormatter An optional delegate to format the return value if required
   * @returns The smart contract response with an updated return value
   */
  protected mapReturnValue<TReturn, TResult extends AppCallTransactionResult = AppCallTransactionResult>(result: AppCallTransactionResult, returnValueFormatter?: (value: any) => TReturn): AppCallTransactionResultOfType<TReturn> & TResult {
    if(result.return?.decodeError) {
      throw result.return.decodeError
    }
    const returnValue = result.return?.returnValue !== undefined && returnValueFormatter !== undefined
      ? returnValueFormatter(result.return.returnValue)
      : result.return?.returnValue as TReturn | undefined
      return { ...result, return: returnValue } as AppCallTransactionResultOfType<TReturn> & TResult
  }

  /**
   * Calls the ABI method with the matching signature using an onCompletion code of NO_OP
   *
   * @param typedCallParams An object containing the method signature, args, and any other relevant parameters
   * @param returnValueFormatter An optional delegate which when provided will be used to map non-undefined return values to the target type
   * @returns The result of the smart contract call
   */
  public async call<TSignature extends keyof Votations['methods']>(typedCallParams: TypedCallParams<TSignature>, returnValueFormatter?: (value: any) => MethodReturn<TSignature>) {
    return this.mapReturnValue<MethodReturn<TSignature>>(await this.appClient.call(typedCallParams), returnValueFormatter)
  }

  /**
   * Idempotently deploys the Votations smart contract.
   *
   * @param params The arguments for the contract calls and any additional parameters for the call
   * @returns The deployment result
   */
  public deploy(params: VotationsDeployArgs & AppClientDeployCoreParams = {}): ReturnType<ApplicationClient['deploy']> {
    const createArgs = params.createCall?.(VotationsCallFactory.create)
    return this.appClient.deploy({
      ...params,
      createArgs,
      createOnCompleteAction: createArgs?.onCompleteAction,
    })
  }

  /**
   * Gets available create methods
   */
  public get create() {
    const $this = this
    return {
      /**
       * Creates a new instance of the Votations smart contract using the createApplication()void ABI method.
       *
       * @param args The arguments for the smart contract call
       * @param params Any additional parameters for the call
       * @returns The create result
       */
      async createApplication(args: MethodArgs<'createApplication()void'>, params: AppClientCallCoreParams & AppClientCompilationParams & (OnCompleteNoOp) = {}) {
        return $this.mapReturnValue<MethodReturn<'createApplication()void'>, AppCreateCallTransactionResult>(await $this.appClient.create(VotationsCallFactory.create.createApplication(args, params)))
      },
    }
  }

  /**
   * Makes a clear_state call to an existing instance of the Votations smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The clear_state result
   */
  public clearState(args: BareCallArgs & AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.appClient.clearState(args)
  }

  /**
   * Calls the reigsterCandidate(address,(string,string,string,string))void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public reigsterCandidate(args: MethodArgs<'reigsterCandidate(address,(string,string,string,string))void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(VotationsCallFactory.reigsterCandidate(args, params))
  }

  /**
   * Calls the vote(address)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The result of the call
   */
  public vote(args: MethodArgs<'vote(address)void'>, params: AppClientCallCoreParams & CoreAppCallArgs = {}) {
    return this.call(VotationsCallFactory.vote(args, params))
  }

  /**
   * Extracts a binary state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns A BinaryState instance containing the state value, or undefined if the key was not found
   */
  private static getBinaryState(state: AppState, key: string): BinaryState | undefined {
    const value = state[key]
    if (!value) return undefined
    if (!('valueRaw' in value))
      throw new Error(`Failed to parse state value for ${key}; received an int when expected a byte array`)
    return {
      asString(): string {
        return value.value
      },
      asByteArray(): Uint8Array {
        return value.valueRaw
      }
    }
  }

  /**
   * Extracts a integer state value out of an AppState dictionary
   *
   * @param state The state dictionary containing the state value
   * @param key The key of the state value
   * @returns An IntegerState instance containing the state value, or undefined if the key was not found
   */
  private static getIntegerState(state: AppState, key: string): IntegerState | undefined {
    const value = state[key]
    if (!value) return undefined
    if ('valueRaw' in value)
      throw new Error(`Failed to parse state value for ${key}; received a byte array when expected a number`)
    return {
      asBigInt() {
        return typeof value.value === 'bigint' ? value.value : BigInt(value.value)
      },
      asNumber(): number {
        return typeof value.value === 'bigint' ? Number(value.value) : value.value
      },
    }
  }

  /**
   * Returns the smart contract's global state wrapped in a strongly typed accessor with options to format the stored value
   */
  public async getGlobalState(): Promise<Votations['state']['global']> {
    const state = await this.appClient.getGlobalState()
    return {
      get owner() {
        return VotationsClient.getBinaryState(state, 'owner')
      },
    }
  }

  public compose(): VotationsComposer {
    const client = this
    const atc = new AtomicTransactionComposer()
    let promiseChain:Promise<unknown> = Promise.resolve()
    const resultMappers: Array<undefined | ((x: any) => any)> = []
    return {
      reigsterCandidate(args: MethodArgs<'reigsterCandidate(address,(string,string,string,string))void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.reigsterCandidate(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      vote(args: MethodArgs<'vote(address)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.vote(args, {...params, sendParams: {...params?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs) {
        promiseChain = promiseChain.then(() => client.clearState({...args, sendParams: {...args?.sendParams, skipSending: true, atc}}))
        resultMappers.push(undefined)
        return this
      },
      addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom) {
        promiseChain = promiseChain.then(async () => atc.addTransaction(await algokit.getTransactionWithSigner(txn, defaultSender ?? client.sender)))
        return this
      },
      async atc() {
        await promiseChain
        return atc
      },
      async simulate(options?: SimulateOptions) {
        await promiseChain
        const result = await atc.simulate(client.algod, new modelsv2.SimulateRequest({ txnGroups: [], ...options }))
        return {
          ...result,
          returns: result.methodResults?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      },
      async execute(sendParams?: AppClientComposeExecuteParams) {
        await promiseChain
        const result = await algokit.sendAtomicTransactionComposer({ atc, sendParams }, client.algod)
        return {
          ...result,
          returns: result.returns?.map((val, i) => resultMappers[i] !== undefined ? resultMappers[i]!(val.returnValue) : val.returnValue)
        }
      }
    } as unknown as VotationsComposer
  }
}
export type VotationsComposer<TReturns extends [...any[]] = []> = {
  /**
   * Calls the reigsterCandidate(address,(string,string,string,string))void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  reigsterCandidate(args: MethodArgs<'reigsterCandidate(address,(string,string,string,string))void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): VotationsComposer<[...TReturns, MethodReturn<'reigsterCandidate(address,(string,string,string,string))void'>]>

  /**
   * Calls the vote(address)void ABI method.
   *
   * @param args The arguments for the contract call
   * @param params Any additional parameters for the call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  vote(args: MethodArgs<'vote(address)void'>, params?: AppClientComposeCallCoreParams & CoreAppCallArgs): VotationsComposer<[...TReturns, MethodReturn<'vote(address)void'>]>

  /**
   * Makes a clear_state call to an existing instance of the Votations smart contract.
   *
   * @param args The arguments for the bare call
   * @returns The typed transaction composer so you can fluently chain multiple calls or call execute to execute all queued up transactions
   */
  clearState(args?: BareCallArgs & AppClientComposeCallCoreParams & CoreAppCallArgs): VotationsComposer<[...TReturns, undefined]>

  /**
   * Adds a transaction to the composer
   *
   * @param txn One of: A TransactionWithSigner object (returned as is), a TransactionToSign object (signer is obtained from the signer property), a Transaction object (signer is extracted from the defaultSender parameter), an async SendTransactionResult returned by one of algokit utils helpers (signer is obtained from the defaultSender parameter)
   * @param defaultSender The default sender to be used to obtain a signer where the object provided to the transaction parameter does not include a signer.
   */
  addTransaction(txn: TransactionWithSigner | TransactionToSign | Transaction | Promise<SendTransactionResult>, defaultSender?: SendTransactionFrom): VotationsComposer<TReturns>
  /**
   * Returns the underlying AtomicTransactionComposer instance
   */
  atc(): Promise<AtomicTransactionComposer>
  /**
   * Simulates the transaction group and returns the result
   */
  simulate(options?: SimulateOptions): Promise<VotationsComposerSimulateResult<TReturns>>
  /**
   * Executes the transaction group and returns the results
   */
  execute(sendParams?: AppClientComposeExecuteParams): Promise<VotationsComposerResults<TReturns>>
}
export type SimulateOptions = Omit<ConstructorParameters<typeof modelsv2.SimulateRequest>[0], 'txnGroups'>
export type VotationsComposerSimulateResult<TReturns extends [...any[]]> = {
  returns: TReturns
  methodResults: ABIResult[]
  simulateResponse: modelsv2.SimulateResponse
}
export type VotationsComposerResults<TReturns extends [...any[]]> = {
  returns: TReturns
  groupId: string
  txIds: string[]
  transactions: Transaction[]
}
