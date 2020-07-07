export default class ApiRequestResponse {
  private response: any;
  private code: any;
  constructor(serverResponse: any, code: any) {
    console.log('api request response', serverResponse);
    this.response = serverResponse;
    this.code = code;
  }

  get isSuccess(): boolean {
    return this.code === 200 || this.code == 201 || this.code == 204 || this.code == 301;
  }

  get isError(): boolean {
    return !this.isSuccess
  }

  get isInternalError(): boolean {
    return !(this.response && (this.code === 200 || this.code == 201));
  }

  get errorMessage(): string {
    if (this.response && this.response.message) {
      return this.response.message;
    }
    return 'Oops. Something went wrong...';
  }
}
