import { Component, Output, EventEmitter, output } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  @Output() regionSelected = new EventEmitter<{ name: string; id: string }>();
// private selectedElement: HTMLElement | null = null;

onRegionMouseEnter(event: MouseEvent) {
  const target = event.target as SVGPathElement;

  if (target.tagName === 'path') {
    console.log('Mouse Over Path:', target);
    target.classList.add('regionHover');
  }
}

  onRegionMouseLeave(event: MouseEvent){
    const target = event.target as HTMLElement;
    console.log('Mouse Left:', target);
    if(target.tagName === 'path'){
      target.classList.remove('regionHover')
    }
  }

  onSvgClick(event: MouseEvent) {
    const target = event.target as HTMLElement;


    if (target.tagName === 'path'){
      const regionName = target.getAttribute('name');
      const regionId = target.id;
      console.log('region clicked', regionName, regionId)
    }
  }
}
