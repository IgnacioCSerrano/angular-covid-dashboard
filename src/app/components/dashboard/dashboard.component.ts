import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Constants } from '../../config/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form: FormGroup
  
  loading: boolean
  covidErr: boolean

  country: string
  countriesList: Array<string>
  countryData: any
  language: any
  currency: any
  
  covid19StatsAll: Array<object>
  covid19StatsCountry: Array<object>
  chuckJoke: string
  numberFact: string

  constructor(private restService: RestService, private formBuilder: FormBuilder, private constants: Constants) { 
    this.form = this.formBuilder.group({
      countries: new FormControl()
    })
    this.loading = true
    this.covidErr = false
  }

  ngOnInit(): void {
    this.getLocationData()
    this.getChuckData()
    this.getNumberData()
    this.bindChangeEvent()
  }

  filterCovidData(): void {
    this.covid19StatsCountry = this.covid19StatsAll.filter( (row: any) =>  row.country === this.country)
  }

  getCovidData(): void {
    this.restService.fetchCovidDataAll()
      .pipe(finalize( () => {
        this.loading = false
      }))
      .subscribe( (res: any) => {
        this.covid19StatsAll = res.data.covid19Stats
        this.filterCovidData()

        if (this.covid19StatsCountry.length === 0) {
          this.country = this.constants.DEFAULT_COUNTRY
          this.filterCovidData()
        }
        
        let countriesMap = this.covid19StatsAll.map( (row: any) => row.country)
        this.countriesList = countriesMap.filter( (value: string, index: number) => countriesMap.indexOf(value) === index) // elimina países duplicados de la lista

        this.form.controls.countries.patchValue(this.country) // valor inicial del campo 'select'
      }, (err: any) => {
        this.covidErr = true
      })
  }

  getCountryData(): void {
    this.countryData = null
    this.restService.fetchCountryData(this.country).subscribe((res: any) => {
      this.countryData = res.filter( (row: any) => 
        row.name.common.includes(this.country))[0]
      if (this.countryData) {
        this.language = Object.values(this.countryData.languages)[0]
        this.currency = Object.values(this.countryData.currencies)[0]
      }
    })
  }

  getLocationData(): void {
    this.restService.fetchLocationData()
      .pipe(finalize( () => {
        this.getCovidData()
        this.getCountryData()
      }))
      .subscribe( (res: any) => {
        this.country = res.country_name
      }, (err: any) => {
        this.country = this.constants.DEFAULT_COUNTRY
      })
  }

  getChuckData(): void {
    this.restService.fetchChuckData().subscribe( (res: any) => {
      this.chuckJoke = res.value
    })
  }

  getNumberData(): void {
    this.restService.fetchNumberData().subscribe( (res: any) => {
      this.numberFact = res.text
    })
  }

  bindChangeEvent(): void {
    this.form.controls.countries.valueChanges.subscribe( (val: string) => {
      this.country = val
      this.getCountryData()
      this.filterCovidData()
    })
  }

  stringToDate(date: string): Date {
    return new Date(date)
  }

}
