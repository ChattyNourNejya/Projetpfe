import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Stay } from '../patient/entities/stay';
import { StayserviceService } from '../patient/service/stayservice.service';
import { StayType } from '../patient/entities/stay-type';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss'],
})
export class PrescriptionsComponent implements OnInit {
  stays: Stay[] = [];
  page = 1;

  filteredStays: any[] = [];
  isLoading: boolean = false;
  showFilters: boolean = false;
  staytypeQuery = '';
  staytype = Object.values(StayType);
  doctorNameQuery: string = '';

  constructor(
    private stayService: StayserviceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.getStayList();
  }

  getStayList() {
    this.stayService.retrieveStays().subscribe((data) => {
      this.filteredStays = data;
      this.stays = data;
    });
  }

  private matchesDoctorName(stay: Stay): boolean {
    if (!stay.stayFamilyDoctor) {
      return false;
    }
    const doctorName = stay.stayFamilyDoctor.toLowerCase();
    const query = this.doctorNameQuery.toLowerCase();
    return doctorName.includes(query);
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  private matchesCriteria(stay: Stay): boolean {
    const criteria: boolean[] = [];

    if (this.staytypeQuery) {
      criteria.push(this.matchesStaytype(stay));
    }
    if (this.doctorNameQuery) {
      criteria.push(this.matchesDoctorName(stay));
    }

    return criteria.length === 0 || criteria.every((result) => result);
  }

  private matchesStaytype(stay: Stay): boolean {
    return stay.stayType === this.staytypeQuery;
  }

  searchStays(): void {
    this.filteredStays = this.stays.filter((stay) =>
      this.matchesCriteria(stay)
    );
    this.page = 1;
  }
}
