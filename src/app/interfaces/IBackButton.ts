export interface IBackButton {
  init(): void;
  performBackButtonAction(): any;
  withAlert(message: string, action: () => void): void;
}
