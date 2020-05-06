export class Covid {
    private confirmed: number;
    private deaths: number;
    private recovered: number;
    private active: number;

    constructor(confirmed: number, deaths: number, recovered: number, active: number) {
      this.confirmed = confirmed;
      this.deaths = deaths;
      this.recovered = recovered;
      this.active = active;
    }

    public getConfirmed(): number {
      return this.confirmed;
    }

    public getDeaths(): number {
      return this.deaths;
    }

    public getRecovered(): number {
      return this.recovered;
    }

    public getAcive(): number {
      return this.active;
    }

    public setConfirmed(confirmed: number): void {
      this.confirmed = confirmed;
    }

    public setDeaths(deaths: number): void {
      this.deaths = deaths;
    }

    public setRecovered(recovered: number): void {
      this.recovered = recovered;
    }

    public setActive(active: number): void {
      this.active = active;
    }
}
