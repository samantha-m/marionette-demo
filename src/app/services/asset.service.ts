import { Injectable } from '@angular/core';
import * as data from '../repositories/assets.json'
import { Asset } from '../models/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  assetConfiguration: any = (data as any).default;
  constructor() { 
    
  }

  getHeadAssets(): Asset[] {
    return this.assetConfiguration["heads"];
  }

}
