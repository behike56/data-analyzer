use serde::{Deserialize, Serialize};
use std::error::Error;
use std::io::{self, Write};

#[derive(Debug, Serialize, Deserialize)]
struct CovidData {
    date: String,
    cases: i32,
}

pub fn get_covid_data() -> Result<Vec<CovidData>, Box<dyn Error>> {
    let url = "https://api.covidtracking.com/v1/us/daily.json";
    let mut response = reqwest::blocking::get(url)?;
    io::stdout().write_all(&mut response.bytes()?)?;

    let data = response.json::<Vec<CovidData>>()?;
    Ok(data)
}