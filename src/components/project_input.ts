namespace App {
  //ProjectInput class

  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    peopleInput: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInput = this.element.querySelector(
        "#text"
      )! as HTMLInputElement;
      this.descriptionInput = this.element.querySelector(
        "#description"
      )! as HTMLInputElement;
      this.peopleInput = this.element.querySelector(
        "#people"
      )! as HTMLInputElement;

      this.configure();
    }

    configure() {
      // Bind the submitHandler method to the correct context
      this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
      const enterTitle = this.titleInput.value;
      const enterDescription = this.descriptionInput.value;
      const enterPeople = this.peopleInput.value;

      const titleValidatable: Validatable = {
        value: enterTitle,
        required: true,
      };
      const descriptionValidatable: Validatable = {
        value: enterDescription,
        required: true,
        minLength: 5,
      };
      const peopleValidatable: Validatable = {
        value: Number(enterPeople),
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert("Invalid input, please try again");
        return;
      } else {
        return [enterTitle, enterDescription, Number(enterPeople)];
      }
    }

    private clearInputs() {
      this.titleInput.value = "";
      this.descriptionInput.value = "";
      this.peopleInput.value = "";
    }

    @Autobind // Ensure that the method is bound to the correct context
    private submitHandler(event: Event) {
      event.preventDefault();

      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }
  }
}
