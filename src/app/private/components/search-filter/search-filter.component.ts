import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
  @Output() search: EventEmitter<any> = new EventEmitter();
  @ViewChild('filterInput', { static: true }) textInput!: ElementRef;

  filter() {
    this.search.emit(this.textInput.nativeElement.value);
  }
}
