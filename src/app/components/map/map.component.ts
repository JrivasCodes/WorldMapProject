import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}
  selectedPath: SVGPathElement | null = null;


  ngAfterViewInit(): void {
    const paths = this.elementRef.nativeElement.querySelectorAll('path');
    
    paths.forEach((path: SVGPathElement) => {
      path.addEventListener('mouseenter', this.onRegionMouseEnter.bind(this));
      path.addEventListener('mouseleave', this.onRegionMouseLeave.bind(this));
    });
  }

  onRegionMouseEnter(event: MouseEvent) {
    const target = event.target as SVGPathElement;
    console.log('Mouse Entered Path:', target);
    target.classList.add('regionHover');
  }

  onRegionMouseLeave(event: MouseEvent) {
    const target = event.target as SVGPathElement;
    console.log('Mouse Left Path:', target);
    target.classList.remove('regionHover');
  }

  onSvgClick(event: MouseEvent) {
    const target = event.target as SVGPathElement;


    if (target.tagName === 'path'){
      if (this.selectedPath){
        this.selectedPath.classList.remove('selectedRegion')
      }

      this.selectedPath = target;
      this.selectedPath?.classList.add('selectedRegion')

      const regionName = target.getAttribute('name');
      const regionId = target.id;
      console.log('region clicked', regionName, regionId)
    }
  }
}
