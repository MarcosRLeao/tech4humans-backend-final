import { Request, Response } from "express";
import { City } from '../Models/City'
import axios from "axios";


/* export const createCity = async (req:Request, res: Response) => {
    let {city, country} = req.body
    let newCity = await City.create({city, country})
    res.status(201);
    res.json({ id: newCity.id, city, country});
} */

/* export const listCities = async (req:Request, res: Response) => {
    let list = await City.findAll()
    res.json({list});
} */

/* export const getCity = async (req:Request, res: Response) => {
    let { id } = req.params;
    let city = await City.findByPk(id);

    if(city){
        res.json({city});
    }else{
        res.json({error: "Cidade não encontrada"});
    }
} */

/* export const updateCities = async (req:Request, res: Response) => {
    let { id } = req.params;
    let { city, country } = req.body;

    let update = await City.findByPk(id);

    if(update){
        update.city = city;
        update.country = country;

        await update.save();

        res.json({update});
    }else{
        res.json({error: "Cidade não encontrada"});
    }
} */

/* export const deleteCities = async (req:Request, res: Response) => {
    let { id } = req.params;
    await City.destroy({where: { id } })
    res.json({});
} */

export const mostSought = async (req:Request, res: Response) => {
    let cities = await City.findAll({
        limit: 5,
        order: [
            ['sum', 'DESC']
        ]
    })
    res.json({cities});
}

export const latestResearch = async (req:Request, res: Response) => {
    let cities = await City.findAll({
        limit: 5,
        order: [
            ['updatedAt', 'desc']
        ]
    })
    res.json({cities});
}

export const findAndCreate = async (req: Request, res: Response) =>{

    let { city } = req.body;
   
    try { 
        let {data} = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&lang=pt_br`)
        
        let newCity: string = data.name;
        let newCountry: string = data.sys.country;

        let results = await City.findAll({where: {city: newCity}});
        
        if(results.length > 0){
            let increment = results[0]
            increment.sum++;
            increment.save();
        }
        
        else{
            await City.create({city: newCity, country: newCountry})
            res.status(201);
        } 

        res.json({data});
      } 
      
      catch (error) {
          console.error(error)
          return res.json({error: "cidade nao existe"});
      }
}