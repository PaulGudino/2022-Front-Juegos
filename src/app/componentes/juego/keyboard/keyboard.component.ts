import { Component, OnInit, Input } from "@angular/core";
import { KeyControllerService } from "../service/keyController/key-controller.service";

@Component({
  selector: "app-keyboard",
  templateUrl: "./keyboard.component.html",
  styleUrls: ["./keyboard.component.css"],
})
export class KeyboardComponent implements OnInit {
  @Input() keys: string[] = [];

  constructor(private KeyControllerService: KeyControllerService) {}

  ngOnInit(): void {
    console.log(this.keys); // Verifica que las teclas se están pasando correctamente

  }

  getButtonValue(event: Event) {
    console.log("click");
    let btn = event.currentTarget as HTMLElement;
    if (btn.textContent) this.KeyControllerService.setCode(btn.textContent);
  }

  deleteValue() {
    console.log("delete");
    this.KeyControllerService.deleteLastValue();
  }

  getRows(): string[][] {
    const rows = [];
    for (let i = 0; i < this.keys.length; i += 3) {
      rows.push(this.keys.slice(i, i + 3));
    }
    return rows;
  }

}
