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

  ngOnInit(): void {}

  getButtonValue(event: Event) {
    let btn = event.target as HTMLElement;
    if (btn.textContent) this.KeyControllerService.setCode(btn.textContent.trim());
  }

  deleteValue() {
    this.KeyControllerService.deleteLastValue();
  }

  getRows(): string[][] {
    const rows = [];
    for (let i = 0; i < this.keys.length; i += 3) {
      rows.push(this.keys.slice(i, i + 3));
    }
    return rows;
  }

  isDeleteKey(key: string): boolean {
    return key.toLowerCase() === 'delete';
  }
}
