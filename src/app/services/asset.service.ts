import { Injectable } from '@angular/core';
import * as data from '../repositories/assets.json'
import { Asset } from '../models/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  assetConfiguration: any = (data as any).default;
  constructor() {}

  getDefaultLeftArm() {
    return this.assetConfiguration["arms"].filter((a: Asset) => {
      return a.type === "lArm";
    })[0];
  }

  getDefaultTorsoAsset(): Asset {
    return this.assetConfiguration["torsos"][0];
  }

  getDefaultHeadAsset(): Asset {
    return this.assetConfiguration["heads"][0];
  }

  getLeftArmAssets(): Asset[] {
    return this.assetConfiguration["arms"].filter((a: Asset) => {
      return a.type === "lArm";
    });
  }

  getTorsoAssets(): Asset[] {
    return this.assetConfiguration["torsos"];
  }

  getHeadAssets(): Asset[] {
    return this.assetConfiguration["heads"];
  }

}
