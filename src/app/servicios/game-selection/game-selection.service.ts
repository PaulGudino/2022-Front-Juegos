import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameSelectionService {
  private selectedGameSource = new BehaviorSubject<string>('Tragamonedas');
  selectedGame$ = this.selectedGameSource.asObservable();

  setSelectedGame(game: string) {
    this.selectedGameSource.next(game);
  }
}
