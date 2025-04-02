import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatabaseStatus, DatabaseStatusService} from '../../services/database-status.service';
import {Subscription} from 'rxjs';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-database-status',
  imports: [
    NgIf
  ],
  templateUrl: './database-status.component.html',
  styleUrl: './database-status.component.css',
  standalone: true
})
export class DatabaseStatusComponent implements OnInit, OnDestroy {
  dbStatus: DatabaseStatus = DatabaseStatus.CHECKING;
  private subscription: Subscription | null = null;

  constructor(private databaseStatusService: DatabaseStatusService) {
  }

  ngOnInit(): void {
    this.subscription = this.databaseStatusService.status$.subscribe(status => {
      this.dbStatus = status;
    });
  }

  retryConnection(): void {
    this.databaseStatusService.retryConnection().subscribe({
      next: () => {
        // La connexion est rétablie, le statut est déjà mis à jour dans le service
        // Rafraîchir la page pourrait être utile pour recharger les données
        window.location.reload();
      },
      error: () => {

      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
