import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CountryDataService } from '../country-data.service'; // this is from the api service component 
import { importProvidersFrom } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {



  constructor(private elementRef: ElementRef, private countryDataService: CountryDataService) {}
  countryData: any;
  selectedPath: SVGPathElement | null = null;


  ngAfterViewInit(): void {
    const paths = this.elementRef.nativeElement.querySelectorAll('path');
    
    paths.forEach((path: SVGPathElement) => {
      path.addEventListener('mouseenter', this.onRegionMouseEnter.bind(this));
      path.addEventListener('mouseleave', this.onRegionMouseLeave.bind(this));
    });
  }

  // This is the function for when the mouse enters a country hover effect
  onRegionMouseEnter(event: MouseEvent) {
    const target = event.target as SVGPathElement;
    // console.log('Mouse Entered Path:', target);
    target.classList.add('regionHover');
  }

  // This is the function for when the mouse leaves a country hover effect
  onRegionMouseLeave(event: MouseEvent) {
    const target = event.target as SVGPathElement;
    // console.log('Mouse Left Path:', target);
    target.classList.remove('regionHover');
  }

  // This is my function for when you click on a country 
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

      this.countryDataService.getCountryData(regionId).subscribe(data => {
        this.countryData = data[1][0];
        console.log('Country Data:', this.countryData)
      })
    }
  }
}
