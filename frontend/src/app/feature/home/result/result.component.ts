import { Component } from '@angular/core';
import { DataService } from '../dataTransfer.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-result',
    standalone: true,
    templateUrl: './result.component.html',
    imports: [CommonModule]
})
export class ResultComponent {
    beneficiariosLista: any[];
    constructor(private dataService: DataService) { }

    ngOnInit() {
        // Recibir datos del search component
        this.dataService.dataTransfer.subscribe((data) => (this.beneficiariosLista = data));
    }
}
