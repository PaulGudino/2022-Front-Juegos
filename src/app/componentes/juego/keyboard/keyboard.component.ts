import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { KeyControllerService } from "../service/keyController/key-controller.service";

@Component({
  selector: "app-keyboard",
  templateUrl: "./keyboard.component.html",
  styleUrls: ["./keyboard.component.css"],
})
export class KeyboardComponent implements OnInit, AfterViewInit {
  @Input() keys: string[] = [];

  constructor(
    private KeyControllerService: KeyControllerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log(this.keys); // Verifica que las teclas se están pasando correctamente
  }

  ngAfterViewInit(): void {
    // Forzar la detección de cambios después de que la vista ha sido inicializada
    this.cdr.detectChanges(); // Forzar la detección de cambios
    console.log('View initialized');
  }

  getButtonValue(event: Event) {
    console.log("click");
    let btn = event.target as HTMLElement;
    if (btn.textContent) {
      this.KeyControllerService.setCode(btn.textContent.trim());
    }
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

  isDeleteKey(key: string): boolean {
    return key.toLowerCase() === 'delete';
  }

  trackByFn(index: number, item: string): any {
    return index; // o item, según lo que sea único
  }
}
