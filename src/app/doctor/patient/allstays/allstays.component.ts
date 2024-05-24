import { Component, OnInit } from '@angular/core';
import { Stay } from '../entities/stay';
import { Router, ActivatedRoute } from '@angular/router';
import { StayserviceService } from '../service/stayservice.service';

@Component({
  selector: 'app-allstays',
  templateUrl: './allstays.component.html',
  styleUrls: ['./allstays.component.scss']
})
export class AllstaysComponent implements OnInit {
  stays: any=[];
  filteredStays: Stay[] = [];
  isLoading: boolean = true;

  patientKy!: number; // Ajout du point d'exclamation pour indiquer que patientKy sera initialisé dans le constructeur
panelOpenState: any;

  constructor(
    private stayService: StayserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du patient à partir de l'URL
    this.route.params.subscribe(params => {
      this.patientKy = +params['patientKy'];
      // Appeler le service pour récupérer tous les séjours du patient
      this.getStaysByPatient(this.patientKy);
    });
  }
  hasStays(): boolean {
    return this.stays.length > 0;
  }

  getStaysByPatient(patientKy: number): void {
    this.stayService.getAllStaysByPatient(patientKy).subscribe(
      (stays: Stay[]) => {
        console.log('Stays récupérés avec succès : ', stays); // Afficher les séjours récupérés dans la console
        this.stays = stays;
        this.isLoading = false; // Indiquer que le chargement est terminé

      },
      (error) => {
        console.error('Erreur lors de la récupération des séjours du patient : ', error);
        this.isLoading = false; // Indiquer que le chargement est terminé

        // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
      }
    );
  }
  
}
