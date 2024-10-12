import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { ThreeService } from '../../services/three.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild("viewer") viewer!: ElementRef;
  viewerEl!: HTMLElement;
  constructor(
    private assetService: AssetService,
    private threeService: ThreeService
  ) {}

  ngAfterViewInit(): void {
    this.viewerEl = this.viewer.nativeElement;
    this.threeService.run(this.viewerEl);
  }

}
