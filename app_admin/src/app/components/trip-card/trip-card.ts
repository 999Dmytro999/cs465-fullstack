import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCardComponent {
  @Input({ required: true }) trip!: Trip;
  @Output() remove = new EventEmitter<string>();

  get imageUrl(): string {
    return `http://localhost:3000/images/${this.trip.image}`;
  }
}
