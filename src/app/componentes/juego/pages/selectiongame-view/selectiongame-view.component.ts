import { Component, OnInit } from '@angular/core';
import { routes } from '../../juego-routing.module';
import { Router} from '@angular/router';
@Component({
  selector: 'app-selectiongame-view',
  templateUrl: './selectiongame-view.component.html',
  styleUrls: ['./selectiongame-view.component.css']
})
export class SelectiongameViewComponent implements OnInit {
  informationText: string = "ELIGE UN JUEGO"
  
	// audio = new Audio()
	// audioArray: Audio[] = []

	probability: any = {
		// id: 1,
		// porcent_win: 20,
		// winners_limit: 1,
		// attempts_limit: 1,
		// created: "2022-11-29T14:47:30.056806",
		// modified: "2022-11-29T14:47:30.056806",
		// is_active: true,
		// game_id: 1
	}
  

	constructor(private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

	// async ngAfterViewInit(): Promise<void> {
	// 	// this.audio.loop;
	// 	this.audio.play()
	// }

	
  
	doSomething() {
		sessionStorage.removeItem("selection_game")
	}

  navigateTo(route: string) {
    routes.forEach((r) => { 
      if (r.path === route) {
        this.router.navigate([route]);
      }
    })
  }
  

}
