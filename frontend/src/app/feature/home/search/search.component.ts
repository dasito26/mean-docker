import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { catalogoService } from "../catalogos.service";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { beneficarioService } from "../beneficiarios.service";
import { DataService } from '../dataTransfer.service';
import { timeout } from "rxjs";

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    imports: [NgbCollapseModule, ReactiveFormsModule, CommonModule],
})

export class SearchComponent implements OnInit {
    areas: any[];
    programas: any[];
    regiones: any[] = [
        { _id: 1, region: "Capital" },
        { _id: 2, region: "Huasteca Alta" },
        { _id: 3, region: "Huasteca Baja" },
        { _id: 4, region: "Montañas" },
        { _id: 5, region: "Nautla" },
        { _id: 6, region: "Olmeca" },
        { _id: 7, region: "Papaloapan" },
        { _id: 8, region: "Sotavento" },
        { _id: 9, region: "Totonaca" },
        { _id: 10, region: "Tuxtlas" }
    ];
    distritos: any[] = [
        { id: 1, _id: 1, distrito: 1 },
        { id: 2, _id: 2, distrito: 2 },
        { id: 3, _id: 3, distrito: 3 },
        { id: 4, _id: 4, distrito: 4 },
        { id: 5, _id: 5, distrito: 5 },
        { id: 6, _id: 6, distrito: 6 },
        { id: 7, _id: 7, distrito: 7 },
        { id: 8, _id: 8, distrito: 8 },
        { id: 9, _id: 9, distrito: 9 },
        { id: 10, _id: 10, distrito: 10 },
        { id: 11, _id: 10, distrito: 11 },
        { id: 12, _id: 12, distrito: 12 },
        { id: 13, _id: 13, distrito: 13 },
        { id: 14, _id: 14, distrito: 14 },
        { id: 15, _id: 14, distrito: 15 },
        { id: 16, _id: 16, distrito: 16 },
        { id: 17, _id: 17, distrito: 17 },
        { id: 18, _id: 18, distrito: 18 },
        { id: 19, _id: 19, distrito: 19 },
        { id: 20, _id: 20, distrito: 20 },
        { id: 21, _id: 21, distrito: 21 },
        { id: 22, _id: 22, distrito: 22 },
        { id: 23, _id: 23, distrito: 23 },
        { id: 24, _id: 24, distrito: 24 },
        { id: 25, _id: 25, distrito: 25 },
        { id: 26, _id: 26, distrito: 26 },
        { id: 27, _id: 27, distrito: 27 },
        { id: 28, _id: 28, distrito: 28 },
        { id: 29, _id: 29, distrito: 29 },
        { id: 30, _id: 30, distrito: 30 }
    ];
    municipios: any[];
    municipiosLista: any[];

    isCollapsed = true;
    busquedaForm: UntypedFormGroup;

    //Enviar los datos de los beneficiarios al otro componente
    @Output()
    beneficiarios: any[];

    constructor(
        private contactService: catalogoService,
        private beneficiarioService: beneficarioService,
        private formBuilder: UntypedFormBuilder,
        private dataService: DataService,
    ) {
        this.busquedaForm = this.createForm();
    }

    getProgramasArea(_id: string): void {
        this.contactService.getProgramas(_id).subscribe(
            (data) => {
                this.programas = data;
            }
        );
    }

    getMunicipios(_distrito: string, _region: string): void {
        this.contactService.getMunicipios(_distrito, _region).subscribe(
            (data) => {
                this.municipios = data;
            }
        );
    }

    buscar(): void {
        this.beneficiarioService.getBeneficiarios(this.busquedaForm.value).subscribe(
            (data) => {
                this.beneficiarios = data;
                console.log(data);
                this.enviarDatosAlResult();
            }
        );
    }

    createForm(): UntypedFormGroup {
        return this.formBuilder.group({
            area: ['', null, null],
            anio: ['', null, null],
            programa: ['', null, null],
            region: ['', null, null],
            distrito: ['', null, null],
            municipio: ['', null, null],
        });
    }

    getAll(): void {
        this.contactService.getAreas().subscribe(
            (data) => {
                this.areas = data;
                /*
                data.sort((a, b) => new Date(b.create_date).getTime() - new Date(a.create_date).getTime());
                console.log(data);
                this.collectionSize = data.length;
                this.allContacts = data;
                this.refreshContacts();
                */
            },

            (error) => { }
        );

        this.contactService.getProgramas('').subscribe(
            (data) => { this.programas = data; }
        );

        this.contactService.getMunicipios(null, null).subscribe(
            (data) => { this.municipiosLista = data; this.municipios = data; }
        );

        this.busquedaForm.get('area')?.valueChanges.subscribe(value => {
            this.getProgramasArea(value);
        });

        this.busquedaForm.get('region')?.valueChanges.subscribe(region => {
            this.busquedaForm.get('distrito')?.setValue('', { emitEvent: false });
            this.municipios = this.municipiosLista.filter((municipio) => municipio.region === region);
            if (region === '') this.municipios = this.municipiosLista;
        });

        this.busquedaForm.get('distrito')?.valueChanges.subscribe(distrito => {
            this.busquedaForm.get('region')?.setValue('', { emitEvent: false });
            if (distrito === '29') this.municipios = this.municipiosLista.filter((municipio) => municipio.cve_mpio_full === '30039');
            else this.municipios = this.municipiosLista.filter((municipio) => municipio.distrito === distrito);
            if (distrito === '') this.municipios = this.municipiosLista;
        });
    }

    ngOnInit(): void {
        this.getAll();
    }

    enviarDatosAlResult() {
        this.dataService.enviarDatos(this.beneficiarios);
    }
}
