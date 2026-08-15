import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data';

@Component({
  selector: 'app-add-trip',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-trip.html',
  styleUrl: '../trip-form.css'
})
export class AddTripComponent {
  submitting = false;
  errorMessage = '';
  readonly tripForm;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tripDataService: TripDataService,
    private readonly router: Router
  ) {
    this.tripForm = this.formBuilder.nonNullable.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.tripForm.invalid) {
      this.tripForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';
    this.tripDataService.addTrip(this.tripForm.getRawValue() as Trip).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (error: Error) => {
        this.errorMessage = error.message;
        this.submitting = false;
      }
    });
  }
}
