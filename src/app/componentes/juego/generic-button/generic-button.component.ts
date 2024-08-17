import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-generic-button",
  templateUrl: "./generic-button.component.html",
  styleUrls: ["./generic-button.component.css"],
})
export class GenericButtonComponent implements OnInit {
  @Input() title: string = "Empezar";
  @Input() fontSize: string = "1.6rem";
  @Input() styledPadding: string = "1rem 1.5rem";
  @Input() color: string = "white";
  @Input() color_background: string = "red";
  @Input() disabled: boolean = false;
  
  isClicked: boolean = false; // Estado para manejar el clic

  constructor() {}

  ngOnInit(): void {}

  handleClick(): void {
    if (!this.disabled) {
      this.isClicked = true;
      setTimeout(() => {
        this.isClicked = false;
      }, 200); // Mantiene el estado 'clicked' por 200ms para dar la ilusión de clic
    }
  }
}
