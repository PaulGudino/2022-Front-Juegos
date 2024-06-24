import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardPublicityService } from 'src/app/servicios/publicity/dashboardPublicity/dashboard-publicity.service';
import { DashboardStyleService } from 'src/app/servicios/theme/dashboardStyle/dashboard-style.service';
import { AnimationGameService } from '../../service/animationGame/animation-game.service';
import { ThemeService } from '../../service/theme/theme.service';
import { PublicityGameService } from 'src/app/servicios/publicityGame/publicity-game.service';
import { GameLogicService } from '../../service/gameLogic/game-logic.service';
import { ProbabilityService } from 'src/app/servicios/probability/probability/probability.service';

@Component({
  selector: 'app-precision-view',
  templateUrl: './precision-view.component.html',
  styleUrls: ['./precision-view.component.css']
})
export class PrecisionViewComponent implements OnInit {

  informationText: string = "A JUGAR!";
  slot_music = false;
  attemps = 0;
  currentMinutes = 0;
  clockRunning = false;
  intervalId: any;
  currentTime = '00:00';
  resultMessage = '';
  targetTime = '';

  probability: any = {};

  prizes: string[] = ["Premio 1", "Premio 2", "Premio 3", "Premio 4", "Premio 5"];

  constructor(
    private router: Router,
    public publicity: DashboardPublicityService,
    public styles: DashboardStyleService,
    public animation: AnimationGameService,
    public theme: ThemeService,
    public publicityGame: PublicityGameService,
    public gameLogicService: GameLogicService,
    private probalilitySrv: ProbabilityService
  ) {}

  ngOnInit(): void {
    this.probalilitySrv.getProbabilites().subscribe(
      (data: any) => {
        this.attemps = data.attempts_limit;
        this.targetTime = this.generateRandomTime();
      }
    );
  }

  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  generateRandomTime(): string {
    const randomMinutes = Math.floor(Math.random() * (24 * 60));
    return this.formatTime(randomMinutes);
  }

  startClock(): void {
    this.currentMinutes = 0;
    this.clockRunning = true;
    this.currentTime = this.formatTime(this.currentMinutes);
    this.intervalId = setInterval(() => {
      this.currentMinutes = (this.currentMinutes + 1) % (24 * 60);
      this.currentTime = this.formatTime(this.currentMinutes);
    }, 1);
  }

  stopClock(): void {
    clearInterval(this.intervalId);
    this.clockRunning = false;
    const currentTime = this.formatTime(this.currentMinutes);
    if (currentTime === this.targetTime) {
      const prize = this.prizes[Math.floor(Math.random() * this.prizes.length)];
      this.resultMessage = `¡Felicidades! Ganaste ${prize}.`;
    } else {
      this.resultMessage = `Lo siento, no coincidieron. La hora objetivo era ${this.targetTime}. Intenta de nuevo.`;
    }
  }

  doSomething() {
    sessionStorage.removeItem("juego_precision");
  }

  music() {
    if (this.attemps > 0) {
      this.slot_music = true;
      this.attemps -= 1;
      setTimeout(() => {
        this.slot_music = false;
      }, 7000);
    }
  }
}
