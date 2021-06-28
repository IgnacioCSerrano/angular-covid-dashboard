import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    public readonly DEFAULT_COUNTRY: string = 'Spain'

    public readonly API_COVID_ENDPOINT: string = 'http://localhost:4200/covid19-api/stats/' // CORS Same-Origin Policy Fix (proxy.conf.json) 

    public readonly API_LOC_ENDPOINT: string = 'https://freegeoip.app/json/'

    public readonly API_COUNT_ENDPOINT: string = 'https://restcountries.com/v3.1/name/'

    public readonly API_CHUCK_ENDPOINT: string = 'https://api.chucknorris.io/jokes/random/'

    public readonly API_NUM_ENDPOINT: string = 'http://numbersapi.com/random/trivia?json'

}