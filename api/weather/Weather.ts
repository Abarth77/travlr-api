'use strict';

export class WeatherModel {
    public CODE: string;
    public COUNTRY_CODE: string;

    constructor(CODE: string, COUNTRY_CODE: string) {
        this.CODE = CODE;
        this.COUNTRY_CODE = COUNTRY_CODE;
    }
}
