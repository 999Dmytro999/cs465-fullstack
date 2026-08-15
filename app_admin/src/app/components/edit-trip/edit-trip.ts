import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-trip.html',
  styleUrl: '../trip-form.css'
})
export class EditTripComponent implements OnInit {
  loading = true;
  submitting = false;
  errorMessage = '';
  originalCode = '';
  readonly tripForm;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly tripDataService: TripDataService,
    private readonly router: Router
  ) {
    this.tripForm = this.formBuilder.nonNullable.group({
      code: ['', Validators.required], name: ['', Validators.required],
      length: ['', Validators.required], start: ['', Validators.required],
      resort: ['', Validators.required], perPerson: ['', Validators.required],
      image: ['', Validators.required], description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.originalCode = this.route.snapshot.paramMap.get('tripCode') ?? '';
    this.tripDataService.getTrip(this.originalCode).subscribe({
      next: (trip) => {
        this.tripForm.setValue({
          code: trip.code,
          name: trip.name,
          length: trip.length,
          start: trip.start.substring(0, 10),
          resort: trip.resort,
          perPerson: trip.perPerson,
          image: trip.image,
          description: trip.description
        });
        this.loading = false;
      },
      error: (error: Error) => { this.errorMessage = error.message; this.loading = false; }
    });
  }

  submit(): void {
    if (this.tripForm.invalid) { this.tripForm.markAllAsTouched(); return; }
    this.submitting = true;
    this.errorMessage = '';
    this.tripDataService.updateTrip(this.originalCode, this.tripForm.getRawValue() as Trip).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (error: Error) => { this.errorMessage = error.message; this.submitting = false; }
    });
  }
}
