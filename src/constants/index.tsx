class GenericErrorMessages {
  static updated(e: string): string {
    return `${e} has been successfully updated!`;
  }

  static added(e: string): string {
    return `${e} has been successfully added!`;
  }

  static deleted(e: string): string {
    return `${e} has been successfully deleted!`;
  }

  static required(e: string): string {
    return `Please provide ${e}.`;
  }
  static requiredType(e: string): string {
    return `provide value must be a type of ${e}.`;
  }
  static noFetchResponse(e: string): string {
    return `Something went wrong. unable to fetch ${e}`;
  }
}

export default GenericErrorMessages;
