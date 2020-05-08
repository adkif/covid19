import * as moment from 'moment';
moment.locale('en');
export class Covid {
    private confirmed: number;
    private deaths: number;
    private recovered: number;
    private active: number;
    private date: string;

    constructor(confirmed: number, deaths: number, recovered: number, active: number, date: string) {
      this.confirmed = confirmed;
      this.deaths = deaths;
      this.recovered = recovered;
      this.active = active;
      this.date = date;
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

    public getActive(): number {
      return this.active;
    }

    public getDate(): string {
      return  moment(this.date, moment.ISO_8601).calendar();
    }

    public getLastUpdate() {
      return  moment(this.date, moment.ISO_8601).fromNow();
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

    public setDate(date: string): void {
      this.date = date;
    }

}
