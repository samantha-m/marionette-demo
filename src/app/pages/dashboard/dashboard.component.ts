import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { Asset } from '../../models/asset';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(
    private assetService: AssetService
  ) {}

  ngOnInit(): void {
  }

}
